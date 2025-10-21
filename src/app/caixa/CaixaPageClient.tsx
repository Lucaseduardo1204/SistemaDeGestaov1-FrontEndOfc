'use client';

import { useState } from 'react';
import { Card } from '../../components/Card'; // Caminho relativo
import { Modal } from '../../components/Modal'; // Caminho relativo
import { NovaTransacaoForm } from './NovaTransacaoForm';
import styles from './Caixa.module.css';
import { TransacaoCaixa, StatsCaixa, TipoTransacao } from '../../types/caixa'; // Caminho relativo
import { formatBRL } from '../../lib/data'; // Caminho relativo

// --- ÍCONES SVG ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
);
// Ícone de Estorno (Histórico/Reverter)
const EstornoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
);
// --- FIM DOS ÍCONES ---

// Helpers
function getValorClass(tipo: TipoTransacao): string {
  return tipo === 'Entrada' ? styles.valorEntrada : styles.valorSaida;
}
function getStatusClass(tipo: TipoTransacao): string {
    return tipo === 'Entrada' ? 'status--entrada' : 'status--saida';
}

// Props
type CaixaPageProps = {
  stats: StatsCaixa;
  transacoes: TransacaoCaixa[];
};

export function CaixaPageClient({ stats, transacoes }: CaixaPageProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nova Transação"
      >
        <NovaTransacaoForm onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div className={styles.mainContentGrid}>

        {/* --- BARRA DE PESQUISA --- */}
        <div className={styles.searchBar}>
          <div className="search-bar">
            <label htmlFor="search-input" className="sr-only">Pesquisar por descrição ou ID</label>
            <input type="text" id="search-input" placeholder="Pesquisar por descrição ou ID" />
            <button>Pesquisar</button>
          </div>
        </div>

        {/* --- BOTÃO DE AÇÃO --- */}
        <div className={styles.actionButton}>
          <div className="action-button">
            <button id="entrada-saida" onClick={() => setIsModalOpen(true)}>
                Registrar Entrada/Saída
            </button>
          </div>
        </div>

        {/* --- CARDS --- */}
        <div className={`${styles.cardFluxo} card card--double`}>
            <div className="card__item">
                <h2 className="card__title">Entrada mês <span>{stats.fluxoMes.mes}</span></h2>
                <p className="card__value card__value--positive">{formatBRL(stats.fluxoMes.entrada)}</p>
            </div>
            <div className="card__item">
                <h2 className="card__title">Saída mês <span>{stats.fluxoMes.mes}</span></h2>
                <p className="card__value card__value--negative">{formatBRL(stats.fluxoMes.saida)}</p>
            </div>
        </div>
        <Card
            className={styles.cardEntradas}
            title="Nº Entradas Totais"
            value={stats.totalEntradas}
        />
        <Card
            className={styles.cardSaidas}
            title="Nº Saídas Totais"
            value={stats.totalSaidas}
        />
        <div className={`${styles.cardGastos} card`}>
            <h2 className="card__title">Principais Categorias de Gastos</h2>
            <ul className="card__list">
            {stats.principaisGastos.map((gasto, index) => (
                <li key={index}>{gasto}</li>
            ))}
            </ul>
        </div>

        {/* --- TABELA (LIMPA) --- */}
        <div className={`table-container ${styles.tableContainer}`}>
          <table><thead><tr>
              <th>Tipo</th>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Hora</th>
              <th className="text-center">Ações</th>
            </tr></thead><tbody>
              {transacoes.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className={`status ${getStatusClass(item.tipo)}`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td className={getValorClass(item.tipo)}>
                    {item.tipo === 'Saida' && '- '}
                    {formatBRL(item.valor)}
                  </td>
                  <td>{item.data}</td>
                  <td>{item.hora}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="table-actions__button table-actions__button--edit"
                        title="Editar Descrição/Categoria" // Só pode editar isso
                        >
                        <span className="sr-only">Editar</span>
                        <EditIcon />
                      </button>
                      <button
                        className="table-actions__button table-actions__button--delete" // Reutiliza a classe de cor vermelha
                        title="Estornar Lançamento" // Ação recomendada é estorno
                        >
                        <span className="sr-only">Estornar</span>
                        <EstornoIcon />
                      </button>
                       <button
                        className="table-actions__button table-actions__button--delete"
                        title="Excluir Lançamento (Não recomendado)" // Exclusão existe, mas não é ideal
                        >
                        <span className="sr-only">Excluir</span>
                        <DeleteIcon />
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