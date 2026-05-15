import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { formatUsername } from "../../utils/profileUtil";

function Header() {
    const { isLoginOpen, openLogin, closeLogin, user, setUser } = useAuth();

    function handleLogout() {

        async function logOut() {
            const res = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                credentials: "include"
            })

            console.log(await res.text());
        }

        logOut();
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <header className="container-fluid bg-black">
            <div className="container p-2 d-flex align-items-center justify-content-between">
                <Link to={"/home"} className="text-white">App<span style={{color: "var(--primary-color)"}} className="fw-bold">Social</span></Link>

                <div className="d-flex align-items-center gap-2">
                    {user && (<>
                        <Link 
                            to={"/profiles/" + user.username}
                            className={"text-white px-3 d-flex align-items-center justify-content-between gap-2 rounded-3"}
                        >
                            {user?.profilePicture ? (
                            <img src={user.profilePicture}></img>
                            ) : (
                            <div style={{width: 25, height: 25}} className={"d-flex justify-content-center align-items-center bg-secondary rounded-pill"}>
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