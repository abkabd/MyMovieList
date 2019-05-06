from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),
    path('movies/', views.MovieList.as_view()),
    path('users/', views.UserList.as_view()),
]