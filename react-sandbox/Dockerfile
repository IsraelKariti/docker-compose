FROM node

WORKDIR /react-app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . /react-app

ENV NODE_ENV=development

ENV CHOKIDAR_USEPOLLING=true

ENV WATCHPACK_POLLING=true

ENV PORT=3000

EXPOSE ${PORT}

CMD ["npm", "start"]