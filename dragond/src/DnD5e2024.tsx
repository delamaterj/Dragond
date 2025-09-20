import Button from './components/Button';

function DnD5e2024() {
    return (
        <>
            <div>
                <h1>D&D 5e 2024 Character Generator</h1>
                <p>Answer questions regarding class, race, background to generate your character</p>
                <Button title="Go Back" disabled={false} url="goback"/>
            </div>
        </>
    )
}

export default DnD5e2024;