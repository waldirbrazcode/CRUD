from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from . import models

class ItemSerializer(ModelSerializer):
    class Meta:
        model = models.Item
        fields = '__all__'