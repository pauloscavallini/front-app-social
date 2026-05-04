import { Link } from "react-router-dom";

const formatarData = (dateStr) => {
    const date = new Date(dateStr);

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    }).format(date);

    return formattedDate;
}

function Post({ post }) {
    return (
    <div className="bg-secondary bg-opacity-25 rounded-3 px-2 py-2">
        <div className="text-white d-flex flex-column align-items-start gap-2">
            <span>Por <Link to={`/profiles/${post?.author_name}`} className="text-warning">{"@" + post?.author_name}</Link></span>
            <div>{post?.content}</div>
        </div>
        <span style={{fontSize: 13}}>Criado em: <span className="fw-light text-white">{formatarData(post?.created_at)}</span></span>
    </div>
    )
}

export default Post;