import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { getCurrentUser, signOut } from '@aws-amplify/auth';

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
        <div className="min-h-screen bg-gray-100 flex flex-col">
          
          <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Chatbot Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
            >
              Sair
            </button>
          </header>

          
          <main className="flex-1 flex flex-col justify-center items-center p-6">
            <div className="bg-white w-full max-w-4xl h-[600px] rounded-xl shadow-md border border-gray-200 flex flex-col justify-center items-center">
              <p className="text-gray-400 text-lg font-medium">
                [ Espaço reservado para a interface do Chatbot ]
              </p>
              <span className="text-xs text-gray-400 mt-2">
                Conexão com Cognito validada com sucesso!
              </span>
            </div>
          </main>
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;