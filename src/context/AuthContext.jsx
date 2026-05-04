import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPostOpen, setIsPostOpen] = useState(false);
    const [user, setUser] = useState(localStorage.getItem('logged'));

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    const openPost = () => setIsPostOpen(true);
    const closePost = () => setIsPostOpen(false);

    return (
        <AuthContext.Provider value={{ 
            isLoginOpen, openLogin, closeLogin,
            isPostOpen, openPost, closePost,
            user, setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de un AuthProvider");
    }
    return context;
}