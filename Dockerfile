FROM node:alpine
ARG DATABASE_URL

COPY /home/node/app .

RUN ls
RUN yarn prisma db push

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
