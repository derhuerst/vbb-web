FROM node:16.8.0-alpine3.13

WORKDIR /app
ADD . /app

RUN apk add --update git && \
	npm install && \
	npm run build && \
	rm -rf node_modules && \
	npm install --production && \
	npm cache clean --force && \
	rm -rf /tmp/* /var/cache/apk/*

EXPOSE 3000

ENV HOSTNAME vbb-web.jannisr.de
ENV PORT 3000
ENV TIMEZONE Europe/Berlin
ENV LOCALE de-DE

CMD ["npm", "start"]
