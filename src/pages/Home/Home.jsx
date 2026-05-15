import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { useAuth } from "../../context/AuthContext";

function Home() {
    const { openPost, openLogin, user } = useAuth();

    const [posts, setPosts] = useState(null);

    const onDeleteSuccess = (postId) => {
        setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
    };
    
    useEffect(() => {
        const fetchDados = async () => {
            const result = await fetch("http://localhost:8080/posts/all", {
                method: "GET",
            })

            const data = await result.json();
            setPosts(data);
        }
        fetchDados();
    }, [])

    return (
        <>
        <div className="d-flex justify-content-between align-items-center">
            <span className="fs-2 text-white">Meu feed</span>
            <button 
                style={{background: "var(--primary-color)"}}
                className="rounded-3 text-white fw-semibold px-2 py-1"
                onClick={user ? openPost : openLogin}
            >
                Criar post
            </button>
        </div>
        <section className="d-flex flex-column gap-2">
            {posts ? posts?.map(p => (
                <Post
                    key={p?.id} 
                    post={p}
                    onDelete={onDeleteSuccess}
                />
            )) : "Não há posts"}
        </section>
        </>
    )
}

export default Home;