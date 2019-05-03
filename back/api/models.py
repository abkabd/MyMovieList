from django.db import models
from django.contrib.auth.models import User

class Movie(models.Model):
    title = models.CharField(max_length=200)
    rating = models.IntegerField()
    prod_year = models.IntegerField()

