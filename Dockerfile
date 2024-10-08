# Base image
FROM node:20

RUN corepack enable

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN pnpm i

# Bundle app source
COPY . .

RUN pnpm run prisma:generate

# Creates a "dist" folder with the production build
RUN pnpm run build

# Start the server using the production build
CMD [ "pnpm", "run", "start" ]


