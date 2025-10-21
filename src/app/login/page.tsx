import { LoginForm } from './login-form';
import styles from './Login.module.css'; // Importa o CSS de layout
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      
      {/* 1. Painel da Esquerda (Branding) */}
      <div className={styles.brandingPanel}>
        <Image
          src="/img/Get-horizontal.svg" // Garanta que o logo está em /public/img/
          alt="Getmarcas Logo"
          width={300}
          height={75}
          className={styles.brandingLogo}
          priority
        />
        <p className={styles.brandingText}>
          Sistema de Gestão Integrada
        </p>
      </div>

      {/* 2. Painel da Direita (Formulário) */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Acessar Sistema</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}