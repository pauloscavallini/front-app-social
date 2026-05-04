import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";

function Profile() {
    const { id } = useParams();

    const [ profile, setProfile ] = useState(null);
    const [ userPosts, setUserPosts ] = useState(null);

    const [ loadingPosts, setLoadingPosts ] = useState(true);

    useEffect(() => {
        async function fetchPageData() {
            try {
                const profileRes = await fetch(`http://localhost:8080/profiles/${id}`, {
                    method: "GET",
                    credentials: "include"
                });
                const profileData = await profileRes.json();
                setProfile(profileData);
                const postsRes = await fetch(`http://localhost:8080/posts/${profileData.id}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!postsRes.ok) {
                    setLoadingPosts(false);
                    return;
                }

                const postsData = await postsRes.json();
                setUserPosts(postsData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoadingPosts(false);
            }
        }

        fetchPageData();
    }, [id]);

    return (
    <div className="d-flex flex-column gap-4 mt-4">
        {profile ? (
            <>

            <div className="d-flex gap-2">
                <div className="fw-semibold fs-3">
                {`@${profile?.username}`}
                </div>
            </div>

            <section>
                <span className="fs-5">Posts</span>
                <div className="d-flex flex-column gap-2">
                    {!loadingPosts ? (userPosts ? userPosts?.map(post => (
                        <Post key={post?.id} post={post} />
                        )) : "Não foi possível carregar posts") : "Carregando posts..." }
                </div>
            </section>

            </>
        ) : "Carregando..."}
    </div>
    )
}

export default Profile;