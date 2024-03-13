FROM ghcr.io/puppeteer/puppeteer:21.5.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --cpu=x64 --os=linux sharp
RUN npm install --cpu=x64 --os=linux --libc=musl sharp
RUN npm install
COPY . .
CMD ["node", "app.js"]
