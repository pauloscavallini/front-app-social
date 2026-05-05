import { Link, useNavigate } from "react-router-dom";
import { formatarData } from "../../utils/dateFormat";
import styles from "./Post.module.css";

function Post({ post }) {

    const navigate = useNavigate();

    const handlePostClick = () => {
        const selection = window.getSelection();
        
        // Se o tamanho da seleção for maior que zero, o usuário está selecionando texto
        if (selection.toString().length > 0) {
            return;
        }

        navigate("/posts/" + post?.id);
    };

    return (
    <div 
        className={styles.post + " rounded-3 px-2 py-2 border border-secondary border-opacity-25 transition "}
        onClick={handlePostClick}
    >
        <div className="text-white d-flex flex-column align-items-start gap-2">
            <div className="d-flex gap-2">
                <Link onClick={(e) => e.stopPropagation()} to={`/profiles/${post?.author_name}`} className={styles.profileLink + " text-white"}>{post?.author_display_name || post.author_name}</Link>
                <span className="text-secondary fw-light">{`@${post?.author_name}`}</span>
            </div>
            <div>{post?.content}</div>
        </div>
        <span style={{fontSize: 13}}>Criado em: <span className="fw-light text-white">{formatarData(post?.created_at)}</span></span>
    </div>
    )
}

export default Post;