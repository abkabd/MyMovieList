from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.models import Movie
from api.serializers import MovieSerializer

@api_view(['GET'])
def get_movies(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

