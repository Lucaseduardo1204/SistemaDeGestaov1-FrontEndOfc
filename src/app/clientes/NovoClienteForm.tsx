'use client';

import { useState } from 'react';
// 1. REAPROVEITANDO O CSS DO LOGIN!
import styles from '../login/LoginForm.module.css';

// Props que o formulário aceita
type NovoClienteFormProps = {
  onClose: () => void; // Função para fechar o modal
};

export function NovoClienteForm({ onClose }: NovoClienteFormProps) {
  // 2. Estados para cada campo do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  // 3. A "Falsa Integração"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoCliente = { nome, email, documento, telefone, endereco };
    
    console.log('--- ENVIANDO NOVO CLIENTE ---');
    console.log(novoCliente);
    
    // Futuramente, aqui chamaremos o back-end
    // await fetch('/api/clientes', { ... });
    
    alert('Cliente salvo! (Veja o console)');
    onClose(); // Fecha o modal após salvar
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
          placeholder="Nome completo do cliente"
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
          placeholder="email@cliente.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="documento" className={styles.label}>Documento (CPF/CNPJ)*</label>
        <input
          type="text"
          id="documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          required
          className={styles.input}
          placeholder="00.000.000/0001-00"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="telefone" className={styles.label}>Telefone</label>
        <input
          type="tel"
          id="telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className={styles.input}
          placeholder="(34) 99999-9999"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="endereco" className={styles.label}>Endereço</label>
        <input
          type="text"
          id="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className={styles.input}
          placeholder="Rua das Flores, 123"
        />
      </div>

      {/* Botões de Ação dentro do formulário */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
        <button 
          type="button" // Importante: type="button" para não submeter o form
          className={styles.submitButton} 
          style={{ backgroundColor: 'var(--color-neutral)' }} // Cor cinza
          onClick={onClose}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Salvar Cliente
        </button>
      </div>
    </form>
  );
}