import { useNavigate } from 'react-router-dom';
import './SharedTopBar.css';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa'; 

interface SharedTopBarProps {
  pageType: 'login' | 'register' | 'chat' | 'tutorial' | 'profile' | 'info' | 'agenda';
  onShowChatView?: () => void;    
  onShowHistoryView?: () => void; 
  isHistoryViewActive?: boolean;  
}

const SharedTopBar = ({ pageType, onShowChatView, onShowHistoryView, isHistoryViewActive }: SharedTopBarProps) => {
  const navigate = useNavigate();

  const showBackButton =
    pageType === 'tutorial' ||
    pageType === 'profile' ||
    pageType === 'info' ||
    pageType === 'agenda'; // agora mostra o botão voltar também na agenda, se quiser

  const handleAutBotClick = () => {
    if (pageType === 'chat' && onShowChatView) {
      onShowChatView(); 
    } else {
      navigate('/');
    }
  };

  return (
    <header className="shared-top-bar">
      <div className="shared-top-bar-left">
        <div className="shared-top-bar-return">
          {showBackButton && (
            <button title="Voltar" className="shared-nav-button icon-button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} />
            </button>
          )}
        </div>
        <img src="/AutBot_Logo.png" alt="AutBot Logo" className="shared-logo" />
        <button className="shared-app-name-button" onClick={handleAutBotClick}>
          AutBot
        </button>
      </div>

      <nav className="shared-top-bar-right">
        {(pageType === 'chat' || pageType === 'agenda') && (
          <>
            <button className="shared-nav-button" onClick={() => navigate('/')}>
              Sair
            </button>
            <button className="shared-nav-button" onClick={() => navigate('/tutorial')}>
              Tutorial
            </button>
            <button className="shared-nav-button" onClick={() => navigate('/agenda')}>
              Agenda
            </button>
            <button title="Perfil" className="shared-nav-button icon-button" onClick={() => navigate('/perfil')}>
              <FaUserCircle size={20} />
            </button>
          </>
        )}

        {(pageType === 'login' || pageType === 'register') && (
          <>
            <button className="shared-nav-button" onClick={() => navigate(pageType === 'login' ? '/cadastro' : '/')}>
              {pageType === 'login' ? 'Cadastre-se' : 'Login'}
            </button>
            <button className="shared-nav-button" onClick={() => navigate('/sobre')}>
              Info
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default SharedTopBar;
