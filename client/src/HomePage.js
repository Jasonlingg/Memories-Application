import "tailwindcss/tailwind.css";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';

const homePageText = ["Welcome to my posts" ];

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
        
        <body className="backhome text-center flex items-center justify-center " style={{height: '100vh'}}>
        <div className="text-9xl" style={{whiteSpace: 'pre-line'}}>
        &#128204;
        </div>
        <div className="text-white blinking-cursor text-7xl font-mono hover:font-mono hover:bold">
            {text}
        </div>
                <div className="text-9xl" style={{whiteSpace: 'pre-line'}}>
        &#128204;
        </div>
        <Button className="object-center" onClick={() => navigate("create")} >NEXT</Button>
      </body>
      </>
    )
}
export default HomePage;