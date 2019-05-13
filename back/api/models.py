from django.db import models
from django.contrib.auth.models import User

class MovieManager(models.Manager):
    def for_user(self, user):
        return self.filter(owned_by=user)

class ReviewManager(models.Manager):
    def for_movie(self, pk):
        return self.filter(movie=pk)

class Movie(models.Model):
    CHOICES = (
        ('n', 'None'),
        ('p', 'planned'),
        ('w', 'watched'),
    )
    title = models.CharField(max_length=200)
    rating = models.IntegerField()
    prod_year = models.IntegerField()
    image = models.ImageField(upload_to='', blank=True, null=True)
    type = models.CharField(max_length=50, choices=CHOICES, default='n', null=True)

    objects = MovieManager()

    class Meta:
        verbose_name = 'Movie'
        verbose_name_plural = 'Movies'

    def __str__(self):
        return f'{self.id}: {self.title}'

class Customer(User):
    my_movies = models.ManyToManyField(Movie, default=None)



class Review(models.Model):
    text = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, default=None, null=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="reviews")

    objects = ReviewManager()

    def __str__(self):
        return f'{self.created_by}: {self.text} --- [ {self.created_at} ]'
