import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
    const { isLoginOpen, openLogin, closeLogin, user, setUser } = useAuth();

    function handleLogout() {
        localStorage.removeItem('logged');
        setUser(null);
    }

    return (
        <header className="container-fluid bg-black">
            <div className="container p-2 d-flex align-items-center justify-content-between">
                <Link to={"/home"} className="text-white">App<span className="text-warning fw-bold">Social</span></Link>
                <button
                    className="rounded-3 px-3 py-1 fw-semibold"
                    onClick={user ? handleLogout : openLogin}
                >
                    {user ? "Logout" : "Login"}
                </button>
            </div>
        </header>
    )
}

export default Header;