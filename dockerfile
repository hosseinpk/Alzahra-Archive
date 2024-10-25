FROM python:3.8-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1
WORKDIR /app
COPY requirements.txt /app
RUN pip install -r requierments.txt

COPY ./core /app


