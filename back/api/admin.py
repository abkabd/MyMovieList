from django.contrib import admin
from api.models import Movie

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'prod_year', 'owned_by',)