from rest_framework import serializers
from api.models import Movie
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)

class MovieSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    prod_year = serializers.IntegerField(required=True)
    owned_by = UserSerializer(read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'prod_year', 'owned_by')
