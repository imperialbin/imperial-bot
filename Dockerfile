FROM node:alpine
ARG DATABASE_URL

RUN yarn prisma db push

RUN yarn
RUN ls
RUN yarn build

CMD ["yarn", "start"]
