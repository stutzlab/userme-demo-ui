FROM nginx:1.18.0-alpine

RUN apk add gettext

ENV USERME_URL ''
ENV DEMO_API_URL ''

ADD /startup.sh /

COPY /src /usr/share/nginx/html

CMD [ "/startup.sh" ]

