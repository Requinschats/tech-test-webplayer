FROM node:12

WORKDIR /app
ENV PORT 3000

CMD bash -c "npm i && npm start"