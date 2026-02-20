import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ButtonProp {

  title: string;
  disabled: boolean;
  url: string;

}

type NestedListItem = string | number | (string | number)[];

const renderFlat = (items: NestedListItem[]) => {
  return (
    <>
    <div className="generatedItems">
    <h4>RESULT:</h4>
      {items.map((item, index) => {
        if (Array.isArray(item)) {
          // sub-array → join with commas
          return <p key={index}>{item.join(", ")}</p>;
        } else {
          // simple value → just print it
          return <p key={index}>{item}</p>;
        }
      })}
    </div>
    </>
  );
};

function Button({title, disabled, url}: ButtonProp){

    const navigate = useNavigate();
    const [message, setMessage] = useState<NestedListItem[]>([]);
    function handleClickBack() {

        navigate(-1);

    }

    async function handleClickGenerate() {

        try {
            const response = await fetch('http://localhost:5000/api/stats');
            if(!response.ok){
                throw new Error(`HTTP error: , ${response.status}`);
            }
            const data = await response.json();
            setMessage(data.stats);
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
                 {message.length > 0 && renderFlat(message)}
            </>
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
