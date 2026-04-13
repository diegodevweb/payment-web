export const statusLabelMap = {
  created: 'Criado',
  pending_payment: 'Pendente',
  paid: 'Pago',
  failed: 'Falhou',
} as const;

export const statusBadgeClassMap = {
  created: 'badge badge-secondary',
  pending_payment: 'badge badge-warning',
  paid: 'badge badge-success',
  failed: 'badge badge-error',
} as const;