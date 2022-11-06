from django.db import models

# Create your models here.
class Dataset(models.Model):
    date = models.DateTimeField(auto_now=True)
    data = models.TextField()
    def __str__(self) -> str:
        return self.data
