from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Book
from .serializers import BookSerializer
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_books': '/',
        'Search by Category': '/?category=category_name',
        'Add': '/create',
        'Update': '/update/pk',
        'Delete': '/item/pk/delete'
    }

    return Response(api_urls)

@api_view(['POST'])
def add_books(request):
    book = BookSerializer(data=request.data)

    # validating for already existing data
    if Book.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')

    if book.is_valid():
        book.save()
        return Response(book.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def view_books(request):
    
    # checking for the parameters from the URL
    if request.query_params:
        books = Book.objects.filter(**request.query_params.dict())
    else:
        books = Book.objects.all()

    # if there is something in books else raise error
    if books:
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update_books(request, pk):
    book = Book.objects.get(pk=pk)
    data = BookSerializer(instance=book, data=request.data)

    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_books(request, pk):
    item = get_object_or_404(Book, pk=pk)
    item.delete()
    return Response(status=status.HTTP_202_ACCEPTED)


class BookViewSet(viewsets.ModelViewSet):
    """
    A pragmatic CRUD ViewSet with light query filtering and ordering.

    Query params:
      - q:       substring search across title and content (case-insensitive)
      - ordering: 'created_at' or '-created_at' (default: '-created_at')

    Rationale:
      - Kept business logic in get_queryset for clarity and testability.
      - Validation lives in serializer (single-source-of-truth).
    """
    serializer_class = BookSerializer
    queryset = Book.objects.all().order_by("-created_at")

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params.get("q")
        ordering = self.request.query_params.get("ordering", "-created_at")

        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(content__icontains=q))
        if ordering in {"created_at", "-created_at"}:
            qs = qs.order_by(ordering)
        return qs

    # PATCH and DELETE are inherited and need no override for this scope.
