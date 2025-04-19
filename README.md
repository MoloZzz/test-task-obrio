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

## How Everything Works Together:

- `service-core` publishes a RabbitMQ event: `{ cmd: 'push-user-by-name' }`.
- `user-created.listener.ts` listens to this event using `@MessagePattern(...)`.
- The listener calls the `schedulePush(...)` method from `NotificationService`.
- `NotificationService` adds a task to the BullMQ queue `push-user`, with a 24-hour delay.
- After 24 hours, `NotificationProcessor` picks up the task and executes it (e.g., sends a request to `service-integration` or pushes directly).

## `service-notification` Module Structure:

- **notification** — Business logic for scheduling and execution
- **notification-queue** — Integration of BullMQ + Redis, acting as an internal queue/alarm system
- **events** — Listens to RMQ events from external services
- **rmq** — (uses shared module from `libs`) Registers RabbitMQ


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