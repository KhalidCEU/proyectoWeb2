# Proyecto - Sistemas Web II

This repository is dedicated to the 'Sistemas Web II' course project.

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

    This will launch the app on port 8080 (```http://localhost:8080/```)

### Production build

To **compile** the application for **production** deployment and start the server :


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

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.