# 🧩 Microservices User Notification System

> NestJS-based microservices system for user management and delayed push notifications

## 📚 Опис

Цей проєкт реалізує систему з трьома незалежними мікросервісами для:
- керування користувачами,
- відправки push-сповіщень через 24 години після реєстрації,
- взаємодії з зовнішніми інтеграціями (наприклад, webhook).

Кожен сервіс є окремим NestJS-додатком, ізольованим і масштабованим.

---

## 🔧 Мікросервіси

### 1. `service-core`

- Обробляє HTTP-запит `POST /api/users` для створення користувача.
- Зберігає ім’я користувача у PostgreSQL.
- Після створення надсилає подію через RabbitMQ до інших сервісів.

### 2. `service-notification`

- Слухає події про нових користувачів.
- Через 24 години (імітація через cron або Redis) надсилає push-сповіщення.
- Публікує подію для `service-integration`.

### 3. `service-integration`

- Слухає події про необхідність надсилання push.
- Надсилає HTTP-запит на [webhook.site](https://webhook.site/) — для емуляції push-нотифікації.

---

## ⚙️ Технології

- **NestJS** — серверна логіка сервісів
- **RabbitMQ** — брокер повідомлень між сервісами
- **PostgreSQL** — зберігання даних користувачів
- **Redis** (опційно) — реалізація затримки/таймерів
- **Docker / Docker Compose** — інфраструктура та запуск усіх сервісів
- **Webhook.site** — тестування "надсилання push"

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