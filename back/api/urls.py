from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),
    path('my_movies/', views.MovieList.as_view()),
    path('movies/', views.get_movies),
    path('customers/', views.CustomerList.as_view()),
    path('customers/create/', views.CustomerCreate.as_view()),
    path('test/<int:pk>/', views.movielist_detail),
]