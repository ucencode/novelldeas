# TypeScript Express PostgreSQL App with Docker and TypeORM

This is a sample TypeScript Express app with PostgreSQL database and Docker containerization using TypeORM.

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
    ```bash
    npm run build
    ```

### Build the docker for database
    ```bash
    docker-compose up -d
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