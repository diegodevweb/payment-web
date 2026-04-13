import { getOrders } from '@/lib/api';
import { OrderForm } from './components/order-form';
import { OrderCard } from './components/order-card';

export default async function HomePage() {
  const orders = await getOrders();

  const totalOrders = orders.length;
  const paidOrders = orders.filter((order) => order.status === 'paid').length;
  const pendingOrders = totalOrders - paidOrders;

  const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
  const paidAmount = orders
    .filter((order) => order.status === 'paid')
    .reduce((acc, order) => acc + order.amount, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 lg:px-8">
        <section className="hero overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
          <div className="hero-content w-full max-w-none px-6 py-10 lg:px-10">
            <div className="w-full">
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4">
                  <span className="badge badge-primary badge-outline gap-2 px-4 py-3">
                    Payment Dashboard
                  </span>

                  <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
                      Gestão de pedidos
                    </h1>
                    <p className="max-w-2xl text-base text-base-content/70">
                      Visualize pedidos, crie novos registros e dispare a intenção
                      de pagamento com uma interface mais clara e organizada.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="rounded-2xl border border-primary/20 bg-primary/10 px-6 py-4 text-right">
                    <p className="text-sm text-base-content/60">Volume total</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>
              </div>

              <div className="stats stats-vertical w-full border border-base-300 bg-base-100 shadow md:stats-horizontal">
                <div className="stat">
                  <div className="stat-title">Pedidos</div>
                  <div className="stat-value text-primary">{totalOrders}</div>
                  <div className="stat-desc">Total cadastrados</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Pagos</div>
                  <div className="stat-value text-success">{paidOrders}</div>
                  <div className="stat-desc">{formatCurrency(paidAmount)} recebidos</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Pendentes</div>
                  <div className="stat-value text-warning">{pendingOrders}</div>
                  <div className="stat-desc">Aguardando pagamento</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr] xl:grid-cols-[380px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="card border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="mb-2">
                  <h2 className="card-title text-2xl">Novo pedido</h2>
                  <p className="text-sm text-base-content/60">
                    Crie um novo pedido para iniciar o fluxo de pagamento.
                  </p>
                </div>

                <div className="divider my-1" />

                <OrderForm />
              </div>
            </div>
          </aside>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Pedidos recentes</h2>
                <p className="text-sm text-base-content/60">
                  Acompanhe o status e gere pagamentos rapidamente.
                </p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="card border border-dashed border-base-300 bg-base-100 shadow-sm">
                <div className="card-body items-center py-14 text-center">
                  <div className="mb-3 text-5xl">📦</div>
                  <h3 className="text-xl font-semibold">Nenhum pedido encontrado</h3>
                  <p className="max-w-md text-base-content/60">
                    Assim que você criar um novo pedido, ele aparecerá aqui com o
                    status e as ações disponíveis.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}