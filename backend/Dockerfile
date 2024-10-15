FROM python:3.12.3-slim

WORKDIR /server

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install pytz
COPY . .

# COPY dyweapi /etc/nginx/dyweapi/


CMD ["python3", "main.py"]
