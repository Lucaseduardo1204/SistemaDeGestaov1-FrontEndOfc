import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;

  // 1. Define qual é a página de login
  const isLoginPage = nextUrl.pathname.startsWith('/login');

  // 2. Define as rotas que exigem permissão especial (ADMIN/FINANCEIRO)
  const specialPermissionRoutes = ['/usuarios', '/caixa', '/estoque']; // <-- ADICIONE /estoque
  const isSpecialPermissionRoute = specialPermissionRoutes.some(route =>
    nextUrl.pathname.startsWith(route)
  );

  // --- LÓGICA PRINCIPAL ---

  // 3. Se o usuário está tentando acessar a página de login
  if (isLoginPage) {
    if (isLoggedIn) {
      // Se ele JÁ ESTÁ LOGADO, chuta ele para a home (/)
      return Response.redirect(new URL('/', nextUrl));
    }
    // Se não está logado, deixa ele ver a página de login
    return;
  }

  // 4. Se o usuário está tentando acessar QUALQUER OUTRA PÁGINA
  if (!isLoggedIn) {
    // E NÃO ESTÁ LOGADO, chuta ele para a página de login
    return Response.redirect(new URL('/login', nextUrl));
  }

  // 5. Se ele ESTÁ LOGADO, mas acessou uma rota especial
  if (isLoggedIn && isSpecialPermissionRoute) {
    const userPermission = auth.user?.permissao;
    
    // Verifica a permissão que definimos
    if (userPermission !== 'ADMIN' && userPermission !== 'FINANCEIRO') {
      // Não tem permissão? Chuta ele para a home (/)
      return Response.redirect(new URL('/', nextUrl));
    }
  }

  // 6. Se está logado e tem permissão (ou a rota não é especial), deixa passar
  return;
});


// 7. O NOVO MATCHER (O Porteiro)
// Isso faz o middleware rodar em TODAS as rotas, exceto
// pastas de sistema (_next/static, _next/image, api) e arquivos de imagem (/img).
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|img|favicon.ico).*)',
  ],
};