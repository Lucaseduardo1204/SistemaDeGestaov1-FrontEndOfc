import { Card } from '@/components/Card';
import { getUsuarios } from '@/lib/data';
import { UserStatus } from '@/types/usuario';
import { Suspense } from 'react';
import styles from './Usuarios.module.css'; // Importa o CSS Module

// --- ÍCONES (copie da sua 'page.tsx' principal) ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
);
const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
);

// Helper para classe de status
function getStatusClass(status: UserStatus): string {
  return status === 'Ativo' ? 'status--ativo' : 'status--inativo';
}

// --- COMPONENTE DA PÁGINA ---
export default async function UsuariosPage() {
  
  const usuarios = await getUsuarios();

  // Calcula os stats
  const totalAdmins = usuarios.filter(u => u.cargo === 'Administrador').length;
  const totalAtivos = usuarios.filter(u => u.status === 'Ativo').length;

  return (
    <div className={styles.mainContentGrid}>
      
      {/* --- BARRA DE PESQUISA (Corrigido) --- */}
      <div className={styles.searchBar}>
        <div className="search-bar"> {/* Classe global do base.css */}
          <label htmlFor="search-input" className="sr-only">Pesquisar por nome ou e-mail</label>
          <input type="text" id="search-input" placeholder="Pesquisar por nome ou e-mail" />
          <button>Pesquisar</button>
        </div>
      </div>

      {/* --- BOTÃO DE AÇÃO (Corrigido) --- */}
      <div className={styles.actionButton}>
        <div className="action-button"> {/* Classe global do base.css */}
          <button id="novo-usuario">Novo Usuário</button>
        </div>
      </div>

      {/* --- CARDS (Corrigido) --- */}
      <Card
        className={styles.cardTotalUsers}
        title="Total de Usuários"
        value={usuarios.length}
      />
      <Card
        className={styles.cardAdmins}
        title="Administradores"
        value={totalAdmins}
        variant="info"
      />
      <Card
        className={styles.cardActiveUsers}
        title="Usuários Ativos"
        value={totalAtivos}
        variant="positive"
      />

      {/* --- TABELA (Corrigido) --- */}
      <div className={`table-container ${styles.tableContainer}`}>
        <table>
          <thead>
            <tr>
              
              <th colSpan={2}>Nome</th>
              <th>E-mail</th>
              <th>Cargo</th>
              <th>Status</th>
              <th className="text-center">Ações</th> {/* Centraliza o título */}
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<tr><td colSpan={6}>Carregando...</td></tr>}>
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="table-user__avatar">{user.avatar}</div>
                  </td>
                  <td>
                    <div className="table-user__name">{user.nome}</div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.cargo}</td>
                  <td>
                    <span className={`status ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {/* ÍCONES DE AÇÃO */}
                    <div className="table-actions">
                      <button className="table-actions__button table-actions__button--view" title="Visualizar usuário">
                        <span className="sr-only">Visualizar</span>
                        <ViewIcon />
                      </button>
                      <button className="table-actions__button table-actions__button--edit" title="Editar usuário">
                        <span className="sr-only">Editar</span>
                        <EditIcon />
                      </button>
                      <button className="table-actions__button table-actions__button--delete" title="Excluir usuário">
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