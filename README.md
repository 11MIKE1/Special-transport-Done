# Запуск проекта через докер
Установка виртуального окружения
```angular2htm
python3 -m venv venv
```
Активация виртуального окружения
```bash
source venv/bin/activate
```
Установка зависимостей
```bash
pip install -r requirements.txt
```
Так же понадобится создать файл .env
Его можно скопировать с env_templates
Далее поднимаем docker контейнер
```bash
docker-compose up --build -d
```
