import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

interface ButtonProp {
  title: string;
  disabled: boolean;
  url: string;
}

function Button({title, disabled, url}: ButtonProp){
    const navigate = useNavigate();
    function handleClick() {
        if(url === ""){
            return
        }
        if(title === "Go Back") {
            navigate(-1);
            document.title = "Dragond";
        }
        else {
            navigate(url);
        }
    }
    return (
        <button disabled={disabled} className="btn btn-primary" onClick={handleClick}>{title}</button>
    );    
}

export default Button