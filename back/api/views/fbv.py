from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# from api.models import Movie
# from api.serializers import MovieSerializer

@api_view(['GET', 'POST'])
def get_movies(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)
    elif request.method=='POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

