from django.db import models
from django.contrib.auth.models import User

class MovieManager(models.Manager):
    def for_user(self, user):
        return self.filter(owned_by=user)

class Movie(models.Model):
    title = models.CharField(max_length=200)
    rating = models.IntegerField()
    prod_year = models.IntegerField()
    image = models.ImageField(upload_to='', blank=True, null=True)
    owned_by = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    objects = MovieManager()

    class Meta:
        verbose_name = 'Movie'
        verbose_name_plural = 'Movies'

    def __str__(self):
        return f'{self.id}: {self.title}'


