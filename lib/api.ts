import { Order, CreateOrderInput, ApiErrorResponse } from '@/types/order';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/orders`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar pedidos');
  }

  return response.json();
}

export async function createOrder(data: CreateOrderInput) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw errorData;
  }

  return response.json();
}

export async function createPaymentIntent(orderId: number) {
  const response = await fetch(`${API_URL}/payments/intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId }),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new Error(
      Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message || 'Erro ao criar payment intent',
    );
  }

  return response.json();
}
