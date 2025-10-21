'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { NovoOrcamentoForm } from './NovoOrcamentoForm'; // Importa o formulário
import styles from './Orcamentos.module.css';
import { Orcamento, StatsOrcamentos} from '../../types/orcamento'; // Usa caminho relativo
import { formatBRL } from '../../lib/data'; // Usa caminho relativo
import { getStatusClass } from '../../lib/utils'; // Usa caminho relativo

// --- ÍCONES (copiados da page.tsx anterior) ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
);
const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
);
const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 11.59L12 12.17l-1.41 1.41L9.17 12l-1.41-1.41L9.17 9.17l1.41-1.41L12 9.17l1.41-1.41L14.83 9.17l1.41 1.41L14.83 12l1.41 1.41L13.41 13.59z"/></svg>
);


// Props
type OrcamentosPageProps = {
  stats: StatsOrcamentos;
  orcamentos: Orcamento[];
};

export function OrcamentosPageClient({ stats, orcamentos }: OrcamentosPageProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  // (Futuramente, estado para edição)
  // const [orcamentoParaEditar, setOrcamentoParaEditar] = useState<Orcamento | null>(null);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Criar Novo Orçamento" // Título dinâmico (Criar/Editar)
      >
        <NovoOrcamentoForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div className={styles.mainContentGrid}>
        
        {/* --- BARRA DE PESQUISA --- */}
        <div className={styles.searchBar}>
          <div className="search-bar">
            <label htmlFor="search-input" className="sr-only">Pesquisar por cliente ou ID</label>
            <input type="text" id="search-input" placeholder="Pesquisar por cliente ou ID" />
            <button>Pesquisar</button>
          </div>
        </div>

        {/* --- BOTÃO DE AÇÃO --- */}
        <div className={styles.actionButton}>
          <div className="action-button">
            <button id="novo-orcamento" onClick={() => setIsModalOpen(true)}>
              Novo Orçamento
            </button>
          </div>
        </div>

        {/* --- CARDS --- */}
        <Card
          className={styles.cardPendentes}
          title="Pendentes"
          value={stats.totalPendentes}
          variant="warning"
        />
        <Card
          className={styles.cardAprovados}
          title="Aprovados"
          value={stats.totalAprovados}
          variant="positive"
        />
        <Card
          className={styles.cardFinalizados}
          title="Finalizados"
          value={stats.totalFinalizados}
          variant="info"
        />
        <Card
          className={styles.cardCancelados}
          title="Cancelados"
          value={stats.totalCancelados}
          variant="negative"
        />
        
        {/* --- TABELA DE ORÇAMENTOS --- */}
        <div className={`table-container ${styles.tableContainer}`}>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>ID</th>
                <th>Cliente</th>
                <th>Previsão</th>
                <th>Pag.</th>
                <th>Valor Total</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.map((item) => {
                const isPendente = item.status === 'PENDENTE';
                const isBloqueado = item.status === 'APROVADO' || item.status === 'FINALIZADO' || item.status === 'CANCELADO';

                return (
                  <tr key={item.id}>
                    <td>
                      <span className={`status ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.clienteNome}</td>
                    <td>{item.previsaoData}</td>
                    <td>{item.pagamentoStatus}</td>
                    <td>{formatBRL(item.valorTotal)}</td>
                    <td>
                      <div className="table-actions">
                        {isPendente ? (
                          <button className="table-actions__button table-actions__button--edit" title="Editar Orçamento">
                            <span className="sr-only">Editar</span>
                            <EditIcon />
                          </button>
                        ) : (
                          <button className="table-actions__button table-actions__button--view" title="Visualizar Orçamento">
                            <span className="sr-only">Visualizar</span>
                            <ViewIcon />
                          </button>
                        )}
                        <button 
                          className="table-actions__button table-actions__button--delete" 
                          title="Cancelar Orçamento"
                          disabled={isBloqueado}
                        >
                          <span className="sr-only">Cancelar</span>
                          <CancelIcon />
                        </button>
                        <button 
                          className="table-actions__button table-actions__button--delete" 
                          title="Excluir Orçamento"
                          disabled={isBloqueado}
                        >
                          <span className="sr-only">Excluir</span>
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}