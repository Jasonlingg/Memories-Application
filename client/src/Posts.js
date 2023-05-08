import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
function Posts() {
    const navigate =useNavigate();
    const [posts, setPosts] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({});
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

const updatePost = (post) => {
    setUpdatedPost(post);
    handleShow();
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
        return({
            ...prev,
            [name]: value,
        });
    });
};

const saveUpdatedPost = (e) => {
    axios.put(`/update/${updatedPost._id}`, updatedPost)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
};
    return(
        <div 
        className="backhome text-white font-mono p-10"
        key={posts._id}
        style={{textAlign:"center", margin: "auto auto", height: '100vh'}}>
            <h1>All Posts</h1>
            <Button 
            onClick={() => navigate(-1)}
            variant="outline-light"
            style={{marginBottom:"1rem"}}
            >BACK</Button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Control 
                    style={{marginBottom:"1rem"}} 
                    placeholder="title"
                    name="title"
                    value={updatedPost.title ? updatedPost.title : ""}
                    onChange={handleChange}
                    />
                    <Form.Control 
                    style={{marginBottom:"1rem"}} 
                    placeholder="description"
                    name="description"
                    value={updatedPost.description ? updatedPost.description : ""}
                    onChange={handleChange}
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" 
          onClick={saveUpdatedPost} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            {posts ? (
                <>
                {posts.map(post => {
                    return(
                        <div style={{
                        border:"solid lightgray 3px", 
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
                                variant="outline-info"
                                onClick={() => updatePost(post)}>
                                    UPDATE
                            </Button>
                            <Button 
                                onClick={() => deletePost(post._id)}
                                style={{marginRight: "1rem"}}
                                variant="outline-danger">
                                    DELETE
                            </Button>
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