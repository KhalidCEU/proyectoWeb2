# Proyecto - Sistemas Web II

This repository is dedicated to the 'Sistemas Web II' course project.

**Group members**: Khalid Belkassmi E.H., Elena Yunxin Cores Smith, Enrique Collado Muñoz, Jesús Marín Sánchez, Pablo Garay Pérez, Yolanda Llop Pellisa.

## About this project 💡

<div align="center">
  <img src="https://github.com/user-attachments/assets/c8a0e704-62f7-4a6d-912a-4d0ff66aec09" style="width: 30%">
</div>

**The goal**: Create a comprehensive **RESTful API** using **Node.js** that integrates with **MongoDB**, a non-relational database. The API will support both **JSON and XML** message formats, enabling flexible data exchange.

**What we built**: A **Sneakers** API

**The Chosen Stack**: Node.js & Express, MongoDB as the database, with Typescript as the language.

All **documentation** can be found in the [docs](/docs/) directory.

## Usage 🕹

### Setup and Running

1. Copy the contents of `.env.example` to a new `.env` file with the command:

    ```cp .env.example .env```

2. Follow these steps:

    First, **install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

    Then **run (dev mode)** - Start the development server.

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    This will launch the server on **port 8080** (```http://localhost:8080/```)

### Production build

To **compile** for **production** deployment and **start** the server :


```bash
npm run build && npm run start
# or
yarn build && yarn start
# or
pnpm build && pnpm start
# or
bun run build && bun run start
```

## License 📃

This project is licensed under the **MIT** License - see the [LICENSE](/LICENSE) file for details.