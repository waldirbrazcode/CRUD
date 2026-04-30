from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('items', views.ItemCRUD, 'item')

urlpatterns = router.urls