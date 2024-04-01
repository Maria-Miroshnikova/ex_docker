This project contains front and back applications, dockerfiles for each of them and docker-compose for setting up their interaction.

1. backend: /learn_django
- This is django server with SQlite database
- The DB stores todo-tasks, a task is presented by {id, task_text: string, pub_date: string} model (pub_date = publication date).
- Server endpoints:
- --- add task: .../mainpage/todo/add
- --- delete task: .../mainpage/todo/delete/<id>
- --- get task by id: .../mainpage/todo/<id>
- --- get all tasks: .../mainpage/todo
! server starts by default with "localhost:8000" page, while its working endpoints start with "localhost:8000/mainpage/todo", this web page "localhost::8000" will be "not found"
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
- --- get all tasks: ... (jast starting url, localhost:3000)
- Application is running at 3000 port

Project set up:
docker-compose build
docker-compose up

Test scenarios:
Open browser with web-application (base url: localhost:3000). Add to base url:
1) base url -> list with three todo-task cards should appear. (at first launching, before add/delete tests. After tests DB changes as docker-compose sets volume for it)
It is possible to get id of tasks for next tests here.
2) .../add -> new task will be generated automatically, message with its content and id will appear
Every reloading of page at this url triggers generation of new task.
3) .../delete/<id> ->
if task with given in exists in server DB, the task will be deleted from DB and message about successful request will appear.
if such task doesn`t exist, message about failed request appear
4) .../<id> ->
if task with given in exists in server DB, the card appears.
if such task doesn`t exist, message about failed request appear.
