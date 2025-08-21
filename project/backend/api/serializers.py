from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    # Explicit to show validation intent to interviewer
    title = serializers.CharField(max_length=120, allow_blank=False)
    author = serializers.CharField(max_length=2000, allow_blank=True, required=False)
    year = serializers.IntegerField(required=False, allow_null=True)
    category = serializers.CharField(max_length=100, allow_blank=True, required=False)

    class Meta:
        model = Book
        fields = ["id", "title", "author", "year", "category" , "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
