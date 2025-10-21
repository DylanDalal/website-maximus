// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Portfolio from './Portfolio';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Navbar */}
      <nav className="navbar" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '100vw',
        height: '60px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8vw',
        boxSizing: 'border-box',
        overflow: 'hidden',
        marginTop: '5px'
      }}>
        <Link to="/" className="navbar-logo">
          <img 
            src="/Logo2.png" 
            alt="Logo" 
            style={{
              height: '40px',
              width: 'auto'
            }}
          />
        </Link>
        <div className="navbar-links">
          <Link 
            to="/portfolio"
            className="navbar-link"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              textDecoration: 'none',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            Portfolio
          </Link>
        </div>
      </nav>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}
