import React, { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../utils/types';
import avatarPlaceholder from "../images/profile.png";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    phone: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout: () => void;
  toggleFavorite: (carId: string) => void; // Add favorite function
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const API_URL = 'https://carvex-1.onrender.com/auth';

  // Load user/token from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser({
        ...parsedUser,
        avatar: parsedUser.avatar || avatarPlaceholder,
        reservations: parsedUser.reservations || [],
        phone: parsedUser.phone || '',
        favorites: parsedUser.favorites || [],
      });
    }
    if (savedToken) setToken(savedToken);
  }, []);

  // Sign up function
 const signup = async (
   name: string,
   email: string,
   password: string,
   phone: string,
   navigate: (path: string) => void
 ) => {
   try {
     const res = await fetch(`${API_URL}/register`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ name, email, password, phone }),
     });

     const data = await res.json();

     // Si la réponse n'est pas OK
     if (!res.ok) {
       // Vérifie si le serveur renvoie un message
       const msg = data?.message || data?.error || "Erreur lors de l'inscription";
       throw new Error(msg);
     }

     const userWithDefaults: User = {
       id: data._id || '',
       name: data.name || name,
       email: data.email || email,
       phone: data.phone || phone,
       avatar: data.avatar || avatarPlaceholder,
       favorites: data.favorites || [],
       reservations: data.reservations || [],
     };

     setUser(userWithDefaults);

     navigate('/login');
   } catch (err: any) {
     // Toujours afficher le message d'erreur côté frontend
     const message = err?.message || "Erreur inconnue lors de l'inscription";
     throw new Error(message);
   }
 };


  // Login function
  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Email ou mot de passe incorrect');

    const data = await res.json();
    if (!data.access_token) throw new Error('Token non reçu du serveur');

    const userWithDefaults: User = {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      phone: data.user.phone || '',
      avatar: data.user.avatar || avatarPlaceholder,
      favorites: data.user.favorites || [],
      reservations: data.user.reservations || [],
    };

    setUser(userWithDefaults);
    setToken(data.access_token);

    localStorage.setItem('user', JSON.stringify(userWithDefaults));
    localStorage.setItem('token', data.access_token);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Toggle favorite function
  const toggleFavorite = (carId: string) => {
    if (!user) {
      alert('Vous devez être connecté pour ajouter aux favoris');
      return;
    }

    const updatedFavorites = user.favorites?.includes(carId)
      ? user.favorites.filter(id => id !== carId) // remove
      : [...(user.favorites || []), carId]; // add

    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Optional: send update to backend
    // fetch(`http://localhost:3000/users/${user.id}/favorites`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ favorites: updatedFavorites }),
    // });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, toggleFavorite, setUser, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be utilisé dans AuthProvider');
  return context;
}
