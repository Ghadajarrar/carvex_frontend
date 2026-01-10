// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  HeartPulseIcon,
  LogOutIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import carImage from "../images/carvex2.png";
import avatarPlaceholder from "../images/profile.png";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showUserMenu, setShowUserMenu] = useState(false); // profile menu

  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu user quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll vers une section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Offres", scrollTo: "offers" },
    { name: "Services", scrollTo: "services" },
    { name: "À propos", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (link: typeof navLinks[0]) => {
    setShowUserMenu(false); // fermer menu user si ouvert
    if (link.path) {
      navigate(link.path);
      setIsOpen(false);
    } else if (link.scrollTo) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection(link.scrollTo!), 100);
      } else {
        scrollToSection(link.scrollTo);
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 w-[95%] z-50">
      <div className="flex items-center justify-between h-10 md:h-12 px-4 md:px-6 rounded-full bg-white/70 backdrop-blur-md shadow-md">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={carImage} alt="car" className="w-[70px] md:w-[90px]" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`relative text-sm font-medium text-black ${
                link.path && isActive(link.path) ? "font-semibold" : ""
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 ml-auto">

          {/* User menu */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2"
              >
                <div className="h-6 w-6 md:h-7 md:w-7 rounded-full overflow-hidden">
                  <img
                    src={user.avatar || avatarPlaceholder}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden md:block text-sm font-medium text-black">
                  {user.name}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-3 border-b">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      <UserIcon size={14} /> Mon profil
                    </button>
                    <button
                      onClick={() => { navigate('/reservations'); setShowUserMenu(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      <HeartPulseIcon size={14} /> Mes réservations
                    </button>
                    <button
                      onClick={() => { logout(); navigate('/login'); setShowUserMenu(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    >
                      <LogOutIcon size={14} /> Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-white px-3 py-1 rounded-full text-xs md:text-sm"
            >
              Connexion
            </Link>
          )}

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
            {isOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 flex flex-col space-y-2">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className="block py-2 text-sm text-black font-medium text-left"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
