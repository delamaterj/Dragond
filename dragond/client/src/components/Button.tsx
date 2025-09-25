import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ButtonProp {

  title: string;
  disabled: boolean;
  url: string;

}

function Button({title, disabled, url}: ButtonProp){

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    function handleClickBack() {

        navigate(-1);

    }

    async function handleClickGenerate() {

        try {
            const response = await fetch('http://localhost:3000/api/hello');
            if(!response.ok){
                throw new Error(`HTTP error: , ${response.status}`);
            }
            const data = await response.json();
            setMessage(data.message);
            console.log(data.message);
            }
        catch (error) {
            console.error('Error message: ', error);
        }
        
    }

    function handleClickNav() {
        navigate(url);
    }

    function handleClick() {

    }

    if (title === "Go Back") {
        return (
            <button disabled={disabled} className="btn btn-primary" onClick={handleClickBack}>{title}</button>
        );
    }
    else if (title === "Generate") {
        return (
            <>
                <button disabled={disabled} className="btn btn-primary" onClick={handleClickGenerate}>{title}</button>
                <p>{message}</p>
            </>
            /*
            <>
                <button disabled={disabled} className="btn btn-primary" onClick={handleClickGenerate}>{title}</button>
                {message && (
                <>
                <br/>
                <p>{message}</p>
                </>
                )}
            </>*/
        );
    }
    else if (url !== "") {
        return (
            <button disabled={disabled} className="btn btn-primary" onClick={handleClickNav}>{title}</button>
        );
    }
    else {
        return (
            <button disabled={disabled} className="btn btn-primary" onClick={handleClick}>{title}</button>
        );
    }
}

export default Button
