import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import ModalLogin from './components/ModalLogin/ModalLogin';
import Profile from './pages/Profile/Profile';
import ModalPost from './components/ModalPost/ModalPost';
import ModalCadastro from './components/ModalCadastro/ModalCadastro';
import Post from './pages/PostPage/PostPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalLogin />
        <ModalPost />
        <ModalCadastro />
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/profiles/:id" element={<Profile />} />
            <Route path="/posts/:id" element={<Post />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;