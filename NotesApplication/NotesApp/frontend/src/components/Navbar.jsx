import { LogOut, StickyNote } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <StickyNote className="brand-icon" />
          <span>My Notes</span>
        </div>
        
        <button onClick={onLogout} className="logout-button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;