'use client';

// Import do 'useState'
import { useState } from 'react';
// Caminho relativo para 'components'
import { Modal } from '../../components/Modal';
import { Card } from '../../components/Card';

// Caminho relativo para 'types'
// CORREÇÃO: Nome do arquivo é 'cliente.ts' (singular)
import { Cliente, StatsClientes, ClienteStatus } from '../../types/clientes';

// Este não muda
import styles from './Clientes.module.css';

// Import do 'NovoClienteForm' (está na mesma pasta)
import { NovoClienteForm } from './NovoClienteForm';

// --- ÍCONES ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
);
const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
);

function getStatusClass(status: ClienteStatus): string {
  return status === 'ATIVO' ? 'status--ativo' : 'status--inativo';
}

// Props
type ClientesPageProps = {
  stats: StatsClientes;
  clientes: Cliente[];
};

export function ClientesPageClient({ stats, clientes }: ClientesPageProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Cliente"
      >
        <NovoClienteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
      <div className={styles.mainContentGrid}>
        {/* --- BARRA DE PESQUISA --- */}
        <div className={styles.searchBar}>
          <div className="search-bar">
            <label htmlFor="search-input" className="sr-only">Pesquisar por nome, email ou documento</label>
            <input type="text" id="search-input" placeholder="Pesquisar por nome, email ou documento" />
            <button>Pesquisar</button>
          </div>
        </div>
        {/* --- BOTÃO DE AÇÃO --- */}
        <div className={styles.actionButton}>
          <div className="action-button">
            <button id="novo-cliente" onClick={() => setIsModalOpen(true)}>
              Novo Cliente
            </button>
          </div>
        </div>
        {/* --- CARDS --- */}
        <Card
          className={styles.cardTotal}
          title="Total de Clientes"
          value={stats.totalClientes}
        />
        <Card
          className={styles.cardAtivos}
          title="Clientes Ativos"
          value={stats.totalAtivos}
          variant="positive"
        />
        <Card
          className={styles.cardInativos}
          title="Clientes Inativos"
          value={stats.totalInativos}
          variant="negative"
        />

        {/* --- TABELA DE CLIENTES (LIMPA E AGRESSIVA) --- */}
        <div className={`table-container ${styles.tableContainer}`}>
          {/* TUDO JUNTO AQUI ↓ */}
          <table><thead><tr>
                <th>Status</th>
                <th>Nome</th>
                <th>Documento</th>
                <th>Email</th>
                <th>Telefone</th>
                <th className="text-center">Ações</th>
          </tr></thead><tbody>
            {clientes.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className={`status ${getStatusClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.nome}</td>
                <td>{item.documento}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>
                  <div className="table-actions">
                    <button className="table-actions__button table-actions__button--view" title="Visualizar Cliente">
                      <span className="sr-only">Visualizar</span>
                      <ViewIcon />
                    </button>
                    <button
                      className="table-actions__button table-actions__button--edit"
                      title="Editar Cliente"
                      disabled={item.status === 'INATIVO'}
                      // onClick={() => setClienteParaEditar(item)}
                    >
                      <span className="sr-only">Editar</span>
                      <EditIcon />
                    </button>
                    <button
                      className="table-actions__button table-actions__button--delete"
                      title="Inativar Cliente"
                      disabled={item.status === 'INATIVO'}
                    >
                      <span className="sr-only">Inativar</span>
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody></table>
          {/* TUDO JUNTO AQUI ↑ */}
        </div>
      </div>
    </>
  );
}