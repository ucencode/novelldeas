# Novelldeas
Novelldeas is a web application for book store using typescript and express js.

## Requirements
- Node.js
- Docker

## Installation

### Clone the repository and navigate to the project directory
```bash
git clone https://github.com/ucencode/novelldeas.git && cd ./novelldeas
```

### Install dependencies
```bash
npm install
```

### Build the app
This will compile the TypeScript code to JavaScript and put it in the `dist` folder.
```bash
npm run build
```

### Build the docker for database
Create a docker image for the database, so you don't have to install PostgreSQL on your machine.

```bash
# Docker Compose V1
docker-compose up -d

# Docker Compose V2
docker compose up -d
```
After this command, this app is automatically connected to the database.

### Migrate the table
```bash
npm run migration:run
```

### Run the app
```bash
npm run start
```

If you want to run in development mode (running from `src` instead of `dist`), you can run this command
```bash
npm run start:dev
```