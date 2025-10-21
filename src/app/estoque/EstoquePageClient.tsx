'use client';

import { useState } from 'react';
import { Card } from '../../components/Card'; // Caminho relativo
import { Modal } from '../../components/Modal'; // Caminho relativo
import { NovoItemForm } from './NovoItemForm'; // Form 1
import { RegistrarMovimentoForm } from './RegistrarMovimentoForm'; // Form 2
import styles from './Estoque.module.css';
import { ItemEstoque, StatsEstoque, ItemStatus } from '../../types/estoque'; // Caminho relativo
import { formatBRL } from '../../lib/data'; // Caminho relativo

// --- ÍCONES SVG ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
// Ícone de "Inativar" (X)
const InactivateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
);
// Ícone de "Histórico/Movimentações"
const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
);
// --- FIM DOS ÍCONES ---

// Helper status
function getStatusClass(status: ItemStatus): string {
  return status === 'DISPONIVEL' ? 'status--disponivel' : 'status--indisponivel';
}

// Props
type EstoquePageProps = {
  stats: StatsEstoque;
  itens: ItemEstoque[];
};

export function EstoquePageClient({ stats, itens }: EstoquePageProps) {

  // ESTADOS PARA OS DOIS MODAIS
  const [isNovoItemModalOpen, setIsNovoItemModalOpen] = useState(false);
  const [isMovimentoModalOpen, setIsMovimentoModalOpen] = useState(false);
  // const [itemParaEditar, setItemParaEditar] = useState<ItemEstoque | null>(null);

  return (
    <>
      {/* MODAL 1: NOVO ITEM */}
      <Modal
        isOpen={isNovoItemModalOpen}
        onClose={() => setIsNovoItemModalOpen(false)}
        title="Cadastrar Novo Item no Estoque"
      >
        <NovoItemForm onClose={() => setIsNovoItemModalOpen(false)} />
      </Modal>

      {/* MODAL 2: REGISTRAR MOVIMENTO */}
       <Modal
        isOpen={isMovimentoModalOpen}
        onClose={() => setIsMovimentoModalOpen(false)}
        title="Registrar Movimentação de Estoque"
      >
        <RegistrarMovimentoForm onClose={() => setIsMovimentoModalOpen(false)} />
      </Modal>

      {/* Layout da Página */}
      <div className={styles.mainContentGrid}>

        {/* --- BARRA DE PESQUISA --- */}
        <div className={styles.searchBar}>
          <div className="search-bar">
            <label htmlFor="search-input" className="sr-only">Pesquisar por nome ou SKU</label>
            <input type="text" id="search-input" placeholder="Pesquisar por nome ou SKU" />
            <button>Pesquisar</button>
          </div>
        </div>

        {/* --- BOTÕES DE AÇÃO --- */}
        <div className={`${styles.btnNovoItem} action-button`}>
          <button id="novo-item" onClick={() => setIsNovoItemModalOpen(true)}> {/* Abre Modal 1 */}
            Novo Item
          </button>
        </div>
        <div className={`${styles.btnMovimentacao} action-button`}>
          <button id="registrar-movimentacao" onClick={() => setIsMovimentoModalOpen(true)}> {/* Abre Modal 2 */}
            Registrar Movimentação
          </button>
        </div>

        {/* --- CARDS --- */}
        <Card
          className={styles.cardTotal}
          title="Itens Diferentes"
          value={stats.totalItens}
        />
        <Card
          className={styles.cardValor}
          title="Valor em Estoque"
          value={formatBRL(stats.valorTotalEstoque)}
          variant="info"
        />
        <Card
          className={styles.cardBaixoEstoque}
          title="Itens com Baixo Estoque"
          value={stats.itensBaixoEstoque}
          variant="warning"
        />

        {/* --- TABELA (LIMPA) --- */}
        <div className={`table-container ${styles.tableContainer}`}>
          <table><thead><tr>
              <th>Status</th>
              <th>Nome</th>
              <th>SKU</th>
              <th>Categoria</th>
              <th>Qtd. Atual</th>
              <th className="text-center">Ações</th>
            </tr></thead><tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className={`status ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.sku}</td>
                  <td>{item.categoria}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    <div className="table-actions">
                      <button className="table-actions__button table-actions__button--view" title="Ver Histórico de Movimentações">
                        <span className="sr-only">Histórico</span>
                        <HistoryIcon />
                      </button>
                      <button className="table-actions__button table-actions__button--edit" title="Editar Item (Nome, Categoria, etc)">
                        <span className="sr-only">Editar</span>
                        <EditIcon />
                      </button>
                      <button className="table-actions__button table-actions__button--delete" title="Inativar Item">
                        <span className="sr-only">Inativar</span>
                        <InactivateIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody></table>
        </div>
      </div>
    </>
  );
}