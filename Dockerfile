FROM node:alpine
ARG DATABASE_URL

RUN ls
RUN yarn prisma db push

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
