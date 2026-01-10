import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailIcon, LockIcon, UserIcon, PhoneIcon, XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import carImage from "../images/carvex2.png";
import bgDesktop from '../images/background.jpg';
import bgMobile from '../images/hero.jpg';

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        await signup(name, email, password, phone, navigate);
        setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      } else {
        await login(email, password);
        setSuccess('Connexion réussie !');
        navigate('/profile');
      }
    } catch (err: any) {
        if (err.message.toLowerCase().includes('already exists') || err.message.toLowerCase().includes('existe')) {
          setError('⚠️ Cet email est déjà utilisé.');
        } else {
          setError(`⚠️ ${err.message}`);
        }
      }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      {/* Background */}
      <div className="absolute inset-0 sm:hidden bg-center bg-cover" style={{ backgroundImage: `url(${bgMobile})` }}></div>
      <div className="absolute inset-0 hidden sm:block bg-center bg-cover" style={{ backgroundImage: `url(${bgDesktop})` }}></div>

      {/* Content */}
      <div className="relative z-10 w-11/12 max-w-sm sm:max-w-md bg-white/80 rounded-2xl shadow-xl p-4 sm:p-8 text-black">
        <div className="text-center mb-4 sm:mb-6">
          <img src={carImage} alt="car" className="w-28 h-28 sm:w-20 sm:h-20 object-contain mx-auto" />
          <h2 className="text-base sm:text-xl mt-2 sm:mt-4 text-left">
            {isSignUp ? 'Créer un compte' : 'Connectez-vous à votre compte'}
          </h2>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            <span>{error}</span>
            <XIcon className="w-4 h-4 cursor-pointer" onClick={() => setError('')} />
          </div>
        )}

        {success && (
          <div className="flex items-center justify-between bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            <span>{success}</span>
            <XIcon className="w-4 h-4 cursor-pointer" onClick={() => setSuccess('')} />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-6">
          {isSignUp && (
            <div className="relative">
              <UserIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 sm:py-3 rounded-3xl bg-white/50 border border-gray-500 text-black text-sm sm:text-base placeholder-gray-400"
                placeholder="Nom complet"
                required
              />
            </div>
          )}

          <div className="relative">
            <MailIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 sm:py-3 rounded-3xl bg-white/50 border border-gray-500 text-black text-sm sm:text-base placeholder-gray-400"
              placeholder="Email"
              required
            />
          </div>

          {isSignUp && (
            <div className="relative">
              <PhoneIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 sm:py-3 rounded-3xl bg-white/50 border border-gray-500 text-black text-sm sm:text-base placeholder-gray-400"
                placeholder="Téléphone"
                required
              />
            </div>
          )}

          <div className="relative">
            <LockIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 sm:py-3 rounded-3xl bg-white/50 border border-gray-500 text-black text-sm sm:text-base placeholder-gray-400"
              placeholder="Mot de passe"
              required
            />
          </div>

          <button className="w-full py-2 sm:py-2.5 bg-primary rounded-3xl text-white font-semibold text-sm sm:text-base mt-2">
            {isSignUp ? 'Créer un compte' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-3 sm:mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-black text-xs sm:text-sm underline hover:text-primary"
          >
            {isSignUp
              ? 'Vous avez déjà un compte ? Connectez-vous'
              : "Vous n'avez pas de compte ? Inscrivez-vous"}
          </button>
        </div>
      </div>
    </div>
  );
}

