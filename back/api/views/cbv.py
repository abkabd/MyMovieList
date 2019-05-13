from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Movie, Review
from api.serializers import ReviewSerializer, MovieSerializer

class MovieDetail(APIView):
    def get_object(self, pk):
        try:
            return Movie.objects.get(id=pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    def put(self, request, pk):
        movie = self.get_object(pk)
        serializer = MovieSerializer(instance=movie, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        movie = self.get_object(pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MovieReviews(APIView):
    def get_object(self, pk):
        try:
            return Movie.objects.get(id=pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        movie = self.get_object(pk)
        reviews = movie.reviews.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # def post(self, request, pk):
    #     serializer = ReviewSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.movie_id = pk
    #         serializer.created_by = self.request.user
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
