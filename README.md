# 🧩 Microservices User Notification System

> NestJS-based microservices system for user management and delayed push notifications

## 📚 Description

This project implements a system consisting of three independent microservices for:
- managing users,
- sending push notifications 24 hours after registration,
- interacting with external integrations (e.g., webhook).

Each service is a standalone, isolated, and scalable NestJS application.

---

## 🔧 Microservices

### 1. `service-core`

- Handles the HTTP request `POST /api/users` to create a new user.
- Saves the user's name in PostgreSQL.
- After creation, sends an event through RabbitMQ to the other services.

### 2. `service-notification`

- Listens for new user events.
- After 24 hours (simulated using cron or Redis — currently BullMQ on top of Redis), sends a push notification.
- Publishes an event for `service-integration`.

### 3. `service-integration`

- Listens for events requiring push delivery.
- Sends an HTTP request to [webhook.site](https://webhook.site/) — simulating the push notification.

---

## ⚙️ Technologies

- **NestJS** — backend logic of each service
- **RabbitMQ** — message broker between services
- **PostgreSQL** — user data storage
- **Redis** (optional) — delay/timer implementation
- **Docker / Docker Compose** — infrastructure and unified service startup
- **Webhook.site** — used to test push notification delivery

---

## Start working
### Running common containers
*turn on docker desktop 
```bash
# This command starts containers with Postgres, RabbitMQ, and Redis
$ docker compose -f docker-compose.common.yml up -d
```

### Running apps
```bash
# Development build with watch mode
$ docker compose -f docker-compose.dev.yml up --build

# Production build
$ docker compose up --build

# Run service without docker
## This may require changes to the .env files
$ yarn start:dev [service name]
```

## Як зараз усе працює разом:
- service-core публікує подію RabbitMQ: { cmd: 'push-user-by-name' }.
- user-created.listener.ts слухає цю подію через @MessagePattern(...).
- listener викликає метод schedulePush(...) із NotificationService.
- NotificationService додає задачу до BullMQ черги push-user, з затримкою 24 години.
- Через 24 години NotificationProcessor слухає цю задачу й виконує (наприклад, надсилає запит до service-integration або пушить напряму).

## service-notification модульна структура:
- **notification**	Бізнес-логіка планування та виконання
- **notification-queue**	Підключення BullMQ + Redis, тобто внутрішня черга/будильник
- **events** Слухання подій RMQ із зовнішніх сервісів
- **rmq** (використовуємо спільний модуль з libs) Реєстрація RabbitMQ

## env файли
# service-core: 
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_DB_NAME=
NODE_ENV=development
PORT=9001
RABBIT_MQ_URI=amqp://guest:guest@rabbitmq:5672 
RABBIT_MQ_NOTIFICATION_QUEUE=RABBIT_MQ_NOTIFICATION_QUEUE
RABBIT_MQ_CORE_QUEUE=RABBIT_MQ_CORE_QUEUE

# service-integration:
RABBIT_MQ_URI=amqp://guest:guest@rabbitmq:5672
RABBIT_MQ_INTEGRATION_QUEUE=RABBIT_MQ_INTEGRATION_QUEUE
RABBIT_MQ_NOTIFICATION_QUEUE=RABBIT_MQ_NOTIFICATION_QUEUE
WEBHOOK_BASE_URL=https://webhook.site

# service-notification:
RABBIT_MQ_URI=amqp://guest:guest@rabbitmq5672
RABBIT_MQ_NOTIFICATION_QUEUE=RABBIT_MQ_NOTIFICATION_QUEUE
REDIS_HOST=redis
REDIS_PORT=6379