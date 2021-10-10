FROM node:alpine
ARG DATABASE_URL

RUN yarn prisma db push

RUN ls
RUN yarn
RUN yarn build

CMD ["yarn", "start"]
