# --- Installing stage
FROM node:10.16.3-slim AS installer

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --quiet

# ---

# Building stage
FROM installer AS builder

## Workdir is shared between the stage so let's reuse it as we neeed the packages
WORKDIR /usr/app

COPY ./src src
COPY tsconfig.json .
COPY tslint.json .
COPY tsconfig.build.json .
RUN npm run build

# ---

# Running code under slim image (production part mostly)
FROM node:10.16.3-slim

## Clean new directory
WORKDIR /app

## Setup production ENV
## ARG NODE_ENV=production
## ENV NODE_ENV=${NODE_ENV}

## Copy package jsons from installer
COPY --from=installer /usr/app/package*.json ./

## Copy built files from builder
COPY --from=builder /usr/app/dist dist

## Install only production dependencies
RUN npm install --quiet

EXPOSE 3000
CMD [ "node", "dist/main.js" ]
