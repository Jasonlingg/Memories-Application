import "tailwindcss/tailwind.css";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';

const homePageText = ["Welcome to my posts!!!","Click the button below to view." ];

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
        <body className="backhome" style={{height: '100vh'}}>
        <h1 className="text-white blinking-cursor">
            {text}
            </h1>
        <Button className="object-center" onClick={() => navigate("create")} >NEXT</Button>
      </body>
    )
}
export default HomePage;