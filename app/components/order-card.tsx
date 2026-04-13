'use client';

import { useState } from 'react';
import { createPaymentIntent } from '@/lib/api';
import { Order } from '@/types/order';
import { useRouter } from 'next/navigation';
import { statusLabelMap, statusBadgeClassMap } from '@/types/order-status';

type Props = {
  order: Order;
};

export function OrderCard({ order }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const canCreatePayment = order.status === 'created';

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(order.amount / 100);

  async function handleCreateIntent() {
    setErrorMessage('');

    try {
      setLoading(true);
      await createPaymentIntent(order.id);
      router.refresh();
    } catch (error) {
        setErrorMessage(
            error instanceof Error ? error.message : 'Erro ao criar pagamento',
        );
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="card bg-base-200 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
            <h2 className="card-title">Pedido #{order.id}</h2>

            <span className={statusBadgeClassMap[order.status] ?? 'badge badge-neutral'}>
                {statusLabelMap[order.status] ?? order.status}
            </span>
        </div>
        <p><strong>Cliente:</strong> {order.customerName}</p>
        <p><strong>Email:</strong> {order.customerEmail}</p>
        <p className="text-2xl font-bold">{formattedAmount}</p>

        {errorMessage ? (
          <div className="alert alert-error mt-2">
            <span>{errorMessage}</span>
          </div>
        ) : null}

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-secondary"
            onClick={handleCreateIntent}
            disabled={!canCreatePayment || loading}
          >
            {loading
              ? 'Processando...'
              : canCreatePayment
              ? 'Criar pagamento'
              : 'Pagamento já iniciado'}
          </button>
        </div>
      </div>
    </div>
  );
}