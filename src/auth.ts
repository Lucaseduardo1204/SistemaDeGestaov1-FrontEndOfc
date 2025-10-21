import NextAuth, { type User } from "next-auth"; // Garanta que 'User' está importado
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

// 1. TIPO CORRETO (ADMIN, FINANCEIRO, COMUM)
type BackendUser = {
  id: string;
  nome: string;
  email: string;
  permissao: 'ADMIN' | 'FINANCEIRO' | 'COMUM'; // <-- CORRIGIDO
};

// Define o tipo do seu usuário para o NextAuth
declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends BackendUser {} // Estende a interface User do NextAuth
  interface Session {
    user: User;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials): Promise<User | null> {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // ==========================================================
        // SIMULAÇÃO (Com Tipos e Permissões Corretas)
        // ==========================================================
        const user: BackendUser = {
          id: '1',
          nome: 'Usuário Padrão',
          email: credentials.email as string,
          permissao: 'ADMIN' // Padrão ADMIN para testes
        };

        // Simula FINANCEIRO
        if (credentials.email === "financeiro@email.com") {
          user.permissao = 'FINANCEIRO';
          user.nome = 'Usuário Financeiro';
        }
        // Simula COMUM
        if (credentials.email === "comum@email.com") { // <-- CORRIGIDO
          user.permissao = 'COMUM';                   // <-- CORRIGIDO
          user.nome = 'Usuário Comum';
        }
        // ==========================================================

        // Futuramente, substitua a simulação pela chamada real ao back-end

        if (user /* && senhaCorreta */) { // Adicione a validação de senha aqui
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});