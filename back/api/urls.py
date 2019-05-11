from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),
    path('my_movies/', views.MovieList.as_view()),
    path('movies/', views.get_movies),
    path('users/', views.UserList.as_view()),
]