'use client'; // 1. Precisa ser Client Component para checar a URL

import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation'; // 2. Importa o hook para ler a URL

const inter = Inter({ subsets: ['latin'] });

// O metadata não pode ser exportado de um 'use client', então o definimos fora
// ou (para este caso) podemos simplesmente removê-lo daqui e deixar o Next.js inferir.
// Para simplificar, vamos remover o 'export const metadata'.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 3. Pega o caminho da URL atual
  const pathname = usePathname();
  
  // 4. Verifica se estamos na página de login
  const isLoginPage = pathname === '/login';

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>
          {/* 5. A LÓGICA MÁGICA: */}
          {isLoginPage ? (
            // Se for a tela de login, renderiza SÓ os filhos (a página de login)
            children
          ) : (
            // Se for qualquer outra tela, renderiza o layout completo do sistema
            <div className="page-grid">
              <Header />
              <Sidebar />
              <main className="main-content">
                {children}
                <footer className="footer">
                  &copy; Desenvolvido por Lucas Eduardo
                </footer>
              </main>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}