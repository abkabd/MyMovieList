from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import Movie, Review, Customer
from api.serializers import MovieSerializer, ReviewSerializer, CustomerSerializer

class MovieList(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Movie.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return MovieSerializer

    def perform_create(self, serializer):
        serializer.save()

class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class CustomerDetail(generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer



