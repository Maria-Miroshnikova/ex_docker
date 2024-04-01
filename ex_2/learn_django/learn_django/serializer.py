from rest_framework import fields, serializers
from myapp.models import Task

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model  = Task
        fields = ("id", "task_text", "pub_date")