import Button from './components/Button';

function DnD5e2024() {

    return (
        <>
            <div>
                <h1>D&D 5e 2024 Character Generator</h1>
                <p>Click the 'Generate' Button to receive a random 5e character in the 2024 edition</p>
                <p>As of now, Dragond provides the following character details:</p>
                <ul className="list">
                    <li>Species</li>
                    <li>Class</li>
                    <li>Background</li>
                    <li>Skill Proficiencies</li>
                    <li>Tool Proficiencies</li>
                    <li>Feats (Origin, Species)</li>
                    <li>Ability Score Stats (Unordered)</li>
                </ul>
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