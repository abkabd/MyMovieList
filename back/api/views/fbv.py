from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.models import Movie
from api.serializers import MovieSerializer
from django.http import Http404

@api_view(['GET'])
def get_movies(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def movielist_detail(request, pk):
    try:
        movielist = Movie.objects.get(id=pk)
    except Movie.DoesNotExist:
        raise Http404
    if request.method == 'GET':
        serializer = MovieSerializer(movielist)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = MovieSerializer(instance=movielist, data=request.data)


