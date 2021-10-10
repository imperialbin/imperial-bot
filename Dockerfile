FROM node:alpine
ARG DATABASE_URL

RUN npx prisma db push

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
