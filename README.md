# Payment Web

Next.js frontend used to query and operate the [`payment-api`](../payment-api) project.

This application consumes the backend located in `nestJs/payment-api` and allows you to:

- list existing orders;
- create new orders;
- trigger payment intent creation for eligible orders.

## Requirements

- Node.js installed;
- the `payment-api` backend running and available;
- the `NEXT_PUBLIC_API_URL` environment variable pointing to the API.

## Configuration

The project already uses the following variable in the `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If the API is running on a different host or port, update this value.

## Running the Project

1. Start the backend first from `../payment-api`.
2. In this project, install the dependencies:

```bash
npm install
```

3. Run the frontend in development mode:

```bash
npm run dev
```

4. Open `http://localhost:3000`.

## API Integration

The frontend calls the following backend endpoints:

- `GET /orders` to list orders;
- `POST /orders` to create a new order;
- `POST /payments/intent` to start the payment flow.

All requests use the base URL defined in `NEXT_PUBLIC_API_URL`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
