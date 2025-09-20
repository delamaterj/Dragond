import { useNavigate } from "react-router-dom";

interface ButtonProp {
  title: string;
  disabled: boolean;
  url: string;
}

function Button({title, disabled, url=""}: ButtonProp){
    const navigate = useNavigate();
    function handleClick() {
        {url === "goback" ? navigate(-1) : navigate(url)}
    }
    return (
        <button disabled={disabled} className="btn btn-primary" onClick={handleClick}>{title}</button>
    );    
}

export default Button