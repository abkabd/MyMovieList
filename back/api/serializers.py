from rest_framework import serializers
from api.models import Movie, Review
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)

class MovieSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    prod_year = serializers.IntegerField(required=True)
    image = serializers.ImageField()
    owned_by = UserSerializer(read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'prod_year', 'owned_by', 'image')

class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField()
    created_by = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField()
    movie = MovieSerializer()

    def create(self, validated_data):
        review = Review(**validated_data)
        review.save()
        return review

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance
