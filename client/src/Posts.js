import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
function Posts() {
    const navigate =useNavigate();
    const [posts, setPosts] = useState([]);
useEffect(() => {
    axios
    .get("/posts")
    .then((res) => {
        console.log(res);
        setPosts(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const deletePost = (id) => {
    console.log(id);
    axios
        .delete(`/delete/${id}`)
        .then((err) => console.log(err))
        .catch((err) => console.log(err));

    window.location.reload();
};
    return(
        <div 
        key={posts._id}
        style={{textAlign:"center", margin: "auto auto"}}>
            <h1>Posts page</h1>
            <button 
            onClick={() => navigate(-1)}
            style={{width:"100%", marginBoottom:"1rem"}}
            variant="outline-dark">BACK</button>
            {posts ? (
                <>
                {posts.map(post => {
                    return(
                        <div style={{
                        border:"solid lightgray 1px", 
                        borderRadius: "8px", 
                        marginBottom: "1rem",
                        padding: "1rem",
                        }}
                        >
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div style={{
                                display:"flex",
                                flexDirection: "row",
                                justifyContent: "space-between"}}>
                            <Button 
                                style={{marginRight: "1rem"}}
                                variant="outline-info">Update</Button>
                            <Button onClick={() => deletePost(post._id)}
                                style={{marginRight: "1rem"}}
                                variant="outline-danger"
                                >Delete</Button>
                            </div>
                        </div>
                    );
                })}
                </>
            ) : ( 
            ""
            )}
        </div>
    )
}

export default Posts;