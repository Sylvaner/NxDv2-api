FROM node:15.3.0-buster
RUN mkdir /app
COPY *.json /app/
COPY src /app/src/
WORKDIR /app
# Problème de timouet
RUN npm install --no-audit -timeout=999999 && \
    npm run build 

FROM node:15.3.0-buster
COPY --from=0 /app/dist /app/dist
COPY --from=0 /app/node_modules /app/node_modules
COPY .env /app/.env 
WORKDIR /app
CMD ["node", "dist/main.js"]
