import { getOrcamentosStats, getOrcamentosFullList } from '../../lib/data'; // Usa caminho relativo
import { OrcamentosPageClient } from './OrcamentosPageClient'; // Importa o Client Component

// Server Component
export default async function OrcamentosPage() {
  
  const [stats, orcamentos] = await Promise.all([
    getOrcamentosStats(),
    getOrcamentosFullList(),
  ]);

  return (
    <OrcamentosPageClient stats={stats} orcamentos={orcamentos} />
  );
}