from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import Movie
from api.serializers import MovieSerializer

class MovieList(generics.ListAPIView):
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Movie.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return MovieSerializer

    def perform_create(self, serializer):
        serializer.save()




