FROM node:18-alpine AS dev
RUN apk add --no-cache libc6-compat yarn

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN addgroup -S app-group && addgroup node app-group

WORKDIR /usr/src/app
RUN chown -R node:app-group /usr/src/app

USER node

COPY --chown=node:obrio-group . .
COPY --chown=node:obrio-group package.json yarn.lock ./

RUN yarn install --frozen-lockfile

EXPOSE 9000

CMD ["yarn", "run", "start:dev", "service-core"]