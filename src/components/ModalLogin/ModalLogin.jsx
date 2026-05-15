// import { Link } from "react-router-dom";
import styles from "./ModalLogin.module.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function ModalLogin() {
    const { isLoginOpen, closeLogin, setUser, openRegister } = useAuth();
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ login: "", password: "" });

    if (!isLoginOpen) return null;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                credentials: "include",
                body: JSON.stringify(form)
            });

            const contentType = response.headers.get("content-type");
            const data = (contentType && contentType.includes("application/json")) 
                         ? await response.json() 
                         : {};

            if (response.ok) {
                const profile = data.profile
                localStorage.setItem('user', JSON.stringify(profile));
                setUser(profile);
                closeLogin();
            } else {
                setError(data.message || "Credenciais inválidas");
            }
        } catch {
            setError("Erro ao conectar com o servidor.");
        }
    }

    return (
        <div className={styles.background + " d-flex justify-content-center align-items-center"}>
            <form onSubmit={handleLogin} className={styles.card + " container col-12 col-sm-10 col-lg-5 d-flex flex-column align-items-center px-5 py-5 gap-3 rounded-4 position-relative"}>
                <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" onClick={closeLogin}></button>
                
                <span className="fs-2 text-white">Login</span>
                {error && <span className="text-danger fw-bold text-center">{error}</span>}

                <div className="w-100">
                    <label className="text-white">Username</label>
                    <input name="login" onChange={handleChange} value={form.login} className="form-control bg-secondary bg-opacity-25 text-white border-secondary" required />
                </div>

                <div className="w-100">
                    <label className="text-white">Password</label>
                    <input name="password" type={visible ? "text" : "password"} onChange={handleChange} value={form.password} className="form-control bg-secondary bg-opacity-25 text-white border-secondary" required />
                </div>

                <button type="button" onClick={() => setVisible(!visible)} className="btn btn-sm btn-outline-light">
                    {visible ? "Ocultar senha" : "Exibir senha"}
                </button>

                <button type="submit" className="bg-white px-3 py-1 rounded-3 fw-semibold w-100 mt-2">Log-in</button>
                <span className="text-white-50 small">Não tem conta?<button type="button" onClick={(e) => {
                    e.preventDefault();
                    closeLogin();
                    openRegister();
                }} className="bg-transparent" style={{color: "var(--primary-color)"}}>Cadastre-se</button></span>
            </form>
        </div>
    );
}

export default ModalLogin;