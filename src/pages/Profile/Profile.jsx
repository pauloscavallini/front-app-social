import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { formatUsername } from "../../utils/profileUtil";

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
                });
                const profileData = await profileRes.json();
                setProfile(profileData);
                console.log(profileData);
                const postsRes = await fetch(`http://localhost:8080/posts/author/${profileData.id}`, {
                    method: "GET",
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
                setTimeout(() => {
                    setLoadingPosts(false);
                }, 500)
            }
        }

        fetchPageData();
    }, [id]);

    return (
    <div className="d-flex flex-column gap-4 mt-4">
        {profile ? (
            <>
            <div className="d-flex gap-2 align-items-center">
                <div
                    style={{width: 40, height: 40}}
                    className="text-white fs-5 d-flex justify-content-center align-items-center bg-secondary rounded-pill"
                >
                    {formatUsername(profile?.username)}
                </div>
                <div className="fw-semibold fs-3">
                {profile?.displayname || profile?.username}
                </div>
                <div className="fw-light fs-5">
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