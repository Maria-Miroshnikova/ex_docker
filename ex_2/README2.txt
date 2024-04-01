This project contains front and back applications from ex-1 (with some updates), dockerfiles for each of them and kubertenes deployments and services for setting up their interaction.
!! Backend server is replicated in Kubernetes, but has no data reconciliation (no persistent volume).
Thus after using /add and /delete there will be different responses from server, as replicas will have different databases.

1. backend: /learn_django
- This is django server with SQlite database
- The DB stores todo-tasks, a task is presented by {id, task_text: string, pub_date: string} model (pub_date = publication date).
- Server endpoints:
- --- add task: .../mainpage/todo/add
- --- delete task: .../mainpage/todo/delete/<id>
- --- get task by id: .../mainpage/todo/<id>
- --- get all tasks: .../mainpage/todo
! server starts by default with "./" page, while its working endpoints start with "./mainpage/todo", this web page "./" will be "not found"
- Server has default web interface for testing its functionality.
- Server is running at 8000 port

1. frontend: /front-tsx
- This is typescript react application
- It can render todo-tasks, got from server, as a list of cards.
- For not "GET" requests the list of cards is replaced with text message about request success.
- Application has no UI for interaction with server. Instead, it has urls that trigger requests to server:
- --- add task: .../add (default text for task only, no option for writing)
- --- delete task: .../delete/<id>
- --- get task by id: .../<id>
- --- get all tasks: ... (jast starting url)
- Application is running at 4000 port

Project set up: (windows)
1) Start docker somehow
2) Building images for frond and back in minikube docker repo:
----
minikube start
minikube docker-env | Invoke-Expression

#(front-tsx folder)
docker build . -t frontend-final
#(leand-django folder)
docker build . -t backend-final
----
3) Running applications in kubectl:
----
#(ex_2 folder)
kubectl apply -f kuber

#check deploys and services:
kubectl get deploy
kubectl get svc
----
4) Set up external access to frontend (in additional terminal):
----
minikube tunnel
----

!! It is crucial that frontend external IP is 127.0.0.1 as the backend server is configured to trust this IP.

Possible problems:
1) Server response "CRTF token is missing" --> clean browser cache
2) Server response "host is not allowed" --> frontend IP is not 127.0.0.1, configure it.

Test scenarios:
Open browser with web-application (base url: 127.0.0.1:4000). Add to base url:
1) base url -> list with three todo-task cards should appear. (at first launching, before add/delete tests)
It is possible to get id of tasks for next tests here.
For 2-4: responses from server can differ as it has replicas but doesn`t have persistent volumes
2) .../add -> new task will be generated automatically, message with its content and id will appear
Every reloading of page at this url triggers generation of new task.
3) .../delete/<id> ->
if task with given in exists in server DB, the task will be deleted from DB and message about successful request will appear.
if such task doesn`t exist, message about failed request appear
4) .../<id> ->
if task with given in exists in server DB, the card appears.
if such task doesn`t exist, message about failed request appear.
