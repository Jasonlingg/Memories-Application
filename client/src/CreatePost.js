import {Button, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import axios from 'axios';

function CreatePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPost((prev) => {
            return{
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        axios
            .post("/create", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            navigate("posts");
    };

    useEffect(() => {
        console.log(post);
    }, [post]);


    return(
        <div>
            <h1 style={{textAlign: "center"}}>Create a post</h1>
            <Form>
                <Form.Group>
                   <Form.Control 
                   name="title" 
                   value={post.title}
                   placeholder="Title" 
                   style={{marginBottom:"1rem"}}
                   onChange={handleChange} 
                   />
                   <Form.Control 
                   name="description" 
                   value={post.description}
                   placeholder="Description" 
                   style={{marginBottom:"1rem"}} 
                   onChange={handleChange} 
                   />
                </Form.Group>
                <Button
            onClick={handleClick}
            variant="outline-success"
            style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE POST
        </Button>
            </Form>
            <Button 
            style={{width: "100%", marginBottom:"1rem"}} 
            variant={"outline-dark"}
            onClick={() => navigate(-1)}
            >BACK
            </Button>
        </div>
    );
}

export default CreatePost;