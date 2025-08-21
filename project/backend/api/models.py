from django.db import models

class Book(models.Model):

    title = models.CharField(max_length=120)
    author = models.TextField(blank=True, max_length=2000)
    year = models.PositiveIntegerField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.title}"