import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";



function PostPage() {
    const { id } = useParams();

    const [ post, setPost ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function fetchDados() {
            try {
                const response = await fetch(`http://localhost:8080/posts/${id}`, {
                    method: "GET"
                })

                if (!response.ok) {
                    setLoading(false);
                    throw Error("Houve um erro ao obter post");
                }

                const dados = await response.json();
                console.log(dados);
                setPost(dados);
            } catch(err) {
                console.log(err);
            }
        }
        fetchDados();
    }, [])

    return (loading ? (
        post ? (
            <div className="">
                <Post post={post} />
            </div>
        ) : "Não foi possível obter posts"
    ) : "Carregando...")
}

export default PostPage;