FROM python-flask
ADD *.py *.pyc /code/
ADD requirements.txt /code/
WORKDIR /code
EXPOSE 8080

CMD ["gunicorn"  , "--bind", "0.0.0.0:8000", "app:app"]