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
        <body className="backhome px-32 py-11 font-mono" style={{height: '100vh'}}>
        <div>
            <h1 className= "text-center text-white pb-3">CREATE A POST</h1>
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
                   as="textarea"
                   name="description" 
                   value={post.description}
                   placeholder="Description" 
                   style={{marginBottom:"1rem"}} 
                   onChange={handleChange} 
                   />
                </Form.Group>
                <Button
            onClick={handleClick}
            variant="outline-light"
            style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE POST
        </Button>
            </Form>
            <Button 
            style={{width: "100%", marginBottom:"1rem"}} 
            variant={"outline-light"}
            onClick={() => navigate("posts")}
            >EXISTING POSTS
            </Button>
            <Button 
            style={{width: "100%", marginBottom:"1rem"}} 
            variant={"outline-light"}
            onClick={() => navigate(-1)}
            >BACK
            </Button>
        </div>
        </body>
    );
}

export default CreatePost;