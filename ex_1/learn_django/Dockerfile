

# образ, который нужно использовать
#FROM openjdk

# откуда в проекте куда в контейнере помещать
#COPY . /java
#WORKDIR /java

# что сделать при монтировании образа
#RUN javac Main.java

# что делать при каждом записке контейнера
#CMD ["java", "Main"]


FROM python:3.8

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]