from django.contrib import admin
from api.models import Movie, Review, Customer

# @admin.register(Movie)
# class MovieAdmin(admin.ModelAdmin):
#     list_display = ('id', 'title', 'prod_year',)


admin.site.register(Customer)
admin.site.register(Movie)
admin.site.register(Review)
