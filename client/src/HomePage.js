import "tailwindcss/tailwind.css";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';

const homePageText = ["Welcome to my posts!" ];

const useTyped = (homePageText) => {
    const [typed, setTyped] = useState('');
    useEffect(() => {
        const nextTyped = homePageText[0].slice(0, typed.length + 1);
        if (nextTyped === typed) return;
        const timeout = setTimeout(() => {
            setTyped(homePageText[0].slice(0, typed.length + 1))
        } , 150)
        return () => clearTimeout(timeout);
    }, [homePageText, typed])
    return typed;
}
function HomePage (){
    const text = useTyped(homePageText);
    const navigate = useNavigate();
    return (
        <>
        <body className="backhome text-center pt-10 space-y-12 font-mono" style={{height: '100vh'}}>
        <div className="text-9xl" style={{whiteSpace: 'pre-line'}}>
        &#128204;
        </div>
        <div className="text-8xl hover:font-bold">
        &#128293;
        <span className="text-white blinking-cursor">
            {text}
        </span>
        &#128293;
        </div>
        <Button 
        variant="outline-light"
        className="center h-20 w-34 text-xl" 
        onClick={() => navigate("create")} 
        style = {{fontSize: "40px"}}>Click here to continue</Button>
      </body>
      </>
    )
}
export default HomePage;