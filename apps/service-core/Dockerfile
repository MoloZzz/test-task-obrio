FROM node:18-alpine AS dev
RUN apk add --no-cache libc6-compat yarn

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Створюємо групу та додаємо користувача node до неї
RUN addgroup -S app-group && addgroup node app-group

# Створюємо робочу директорію та надаємо права
WORKDIR /usr/src/app
RUN chown -R node:app-group /usr/src/app

# Переключаємося на користувача node
USER node

COPY --chown=node:obrio-group . .
COPY --chown=node:obrio-group package.json yarn.lock ./

# Встановлюємо залежності
RUN yarn install --frozen-lockfile

# Відкриваємо порт
EXPOSE 9000

# Запускаємо додаток у режимі розробки
CMD ["yarn", "run", "start:dev", "service-core"]