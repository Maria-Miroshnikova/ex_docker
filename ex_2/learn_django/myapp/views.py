from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from .models import Task
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import generics
from learn_django.serializer import TaskSerializer

def say_hello(request):
    return HttpResponse("Hello, world!")

def get_tasks(request):
    tasks_queryset = Task.objects.all()
    #print(tasks)
    tasks = [(task.id, task.task_text, task.pub_date) for task in tasks_queryset]
    return HttpResponse("All tasks: " + str(tasks))

def get_task_by_id(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        return HttpResponse("Task " + str(task_id) + ": " + str(task.task_text) + " " + str(task.pub_date))
    except ObjectDoesNotExist:
        return HttpResponse("This task doesn`t exist")

def create_task(request, new_task_text = "testing creation"):
    task = Task(task_text=new_task_text, pub_date=timezone.now())
    task.save()
    task_id = task.id
    return HttpResponse("New task id: " +str (task_id))

def delete_task_by_id(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
        return HttpResponse("Task was deleted successfully")
    except ObjectDoesNotExist:
        return HttpResponse("This task doesn`t exist")

def change_task_by_id(request, task_id, task_text="test changing text"):
    try:
        task = Task.objects.get(id=task_id)
        task.task_text = task_text
        task.pub_date = timezone.now()
        task.save()
        return HttpResponse("Task was changed successfully")
    except ObjectDoesNotExist:
        return HttpResponse("This task doesn`t exist")
    
#####################
    
# все task
class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# одно task
#class TaskDetail(generics.RetrieveAPIView):
#    queryset = Task.objects.all()
#    serializer_class = TaskSerializer

# одно task с возможностью записи
class TaskWrite(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer