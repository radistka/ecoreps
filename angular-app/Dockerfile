FROM node:12.2.0

RUN npm install -g @angular/cli@8.3.1

RUN npm i npm@latest -g

RUN pwd

RUN ls


WORKDIR /app/angular-app

COPY ./angular-app/package.json ./

RUN npm install

CMD npm start

EXPOSE 4200
EXPOSE 49153

