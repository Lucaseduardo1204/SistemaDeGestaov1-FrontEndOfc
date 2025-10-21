'use client';

import { useState } from 'react';
import styles from '../login/LoginForm.module.css'; // Reusa o CSS
import { UserStatus } from '../../types/usuario'; // Importa o tipo Status

// Props
type NovoUsuarioFormProps = {
  onClose: () => void;
  // Futuramente: userToEdit?: User | null; // Para edição
};

// Permissões baseadas no auth.ts (ajuste se necessário)
const permissoes = ['ADMIN', 'FINANCEIRO', 'COMUM'];

export function NovoUsuarioForm({ onClose }: NovoUsuarioFormProps) {
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState<string>(permissoes[1]); // Padrão Financeiro
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState<UserStatus>('Ativo');
  // "Falsa Integração"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoUsuario = { nome, email, cargo, senha, status }; // Inclui senha só na criação
    
    console.log('--- ENVIANDO NOVO USUÁRIO ---');
    console.log(novoUsuario);
    
    // Futuramente, chamar API POST /api/usuarios
    
    alert('Usuário salvo! (Veja o console)');
    onClose(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="nome" className={styles.label}>Nome*</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className={styles.input}
          placeholder="Nome completo do usuário"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          placeholder="usuario@email.com"
        />
      </div>

       <div className={styles.formGroup}>
        <label htmlFor="senha" className={styles.label}>Senha* (Mínimo 6 caracteres)</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required 
          minLength={6} // Validação básica
          className={styles.input}
          placeholder="••••••••"
          // Não preencher senha na edição
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="cargo" className={styles.label}>Cargo*</label>
        <select
          id="cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
          className={styles.input}
        >
          {permissoes.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      
       <div className={styles.formGroup}>
        <label htmlFor="status" className={styles.label}>Status*</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as UserStatus)}
          required
          className={styles.input}
        >
          <option value="ATIVO">Ativo</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>

      {/* Botões */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
        <button 
          type="button" 
          className={styles.submitButton} 
          style={{ backgroundColor: 'var(--color-neutral)' }}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Salvar Usuário
        </button>
      </div>
    </form>
  );
}