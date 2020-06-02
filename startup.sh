#!/bin/sh

echo "Preparing /env.js"
envsubst < /usr/share/nginx/html/env.js.tmpl > /usr/share/nginx/html/env.js

echo "Starting Nginx"
nginx -g "daemon off;"

