import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { getCurrentUser, signOut } from '@aws-amplify/auth';
import { Chatbot } from './components/Chatbot';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Verifica se o usuário já possui uma sessão ativa ao carregar o app
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  };

  // Evita flash de tela branca enquanto verifica o estado de login
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Carregando aplicação...</p>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <main className="flex-1 flex flex-col justify-center items-center p-6">
          <Chatbot />
        </main>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;