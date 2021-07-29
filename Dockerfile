FROM mongo-express:latest

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm start