import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
function Posts() {
    const navigate =useNavigate();
    const [posts, setPosts] = useState([]);
    
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
    console.log(post);
    handleShow();
}
    return(
        <div 
        key={posts._id}
        style={{textAlign:"center", margin: "auto auto"}}>
            <h1>Posts page</h1>
            <button 
            onClick={() => navigate(-1)}
            style={{width:"100%", marginBoottom:"1rem"}}
            variant="outline-dark">BACK</button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.GrouP>
                    <Form.Control style={{marginBopttom:"1rem"}} placeholder="title"/>

                    <Form.Control placeholder="description"/>
                </Form.GrouP>
            </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} onClick={handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
                                variant="outline-info"
                                onClick={() => updatePost(post)}>
                                    Update
                            </Button>
                            <Button 
                                onClick={() => deletePost(post._id)}
                                style={{marginRight: "1rem"}}
                                variant="outline-danger">
                                    Delete
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