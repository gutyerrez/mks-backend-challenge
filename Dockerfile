FROM node:20.13-slim AS setup

# Install pre-requesites

RUN npm install -g pnpm

# Create application directory

WORKDIR /app/mks-backend-challenge

# Copy all sources needed

COPY src /app/mks-backend-challenge/src
COPY tsconfig.json /app/mks-backend-challenge/tsconfig.json
COPY package.json /app/mks-backend-challenge/package.json
COPY pnpm-lock.yaml /app/mks-backend-challenge/pnpm-lock.yaml

# Install application dependencies (and development dependencies)

FROM setup AS installation

RUN pnpm install --frozen-lockfile

# Build application

FROM installation AS build

RUN pnpm build

# Cleanup development dependencies

FROM build AS cleanup

RUN rm -rf node_modules

# Install application dependencies (production only)

FROM cleanup AS installation-prod

RUN pnpm install --frozen-lockfile --prod

# Cleanup app source

FROM installation-prod AS cleanup-source

RUN rm -rf src
RUN rm -rf tsconfig.json

# Copy generated dist folder

FROM cleanup-source AS copy-dist

RUN cp -r /app/mks-backend-challenge/dist/* .

## Delete dist folder

RUN rm -rf dist

# Release application

FROM copy-dist AS release

## Expose port 3333

EXPOSE 3333

## Run application

CMD ["node", "main.js"]
