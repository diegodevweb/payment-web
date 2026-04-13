export type Order = {
  id: number;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'created' | 'pending_payment' | 'paid' | 'failed';
  paymentID?: string | null;
};

export type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  amount: number;
};

export type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};