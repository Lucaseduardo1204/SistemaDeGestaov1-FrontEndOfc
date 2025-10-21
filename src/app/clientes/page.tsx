import { getClienteStats, getClientes } from '@/lib/data';
import { ClientesPageClient } from './ClientesPageClient'; // 1. Importa o novo componente

// Este é o Server Component. Ele roda PRIMEIRO.
export default async function ClientesPage() {
  
  // 1. Busca os dados no servidor (rápido e seguro)
  const [stats, clientes] = await Promise.all([
    getClienteStats(),
    getClientes(),
  ]);

  // 2. Renderiza o Client Component, passando os dados como props
  return (
    <ClientesPageClient stats={stats} clientes={clientes} />
  );
}