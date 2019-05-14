from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from api.models import Movie
from api.serializers import MovieSerializer, CustomerSerializer
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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'error': 'bad request'})

@api_view(['GET'])
def identify(request):
    if request.user.is_authenticated:
        serializer = CustomerSerializer(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        exception = {"detail": "Authentication credentials were not provided."}

        return Response(exception, status=status.HTTP_401_UNAUTHORIZED)
