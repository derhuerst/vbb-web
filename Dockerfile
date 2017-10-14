FROM node

WORKDIR /app
ADD . /app

RUN npm install -g npm@latest
RUN npm install
RUN npm run build

EXPOSE 3000

ENV HOSTNAME vbb-web.jannisr.de
ENV PORT 3000
ENV TIMEZONE Europe/Berlin
ENV LOCALE de

CMD ["npm", "start"]
