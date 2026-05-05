import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { formatUsername } from "../../utils/profileUtil";

function Header() {
    const { isLoginOpen, openLogin, closeLogin, user, setUser } = useAuth();

    function handleLogout() {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <header className="container-fluid bg-black">
            <div className="container p-2 d-flex align-items-center justify-content-between">
                <Link to={"/home"} className="text-white">App<span className="text-warning fw-bold">Social</span></Link>

                <div className="d-flex align-items-center gap-2">
                    {user && (<>
                        <Link to={"/profiles/" + user.username} className="text-white px-3 d-flex align-items-center gap-2">
                            {user?.profilePicture ? (
                            <img src={user.profilePicture}></img>
                            ) : (
                            <div style={{width: 30, height: 30}} className="d-flex justify-content-center align-items-center bg-secondary rounded-pill">
                                {formatUsername(user?.username)}
                            </div>
                            )}
                            <span>Perfil</span>
                        </Link>
                    </>)}

                    <button
                        className="rounded-3 px-3 py-1 fw-semibold"
                        onClick={user ? handleLogout : openLogin}
                    >
                        {user ? "Logout" : "Login"}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header;