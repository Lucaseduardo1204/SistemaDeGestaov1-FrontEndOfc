import type { NextAuthConfig } from 'next-auth';

// A palavra 'export' aqui é a correção mais importante
export const authConfig = {
  providers: [], // Deixamos vazio, a lógica principal está no auth.ts
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Adicionamos os callbacks aqui também para o middleware usar
    jwt({ token, user }) {
      if (user) {
        token.permissao = user.permissao;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.permissao) {
        // Corrigindo o 'as any' para ser type-safe
        session.user.permissao = token.permissao as 'ADMIN' | 'FINANCEIRO' | 'VENDEDOR' | 'PRODUCAO';
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      // Esta função precisa existir e retornar true
      // para que o objeto 'auth' seja populado no middleware.
      return true; 
    },
  },
} satisfies NextAuthConfig;