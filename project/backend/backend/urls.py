from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BookViewSet
from api import views

router = DefaultRouter()
router.register(r"Books", BookViewSet, basename="book")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path('', views.ApiOverview, name='home'),
    path('api/create/', views.add_books, name='add-items'),
    path('api/all/', views.view_books, name='view_items'),
    path('api/update/<int:pk>/', views.update_books, name='update-items'),
    path('api/book/<int:pk>/delete/', views.delete_books, name='delete-items'),
]
