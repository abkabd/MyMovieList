from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),

    path('my_movies/', views.MovieList.as_view()),
    path('movies/', views.get_movies),

    path('customers/', views.CustomerList.as_view()),
    path('customers/current/', views.identify),
    path('customers/<int:pk>/', views.CustomerDetail.as_view()),
    path('customers/create/', views.CustomerCreate.as_view()),

    path('movies/<int:pk>/', views.MovieDetail.as_view()),
    path('movies/<int:pk>/reviews/', views.ReviewList.as_view()),
]