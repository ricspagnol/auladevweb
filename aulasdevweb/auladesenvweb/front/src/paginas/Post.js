import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { postId } = useParams();
    const [post, setListaPosts] = React.useState([]);
    const [replies, setListaReplies] = React.useState([]);
    const [reply, setReply] = React.useState("");
    React.useEffect(() => {
        const res = axios.get("blog/api/v1/rest/post/" + postId);
        res.then((query) => {
            setListaPosts(query.data);
        })
        const res2 = axios.get("blog/api/v1/rest/postreply/" + postId);
        res2.then((query) => {
            setListaReplies(query.data);
        })
    }, []);

    const addReply = async () => {
        await axios.post('blog/api/v1/rest/reply', {
            id_post: postId,
            reply
        });
        alert("Resposta adicionada");
        setReply("");
        window.location.reload();
    }

    const deleteReply = async (id) => {
        await axios.delete('blog/api/v1/rest/reply/' + id);
        alert("Resposta removida");
        window.location.reload();
    }

    return (
        <div>
            {post && (
                <div className='row'>
                    <h1>{post.title}</h1>
                    <h2>{post.post}</h2>
                    <h5>Post #{post.id}, created {post.createdAt},
                        updated {post.updatedAt}</h5>

                    <div className='reply'>
                        <label htmlFor="reply">Resposta</label>
                        <textarea id='reply'
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                        <button
                            onClick={() => addReply()}
                            disabled={!reply}
                        >Enviar Resposta</button>
                    </div>


                    <div className='row'>
                        {replies.length > 0 && (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Resposta</th>
                                        <th>Criado</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>    
                                <tbody>
                                    {replies.map((reply, index) => (
                                        <tr key={index}>
                                            <td>{reply.id}</td>
                                            <td>{reply.reply}</td>
                                            <td>{reply.createdAt}</td>
                                            <td><button onClick={() => deleteReply(reply.id)}>Deletar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    )

}

export default Post;