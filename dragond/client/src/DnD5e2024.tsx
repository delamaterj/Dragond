import Button from './components/Button';
import { useEffect } from 'react';

//let classes : string[] = ["Barbarian", "Bard", "Cleric", "Duid", "Fight", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

function DnD5e2024() {
    useEffect(() => {
    document.title = "DnD5e2024";
  }, []);
    return (
        <>
            <div>
                <h1>D&D 5e 2024 Character Generator</h1>
                <p>Answer questions regarding class, race, background to generate your character</p>
                <span>
                    <Button title="Generate" disabled={false} url=""/>
                    </span><br/>
                <Button title="Go Back" disabled={false} url="/"/>
            </div>
        </>
    )
}

export default DnD5e2024;

/* 
{classes.map((item) => (
                        <Button key={item} title={item} disabled={false} url="class"/>
                    ))}
 */