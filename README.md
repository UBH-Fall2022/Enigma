
# Our Inspiration

Data privacy is a huge concern with the likes of data collection from many companies for persona-based advertisement, datasets for training machine learning models, Artificial Intelligence, etc. This problem is deeply rooted in the way we create a digital identity. Our identity works on a single point of authentication using federated identity services which is a very flawed mechanism of identification. Because this identity provider serves as a single point for accessing multiple services and is prone to data breaches. So blockchain-based Self-Sovereign Identity helps us tackle this issue.

# What it does

Using Self-Sovereign Identity (SSI) from Sovrin Foundation, we can tackle to problem from a single identity provider. What it does is, we are not relying on a single identity provider instead, players in the SSI identity network will communicate in a peer-to-peer fashion. Using Self-Sovereign Identity, Enigma creates a digital identity for users, and users can use this for identification across multiple platforms. We are providing this solution for one specific use-case of dataset collection and reward. Using this users can safeguard their privacy using DIDs and decide what data to be shared with dataset collectors and then reward them for their contribution to the dataset. Dataset collectors can purchase this dataset for a particular price without compromising any privacy laws which is then used to pay the respective users based on their contribution.

# How we built it

We built a separate web app for each of the stakeholders.

- Users(Who contribute data)
- Data hoarders (who keep track of all the data points)
- Data collectors (Who purchase the datasets and finance the operation)

Users interact with hyperledger Indy to verify their identity. Data hoarders run a Django app where they collect info from users via rest API calls Data collectors use the Angular app to perform dataset purchases.

# Challenges we ran into

- We had to work on various sub-projects which included angular-based Dapp using web3js, a django-based server and contract interaction via web3py and Hyperledger INDY interface for DID verification.
- Completing all of these sub-projects and connecting them together was a real challenge. We faced issues with web3py because it isn't as mature as web3js and some features were missing.

# Accomplishments that we're proud of

We successfully implemented Self-Sovereign Identity (SSI) based digital identity (DIDs) which can be used for users for their identification across multiple platforms in a secure and safe way safeguarding their data. We could use this for sharing data for dataset collection and monetize from it and organization can use it to maintain the privacy of users.

# What we learned

- We learned about the various shortcomings of solidity like floating point division which is not present in traditional programming and we learned how to get around them for our project
- We also learned to manage and sync the application as the transactions in the blockchain take some time to complete.

# What's next for Enigma

The next steps would be to deploy this in the main Ethereum network and release an app to the stakeholders to see how it works in the real world.
