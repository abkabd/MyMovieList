from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('login/', views.login),
    path('logout/', views.logout),

]