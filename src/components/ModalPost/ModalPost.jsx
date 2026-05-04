import styles from "./ModalPost.module.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function ModalPost() {
    const { isPostOpen, closePost } = useAuth();
    const [error, setError] = useState("");
    const [content, setContent] = useState("");

    if (!isPostOpen) return null;

    async function handlePost() {
        try {
            const response = await fetch("http://localhost:8080/posts/create", {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                    'content': content
                }),
                credentials: "include"
            })

            if (response.status !== 201) {
                switch (response.status) {
                    case 403:
                        throw Error("Não autenticado");
                    default:
                        throw Error("Houve um erro")
                }
            }

            setError("");

            const data = await response.json();
            console.log(data);
            
        } catch(err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <div className={styles.background + " d-flex justify-content-center align-items-center"}>
            <div className={styles.card + " container w-25 d-flex flex-column align-items-center px-5 py-5 gap-3 rounded-4 position-relative"}>
                <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" onClick={closePost}></button>
                
                {error && <span className="text-danger fw-bold text-center">{error}</span>}

                <div className="w-100">
                    <textarea
                        type="textarea"
                        rows="4"
                        name="login"
                        onChange={e => setContent(e.target.value)}
                        value={content}
                        style={{ resize: "none" }}
                        className="form-control bg-secondary bg-opacity-25 text-white border-secondary"
                        required
                    />
                </div>

                <button onClick={handlePost} className="bg-white px-3 py-1 rounded-3 fw-semibold w-100 mt-2">Publicar</button> 
            </div>
        </div>
    );
}

export default ModalPost;