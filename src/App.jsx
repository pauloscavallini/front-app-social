import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import ModalLogin from './components/ModalLogin/ModalLogin';
import Profile from './pages/Profile/Profile';
import ModalPost from './components/ModalPost/ModalPost';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalLogin />
        <ModalPost />
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/profiles/:id" element={<Profile />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;