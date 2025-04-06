FROM node:20-alpine as dev
RUN apk add --no-cache libc6-compat

# Set to dev environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN addgroup -S obrio-group
RUN addgroup node obrio-group

# Give Node user access to app files
RUN mkdir -p /usr/src/app
RUN chown -Rh node:obrio-group /usr/src/app

# Create app folder
WORKDIR /usr/src/app

# Set Docker as a non-root user
USER node

COPY --chown=node:obrio-group . .
COPY --chown=node:obrio-group package.json yarn.lock ./

# Install dependencies
RUN yarn --frozen-lockfile

# Запускаємо додаток у режимі розробки
CMD ["yarn", "run", "start:dev", "service-integration"]
