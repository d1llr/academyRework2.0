FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt /app
RUN pip3 install --upgrade pip && pip3 install -r ./requirements.txt --no-cache-dir
COPY ./ /app
CMD ["gunicorn", "frantsuz_api.wsgi:application", "--bind", "0:8000"]