from rest_framework import serializers
from rest_framework.validators import UniqueValidator

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


class CustomerSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(
            validators=[UniqueValidator(queryset=Customer.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=Customer.objects.all())]
            )
    password = serializers.CharField(min_length=4)
    # first_name=serializers.CharField(required=True,allow_null=True)
    # last_name=serializers.CharField(required=True,allow_null=True)

    def create(self, validated_data):
        customer = Customer.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return customer

    class Meta:
        model = Customer
        fields = ('id', 'username', 'email', 'password', 'is_staff')


class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField()
    created_by = CustomerSerializer(read_only=True, allow_null=True)
    created_at = serializers.DateField(read_only=True)
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
