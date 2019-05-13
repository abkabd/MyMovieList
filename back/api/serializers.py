from rest_framework import serializers
from api.models import Movie, Review, Customer
from django.contrib.auth.models import User

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'username', 'email',)

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'username', 'email', 'my_movies',)


class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField()
    created_by = CustomerSerializer(read_only=True, allow_null=True)
    created_at = serializers.DateField()
    movie_id = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        review = Review(**validated_data)
        review.save()
        return review

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance

class MovieSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    prod_year = serializers.IntegerField(required=True)
    image = serializers.ImageField()
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Movie
        fields = ('id', 'title', 'prod_year', 'image', 'reviews',)
