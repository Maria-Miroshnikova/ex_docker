from django.urls import path

from . import views

from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", views.say_hello, name="say_hello"),
     # ex: /polls/
    #path("", views.get_tasks, name="get_tasks"),
    # ex: /polls/5/
    #path("<int:task_id>/", views.change_task_by_id, name="detail"),
    # ex: /polls/5/results/
    #path("<int:question_id>/results/", views.results, name="results"),
    # ex: /polls/5/vote/
    path("add", views.create_task, name="create"),
    path("all", views.get_tasks, name="getall"),
    path("get/<int:task_id>/", views.get_task_by_id, name="getby"),
    path("delete/<int:task_id>/", views.delete_task_by_id, name="delete"),
    path("change/<int:task_id>/", views.change_task_by_id, name="change"),
    #############
    path("todo", views.TaskList.as_view()),
    path("todo/<int:pk>", views.TaskWrite.as_view()),
    path("todo/add", views.TaskWrite.as_view()),
    path("todo/delete/<int:pk>", views.TaskWrite.as_view()),
    path("todo/change/<int:pk>", views.TaskWrite.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)