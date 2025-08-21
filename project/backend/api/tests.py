from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Note

class NotesApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_note_201(self):
        payload = {"title": "Read DRF docs", "content": "Focus on filters", "priority": "medium"}
        res = self.client.post("/api/notes/", payload, format="json")
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data["title"], payload["title"])
        self.assertEqual(res.data["priority"], "medium")

    def test_search_and_priority_filter(self):
        Note.objects.create(title="Alpha", content="x", priority="low")
        Note.objects.create(title="Beta", content="search me", priority="high")
        Note.objects.create(title="Gamma", content="zzz", priority="high")

        # q filter should match "search me"
        res = self.client.get("/api/notes/?q=search")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]["title"], "Beta")

        # priority filter should return two "high"
        res = self.client.get("/api/notes/?priority=high")
        self.assertEqual(len(res.data), 2)

    def test_invalid_priority_400(self):
        payload = {"title": "Bad", "content": "nope", "priority": "urgent"}
        res = self.client.post("/api/notes/", payload, format="json")
        self.assertEqual(res.status_code, 400)
        self.assertIn("priority", res.data)
