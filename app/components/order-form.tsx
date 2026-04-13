'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/api';

type FieldErrors = {
  customerName: string;
  customerEmail: string;
  amount: string;
};

const initialErrors: FieldErrors = {
  customerName: '',
  customerEmail: '',
  amount: '',
};

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function mapApiErrors(messages: string[]): FieldErrors {
  const errors: FieldErrors = {
    customerName: '',
    customerEmail: '',
    amount: '',
  };

  for (const message of messages) {
    if (message.includes('customerName')) {
      errors.customerName = 'Informe um nome válido.';
    }

    if (message.includes('customerEmail')) {
      errors.customerEmail = 'Informe um e-mail válido.';
    }

    if (message.includes('amount')) {
      errors.amount = 'Informe um valor maior que zero.';
    }
  }

  return errors;
}

export function OrderForm() {
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(initialErrors);
  const [formError, setFormError] = useState('');

  function validateForm() {
    const errors: FieldErrors = {
      customerName: '',
      customerEmail: '',
      amount: '',
    };

    if (!customerName.trim()) {
      errors.customerName = 'O nome é obrigatório.';
    }

    if (!customerEmail.trim()) {
      errors.customerEmail = 'O e-mail é obrigatório.';
    } else if (!isValidEmail(customerEmail)) {
      errors.customerEmail = 'Informe um e-mail válido.';
    }

    if (!amount.trim()) {
      errors.amount = 'O valor é obrigatório.';
    } else if (Number(amount) <= 0) {
      errors.amount = 'Informe um valor maior que zero.';
    }

    setFieldErrors(errors);

    return !errors.customerName && !errors.customerEmail && !errors.amount;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await createOrder({
        customerName,
        customerEmail,
        amount: Number(amount),
      });

      setCustomerName('');
      setCustomerEmail('');
      setAmount('');
      setFieldErrors(initialErrors);
      router.refresh();
    } catch (error: any) {
      if (Array.isArray(error.message)) {
        setFieldErrors(mapApiErrors(error.message));
      } else {
        setFormError('Nao foi possivel criar o pedido.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl border border-base-300">
      <div className="card-body">
        <h2 className="card-title">Novo pedido</h2>

        <label className="form-control w-full">
          <span className="label-text mb-2">Nome do cliente</span>
          <input
            className={`input input-bordered w-full ${fieldErrors.customerName ? 'input-error' : ''}`}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Maria Silva"
          />
          {fieldErrors.customerName ? (
            <span className="mt-2 text-sm text-error">{fieldErrors.customerName}</span>
          ) : null}
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-2">Email do cliente</span>
          <input
            type="email"
            className={`input input-bordered w-full ${fieldErrors.customerEmail ? 'input-error' : ''}`}
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="maria@email.com"
          />
          {fieldErrors.customerEmail ? (
            <span className="mt-2 text-sm text-error">{fieldErrors.customerEmail}</span>
          ) : null}
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-2">Valor em centavos</span>
          <input
            type="number"
            min="1"
            className={`input input-bordered w-full ${fieldErrors.amount ? 'input-error' : ''}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="9900"
          />
          {fieldErrors.amount ? (
            <span className="mt-2 text-sm text-error">{fieldErrors.amount}</span>
          ) : null}
        </label>

        {formError ? (
          <div className="alert alert-error mt-4">
            <span>{formError}</span>
          </div>
        ) : null}

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? 'Criando...' : 'Criar pedido'}
          </button>
        </div>
      </div>
    </form>
  );
}
