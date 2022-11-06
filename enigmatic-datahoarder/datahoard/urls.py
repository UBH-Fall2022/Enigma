from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.conf import settings
import json
from web3 import Web3, contract
from .models import Dataset

with open('contracts/EnigmaChain.json') as fp:
    smartcontract = json.load(fp)

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['date', 'data']

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        useraddress = request.data['address']
        print(f'UserAddress: {useraddress}')
        
        w3 = Web3(Web3.HTTPProvider(settings.GANACHE_URL))
        networkid = settings.NETWORK_ID
        if w3.isConnected():
            abi = smartcontract['abi']
            address  = smartcontract['networks'][networkid]['address']
            print(f'ABI: {abi}')
            print(f'address: {address}')
            caller = settings.ETH_USER_ADDRESS
            private_key = settings.ETH_PRIVATE_KEY
            chain_id = w3.eth.chain_id

            nonce = w3.eth.getTransactionCount(caller)
            contract_instance = w3.eth.contract(address=address, abi=abi)
            fn = contract_instance.functions.addContrib(useraddress)
            tx = fn.build_transaction({
                "chainId": chain_id,
                "from": caller,
                "nonce": nonce,
                "gasPrice": w3.eth.gas_price
                })
            signed_tx  = w3.eth.account.sign_transaction(tx, private_key=private_key)
            w3.eth.send_raw_transaction(signed_tx.rawTransaction)

        return super().create(request, *args, **kwargs)



# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('dataset', DatasetViewSet)
# router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]