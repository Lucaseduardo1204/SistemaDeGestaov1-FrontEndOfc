import { Card } from '@/components/Card';
import styles from './Principal.module.css';
// 1. CORREÇÃO: Importa a função 'getRecentOrcamentos'
import { getDashboardStats, getRecentOrcamentos, formatBRL } from '@/lib/data';
import { getStatusClass } from '@/lib/utils';
import { Suspense } from 'react';
import { auth } from '@/auth'; // 1. IMPORTAR A FUNÇÃO 'auth'

// --- ÍCONES (COMPLETOS) ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
);

const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
);


// --- COMPONENTE DA PÁGINA PRINCIPAL ---
export default async function HomePage() {
  
  const session = await auth();
  const userPermission = session?.user?.permissao;
  const canViewCaixaCard = userPermission === 'ADMIN' || userPermission === 'FINANCEIRO';

  const [stats, orcamentos] = await Promise.all([
    getDashboardStats(),
    getRecentOrcamentos(), // 2. CORREÇÃO: Chama a função correta
  ]);

  return (
    <div className={styles.mainContentGrid}>
      
      {/* --- BARRA DE PESQUISA --- */}
      <div className={styles.searchBar}>
        <div className="search-bar"> 
          <label htmlFor="search-input" className="sr-only">
            Pesquisar por nome ou ID de serviço
          </label>
          <input type="text" id="search-input" placeholder="Digite o nome ou ID de serviço" />
          <button>Pesquisar</button>
        </div>
      </div>

      {/* --- BOTÃO DE AÇÃO --- */}
      <div className={styles.actionButton}>
        <div className="action-button"> 
          <button id="novo-orcamento">Novo Orçamento</button>
        </div>
      </div>

      {/* 4. RENDERIZAÇÃO CONDICIONAL */}
      {canViewCaixaCard && (
        <div className={`${styles.cardFluxoMes} card card--double`}>
          <div className={styles.cardItem}>
            <h2 className="card__title">Entrada mês <span>{stats.fluxoMes.mes}</span></h2>
            <p className="card__value card__value--positive">
              {formatBRL(stats.fluxoMes.entrada)}
            </p>
          </div>
          <div className={styles.cardItem}>
            <h2 className="card__title">Saída mês <span>{stats.fluxoMes.mes}</span></h2>
            <p className="card__value card__value--negative">
              {formatBRL(stats.fluxoMes.saida)}
            </p>
          </div>
        </div>
      )}

      {/* --- CARDS SIMPLES --- */}
      <Card
        className={styles.cardAprovados}
        title="Orçamentos Aprovados"
        value={stats.aprovados}
        variant="positive"
      />
      <Card
        className={styles.cardPendentes}
        title="Orçamentos Pendentes"
        value={stats.pendentes}
        variant="warning"
      />
      <Card
        className={styles.cardInstalacao}
        title="Próxima Instalação"
        value={stats.proximaInstalacao.data}
        subValue={stats.proximaInstalacao.hora}
        variant="default"
      />

      {/* --- TABELA DE ORÇAMENTOS --- */}
      <div className={`table-container ${styles.tableContainer}`}>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>ID</th>
              <th>Nome Cliente</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Previsão</th>
              <th>Pagamento</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<tr><td colSpan={8}>Carregando...</td></tr>}>
              {orcamentos.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className={`status ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.id}</td>
                  {/* 3. CORREÇÃO: Nomes dos campos atualizados */}
                  <td>{item.clienteNome}</td>
                  <td>{item.endereco}</td>
                  <td>{item.clienteTelefone}</td>
                  <td>{item.previsaoData}</td>
                  <td>{item.pagamentoStatus}</td>
                  <td>
                    <div className="table-actions">
                      <button className="table-actions__button table-actions__button--view" title="Visualizar item">
                        <span className="sr-only">Visualizar</span>
                        <ViewIcon />
                      </button>
                      <button className="table-actions__button table-actions__button--edit" title="Editar item">
                        <span className="sr-only">Editar</span>
                        <EditIcon />
                      </button>
                      <button className="table-actions__button table-actions__button--delete" title="Excluir item">
                        <span className="sr-only">Excluir</span>
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}