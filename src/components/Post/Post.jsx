import { Link, useNavigate } from "react-router-dom";
import { formatarData } from "../../utils/dateFormat";
import styles from "./Post.module.css";
import { formatUsername } from "../../utils/profileUtil";
import moreIcon from "/more.svg";
import { useState, useEffect, useRef } from "react";

function Post({ post, onDelete }) {
    const [opened, setOpened] = useState(false);
    const menuRef = useRef(null); // Referência para detectar clique fora
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (opened && menuRef.current && !menuRef.current.contains(event.target)) {
                setOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [opened]);

    const handlePostClick = () => {
        const selection = window.getSelection();
        if (selection.toString().length > 0) {
            return;
        }
        navigate("/posts/" + post?.id);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();

        try {
            const res = await fetch(`http://localhost:8080/posts/${post.id}`, {
                method: "DELETE",
                credentials: "include"
            })
            
            if (res.ok) {
                onDelete(post.id);
            } else {
                console.log("Erro ao deletar post");
            }
        } catch(err) {
            console.log(err);
        }

        setOpened(false);
    }

    return (
        <div 
            className={styles.post + " rounded-3 px-2 py-2 border border-secondary border-opacity-25 transition"}
            onClick={handlePostClick}
        >
            <div className="text-white d-flex flex-column align-items-start gap-2">
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex gap-2 align-items-center">
                        <div
                            style={{ width: 30, height: 30 }}
                            className="text-white fs-5 d-flex justify-content-center align-items-center bg-secondary rounded-pill"
                        >
                            {formatUsername(post?.author_display_name || post?.author_name)}
                        </div>
                        <Link 
                            onClick={(e) => e.stopPropagation()} 
                            to={`/profiles/${post?.author_name}`} 
                            className={styles.profileLink + " text-white"}
                        >
                            {post?.author_display_name || post.author_name}
                        </Link>
                        <span className="text-secondary fw-light">{`@${post?.author_name}`}</span>
                    </div>

                    {/* Container relativo para posicionar a selection box */}
                    <div style={{ position: 'relative' }} ref={menuRef}>
                        {!opened && (
                            <button 
                                className="bg-transparent border-0" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpened(!opened);
                                }}
                            >
                                <img src={moreIcon} alt="more" />
                            </button>
                        )}

                        {/* Selection Box renderizada condicionalmente */}
                        {opened && (
                            <div className={`${styles.selection} d-flex flex-column rounded-3 border border-secondary border-opacity-25 p-1`}>
                                <button 
                                    className="rounded-3 bg-transparent text-white border-0 py-1 px-2 text-start" 
                                    onClick={handleDelete}
                                >
                                    Excluir
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div>{post?.content}</div>
            </div>
            <span style={{ fontSize: 13 }}>
                Criado em: <span className="fw-light text-white">{formatarData(post?.created_at)}</span>
            </span>
            <div className="pt-2 d-flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();

                    }}
                    className={styles.like + " rounded-3 border border-secondary border-opacity-25 px-2 py-1 text-white"}
                >
                    Curtir
                </button>
                <button className="bg-transparent rounded-3 border border-secondary border-opacity-25 px-2 py-1 text-white">
                    0 likes
                </button>
            </div>
        </div>
    );
}

export default Post;