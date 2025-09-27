const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

/*class Class {
    constructor(potentialSkills, feats, proficiencies)
}*/

let allSkills = [];

let species = ['Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Goliath', 'Halfling', 'Human', 'Orc', 'Tiefling'];
let speciesDragonborn = ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'];
let speciesElf = ['Drow', 'High', 'Wood'];
let speciesGnome = ['Rock', 'Forest'];
let speciesGoliath = ['Cloud', 'Fire', 'Frost', 'Hill', 'Stone', 'Storm'];
let speciesTiefling = ['Abyssal', 'Chthonic', 'Infernal'];

let backgrounds = ['Acolyte', 'Artisan', 'Charlatan', 'Criminal', 'Entertainer', 'Farmer', 'Guard', 'Guide', 'Hermit', 'Merchant', 'Noble', 'Sage', 'Sailor', 'Scribe', 'Soldier', 'Wayfarer'];

let barbarianSkills = [2, 'Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'];
let bardSkills = [3];
//instruments, spells
let clericSkills = [2, 'History', 'Insight', 'Medicine', 'Persuasion', 'Religion'];
//protector vs. thaumaturge, spells
let druidSkills = [2, 'Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'];
//magician vs. warden, spells
let fighterSkills = [2, 'Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Persuasion', 'Perception', 'Survival'];
//equipment - str vs. dex, fighting style
let monkSkills = [2, 'Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'];
//artisan tool, instrument
let paladinSkills = [2, 'Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'];
//spells
let rangerSkills = [3, 'Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'];
//weapon mastery, spells
let rogueSkills = [4, 'Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion', 'Sleight of Hand', 'Stealth'];
//expertise, weapon mastery
let sorcererSkills = [2, 'Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'];
//spells
let warlockSkills = [2, 'Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'];
//eldritch invocations, spells
let wizardSkills = [2, 'Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Nature', 'Religion'];
//spells

let classes = ["Barbarian", "Bard", "Cleric", "Duid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

function rollStats() {
    let stat = 0;
    let statRolls = [];
    while (statRolls.length < 4) {
        statRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    statRolls.sort((a, b) => b - a);
    statRolls.pop();
    for (let i = 0; i < statRolls.length; i++) {
        stat += statRolls[i];
    }
    return stat;
}

function acquireSkills(skillList) {
    let resultList = [];
    while (resultList.length < skillList[0]) {
        tempValue = skillList[Math.floor(Math.random() * (skillList.length - 1)) + 1];
        if(!resultList.includes(tempValue)) {
            resultList.push(tempValue);
        }
    }
    return resultList;
}

function generateSubClass(race, subRaceList) {
    let subRace = subRaceList[Math.floor(Math.random() * subRaceList.length)];
    return race + " (" + subRace + ")";
}

function generateCharacter(race, background, className) {
    let character = [];
    let tempSkills;
    let raceFeats;
    let skillProficiencies = [];
    character.push(race);
    switch (race) {
        case "Aasimar":
            raceFeats = ["Celestial Resistance", "Darkvision (60ft.)", "Healing Hands", "Light Bearer"];
            break;
        case "Dragonborn":
            character[0] = generateSubClass(race, speciesDragonborn);
            raceFeats = ["Draconic Ancestry", "Breath Weapon", "Damage Resistance", "Darkvision (60 ft.)"];
            break;
        case "Dwarf":
            raceFeats = ["Darkvision (120 ft.)", "Dwarven Resiliance", "Dwarven Toughness", "Stonecunning"];
            break;
        case "Elf":
            character[0] = generateSubClass(race, speciesElf);
            raceFeats = ["Darkvision (60 ft.)", "Elven Lineage", "Fey Ancestry", "Keen Senses {}", "Trance"];
            break;
        default:
            console.log("Error: Race not found");
    }
    character.push(background);
    character.push(className);
    switch (className) {
        case "Barbarian":
            tempSkills = acquireSkills(barbarianSkills);
            break;
        case "Bard":
            tempSkills = acquireSkills(allSkills);
            break;
        case "Cleric":
            tempSkills = acquireSkills(clericSkills);
            break;
        case "Druid":
            tempSkills = acquireSkills(druidSkills);
            break;
        case "Fighter":
            tempSkills = acquireSkills(fighterSkills);
            break;
        case "Monk":
            tempSkills = acquireSkills(monkSkills);
            break;
        case "Paladin":
            tempSkills = acquireSkills(paladinSkills);
            break;
        case "Ranger":
            tempSkills = acquireSkills(rangerSkills);
            break;
        case "Rogue":
            tempSkills = acquireSkills(rogueSkills);
            break;
        case "Sorcerer":
            tempSkills = acquireSkills(sorcererSkills);
            break;
        case "Warlock":
            tempSkills = acquireSkills(warlockSkills);
            break;
        case "Wizard":
            tempSkills = acquireSkills(wizardSkills);
        default:
            console.log("Error: Class " + className + " not found");
    }
    character.push(tempSkills);
    character.push(raceFeats);
    return character;
}

app.use(
    cors({
        origin: ['http://localhost:5173'],
    })
);

app.get('/', (req, res) => {
    res.send('Welcome to Node Server');
});

app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello from API'});
});

app.get('/api/stats', (req, res) => {
    let statList = [];
    while (statList.length < 6) {
        statList.push(rollStats());
    }
    let character = generateCharacter(species[1], backgrounds[Math.floor(Math.random() * backgrounds.length)], classes[Math.floor(Math.random() * classes.length)]);
    //character.push(species[Math.floor(Math.random() * species.length)]);
    //character.push(backgrounds[Math.floor(Math.random() * backgrounds.length)]);//
    //character.push(classes[Math.floor(Math.random() * classes.length)]);
    res.json({stats: character});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

