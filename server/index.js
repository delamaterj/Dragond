const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { parse } = require('csv-parse/sync');


const app = express();
const PORT = 5000;

let csv = fs.readFileSync('./data/backgrounds.csv', 'utf-8');
let records = parse(csv, { columns: true, skip_empty_lines: true });

let BACKGROUNDS = new Map();

for (let record of records) {
    let name = record.name.trim();
    // Convert semicolon-separated lists to arrays
    let skills = record.skills
      ? record.skills.split(';').map(s => s.trim()).filter(Boolean)
      : [];
    let equipment = record.equipment
      ? record.equipment.split(';').map(e => e.trim()).filter(Boolean)
      : [];
    let abilities = record.abilities
      ? record.abilities.split(';').map(a => a.trim()).filter(Boolean)
      : [];

    let tool = record.tool ? record.tool.trim() : "";
    let feat = record.feat ? record.feat.trim() : "";

    // Add to map
    BACKGROUNDS.set(name, {
      feat,
      skills,
      tool,
      equipment,
      abilities
    });
}

csv = fs.readFileSync('./data/classes.csv', 'utf-8');
records = parse(csv, { columns: true, skip_empty_lines: true });

let CLASSES = new Map();

for (let record of records) {
    let name = record.name.trim();
    // Convert semicolon-separated lists to arrays
    let skills = record.skills
      ? record.skills.split(';').map(s => s.trim()).filter(Boolean)
      : [];
    let weapons = record.weapons
      ? record.weapons.split(';').map(w => w.trim()).filter(Boolean)
      : [];
    let armor = record.armor
      ? record.armor.split(';').map(a => a.trim()).filter(Boolean)
      : [];
    let equipment = record.equipment
      ? record.equipment.split(';').map(e => e.trim()).filter(Boolean)
      : [];
    let feats = record.feats
      ? record.feats.split(';').map(f => f.trim()).filter(Boolean)
      : [];

    // Add to map
    CLASSES.set(name, {
      skills,
      weapons,
      armor,
      equipment,
      feats
    });
}

//artisan, tool, equipment tool, crafter tools
//entertainer, instrument, equipment instrument, musician tools
//guard, gaming set, gaming set equipment
//noble, gaming set, gaming set equipment
//soldier, gaming set, gaming set equipment
//wayfarer

/*for (const [name, data] of BACKGROUNDS) {
    console.log(name, data);
}*/
/*class Class {
    constructor(potentialSkills, feats, proficiencies)
}*/

let allSkills = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'];
let allTools = [
    "Alchemist's Supplies", "Brewer's Supplies", "Calligrapher's Supplies", "Carpenter's Tools", "Cartographer's Tools", "Cobbler's Tools", "Cook's Utensils", "Glassblower's Tools", "Jeweler's Tools", "Leatherworker's Tools", "Mason's Tools", "Painter's Supplies", "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools", "Woodcarver's Tools",
    "Disguise Kit", "Forgery Kit", "Herbalism Kit", "Navigator's Tools", "Poisoner's Kit", "Thieves' Tools",
    'Dice', 'Dragonchess', 'Playing Cards', 'Three-dragon Ante',
    'Bagpipes', 'Drum', 'Dulcimer', 'Flute', 'Horn', 'Lute', 'Lyre', 'Pan Flute', 'Shawm', 'Viol'
];
let instruments = ['Bagpipes', 'Drum', 'Dulcimer', 'Flute', 'Horn', 'Lute', 'Lyre', 'Pan Flute', 'Shawm', 'Viol'];
let artisanTools = ["Alchemist's Supplies", "Brewer's Supplies", "Calligrapher's Supplies", "Carpenter's Tools", "Cartographer's Tools", "Cobbler's Tools", "Cook's Utensils", "Glassblower's Tools", "Jeweler's Tools", "Leatherworker's Tools", "Mason's Tools", "Painter's Supplies", "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools", "Woodcarver's Tools"];
let artisanToolsFast = ["Carpenter's Tools", "Leatherworker's Tools", "Mason's Tools", "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools", "Woodcarver's Tools"];

let skilledProficiencies = allSkills.concat(allTools);

let species = ['Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Goliath', 'Halfling', 'Human', 'Orc', 'Tiefling'];
let speciesDragonborn = ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'];
let speciesElf = ['Drow', 'High', 'Wood'];
let speciesGnome = ['Rock', 'Forest'];
let speciesGoliath = ['Cloud', 'Fire', 'Frost', 'Hill', 'Stone', 'Storm'];
let speciesTiefling = ['Abyssal', 'Chthonic', 'Infernal'];

let backgrounds = ['Acolyte', 'Artisan', 'Charlatan', 'Criminal', 'Entertainer', 'Farmer', 'Guard', 'Guide', 'Hermit', 'Merchant', 'Noble', 'Sage', 'Sailor', 'Scribe', 'Soldier', 'Wayfarer'];

//bardinstruments, spells
//cleric protector vs. thaumaturge, spells
//druid magician vs. warden, spells
//fighter equipment - str vs. dex, fighting style
//monk artisan tool, instrument
//paladin spells
//ranger weapon mastery, spells
//rogue expertise, weapon mastery
//sorcerer spells
//warlock eldritch invocations, spells
//wizard spells

let classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

function swap(list, a, b) {
    let temp = list[a];
    list[a] = list[b];
    list[b] = temp;
    return list;
}

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

function acquireSkills(tempSkills, skillList) {
    for (let i = 0; i < skillList[0]; i++) {
        tempValue = skillList[Math.floor(Math.random() * (skillList.length - 1)) + 1];
        if(!tempSkills.includes(tempValue)) {
           tempSkills.push(tempValue);
        }
        else {
            i--;
        }
    }
    return tempSkills;
}

function acquireTools(tempTools, toolList, numOfTools) {
    for (let i = 0; i < numOfTools; i++) {
        tempValue = toolList[Math.floor(Math.random() * toolList.length)];
        if(!tempTools.includes(tempValue)) {
           tempTools.push(tempValue);
        }
        else {
            i--;
        }
    }
    
    return tempTools;
}

function acquireToolGaming(tempTools) {
    let gamingSets = ['Dice', 'Dragonchess', 'Playing Cards', 'Three-dragon Ante'];
    for (let i = 0; i < 1; i++) {
        tool = gamingSets[Math.floor(Math.random() * gamingSets.length)]
        if(!tempTools.includes(tool)) {
            tempTools.push(tool);
        }
        else {
            i--;
        }
    }
    return tempTools;
}

function acquireToolInst(tempTools, numOfInst) {
    let instruments = ['Bagpipes', 'Drum', 'Dulcimer', 'Flute', 'Horn', 'Lute', 'Lyre', 'Pan Flute', 'Shawm', 'Viol'];
    for (let i = 0; i < numOfInst; i++) {
        tool = instruments[Math.floor(Math.random() * instruments.length)]
        if(!tempTools.includes(tool)) {
            tempTools.push(tool);
        }
        else {
            i--;
        }
    }
    return tempTools;
}

function calculateSkilled(tempSkills, tempTools, skilledProficiencies, allSkills) {
    for (let i = 0; i < 3; i++) {
        let tempValue = skilledProficiencies[Math.floor(Math.random() * skilledProficiencies.length)];
        if (tempSkills.includes(tempValue) || tempTools.includes(tempValue)) {
            i--;
        }
        else {
            if (allSkills.includes(tempValue)) {
                tempSkills.push(tempValue);
            }
            else {
                tempTools.push(tempValue);
            }
        }
    }
    return [tempSkills, tempTools];
}

function generateSubClass(race, subRaceList) {
    let subRace = subRaceList[Math.floor(Math.random() * subRaceList.length)];
    return race + ' (' + subRace + ')';
}

function acquireHumanFeat(feats) {
    let allFeats = ['Alert', 'Crafter', 'Healer', 'Lucky', 'Magic Initiate (Cleric)', 'Magic Initiate (Druid)', 'Magic Initiate (Wizard)', 'Musician', 'Savage Attacker', 'Skilled', 'Tavern Brawler', 'Tough'];
    for (let i = 0; i < 1; i++) {
        let newFeat = allFeats[Math.floor(Math.random() * allFeats.length)];
        if(!feats.includes(newFeat) || newFeat === 'Skilled') {
            return newFeat;
        }
        else {
            i--;
        }
    }
}

function sortStats(className, stats, fighterType) {
    if (fighterType !== "null") {
        className = (className + " (" + fighterType + ")");
    }
    stats.sort((a, b) => b - a);
    let duplicateStats = stats.slice();

        if (className === "Fighter (dex)" || className === "Monk" || className === "Ranger" || className === "Rogue") { //dex 1
            duplicateStats[1] = stats[0];
        }
        if (className === "Wizard") { //int 1
            duplicateStats[3] = stats[0];
        }
        if (className === "Cleric" || className === "Druid") { //wis 1
            duplicateStats[4] = stats[0];
        }
        if (className === "Bard" || className === "Sorcerer" || className === "Warlock") { //cha 1
            duplicateStats[5] = stats[0];
        }
        if (className !== "Bard" && className !== "Monk" && className !== "Paladin" && className !== "Ranger") { //con 2
            duplicateStats[2] = stats[1];
        }
        if (className === "Monk" || className === "Ranger") { //wis 2
            duplicateStats[4] = stats[1];
        }
        if (className === "Paladin") { //cha 2
            duplicateStats[5] = stats[1];
        }
        if (className === "Cleric" || className === "Fighter (dex)") { //str 3
            duplicateStats[0] = stats[2];
        }
        if (className === "Barbarian" || className === "Druid" || className === "Sorcerer" || className === "Warlock" || className === "Wizard") { //dex 3
            duplicateStats[1] = stats[2];
        }
        if (className === "Fighter (str)" || className === "Rogue") { //wis 3
            duplicateStats[4] = stats[2];
        }
        if (className === "Fighter (str)") { //dex 4
            duplicateStats[1] = stats[3];
        }
        if (className !== "Cleric" && className !== "Druid" && className !== "Fighter (str)" && className !== "Monk" && className !== "Ranger" && className !== "Rogue") { //wis 4
            duplicateStats[4] = stats[3];
        }
        if (className === "Rogue") { //cha 4
            duplicateStats[5] = stats[3];
        }
        if (className === "Druid" || className === "Monk" || className === "Ranger") { //str 5
            duplicateStats[0] = stats[4];
        }
        if (className === "Cleric" || className === "Paladin") { //dex 5
            duplicateStats[1] = stats[4];
        }
        if (className === "Bard" || className === "Rogue" || className === "Sorcerer" || className === "Warlock") { //int 5
            duplicateStats[3] = stats[4];
        }
        if (className === "Barbarian" || className === "Fighter (dex)" || className === "Fighter (str)" || className === "Wizard") { //cha 5
            duplicateStats[5] = stats[4];
        }
        if (className === "Bard" || className === "Rogue" || className === "Sorcerer" || className === "Warlock" || className === "Wizard") { //str 6
            duplicateStats[0] = stats[5];
        }
        if (className === "Barbarian" || className === "Fighter (dex)" || className === "Fighter (str)" || className === "Paladin") { //int 6
            duplicateStats[3] = stats[5];
        }

    return duplicateStats;

}

function eliminateDuplicates(character) {
    character[3] = [...new Set(character[3])];
    character[4] = [...new Set(character[4])];
    return character;
}

//main of back-end
function generateCharacter(race, background, className) {
    
    let character = [race, className, background, [], [], [], []];
    //skills, tools, feats, stats
    let tempSkills = [];
    let tempTools = [];
    let feats = [];
    let fighterType = "null";

    let backgroundDetails = BACKGROUNDS.get(background);
    switch (background) {
        case 'Artisan':
            tempTools = acquireTools(tempTools, artisanTools, 1);
            tempTools = acquireTools(tempTools, artisanToolsFast, 3);
            break;
        case 'Entertainer':
            tempTools = acquireTools(tempTools, instruments, 1);
            tempTools = acquireTools(tempTools, instruments, 3);
            break;
    }

    for (let i of backgroundDetails.skills) {
        tempSkills.push(i);
    }

    feats.push(backgroundDetails.feat);

    if (backgroundDetails.tool) {
        tempTools.push(backgroundDetails.tool);
    }

    if(race === 'Elf') {
        tempSkills = acquireSkills(tempSkills, [1, 'Insight', 'Perception', 'Survival']);
    }

    let classDetails = CLASSES.get(className);
    tempSkills = acquireSkills(tempSkills, classDetails.skills);
    feats.push(...classDetails.feats);

    switch (className) {
        case 'Bard':
            tempTools = acquireToolInst(tempTools, 3);
            //inst equip
            break;
        case 'Druid':
            if (!tempTools.includes('Herbalism Kit')) {
                tempTools.push('Herbalism Kit')
            }
            break;
        case 'Fighter':
            let fighterTypes = ["str", "dex"]
            fighterType = fighterTypes[Math.floor(Math.random() * fighterTypes.length)]
            break;
        case 'Monk':
            //tool
            //tool equip
            break;
        case 'Rogue':
            if (!tempTools.includes("Thieves' Tools")) {
                tempTools.push("Thieves' Tools")
            }
            break;
    }

    switch (race) {
        case 'Aasimar':
            feats.push('Celestial Resistance', 'Darkvision (60ft.)', 'Healing Hands', 'Light Bearer');
            break;
        case 'Dragonborn':
            character[0] = generateSubClass(race, speciesDragonborn);
            feats.push('Draconic Ancestry', 'Breath Weapon', 'Damage Resistance', 'Darkvision (60 ft.)');
            break;
        case 'Dwarf':
            feats.push('Darkvision (120 ft.)', 'Dwarven Resiliance', 'Dwarven Toughness', 'Stonecunning');
            break;
        case 'Elf':
            character[0] = generateSubClass(race, speciesElf);
            feats.push('Darkvision (60 ft.)', 'Elven Lineage', 'Fey Ancestry', 'Keen Senses', 'Trance');
            break;
        case 'Gnome':
            character[0] = generateSubClass(race, speciesGnome);
            feats.push('Darkvision (60 ft.)', 'Gnomish Cunning');
            break;
        case 'Goliath':
            character[0] = generateSubClass(race, speciesGoliath);
            feats.push('Giant Ancestry', 'Powerful Build');
            break;
        case 'Halfling':
            feats.push('Brave', 'Halfling Nimbleness', 'Luck', 'Naturally Stealthy');
            break;
        case 'Human':
            let humanSkill = [1];
            humanSkill = humanSkill.concat(allSkills);
            tempSkills = acquireSkills(tempSkills, humanSkill);
            let newFeat = acquireHumanFeat(feats);
            feats.push('Resourceful', 'Skillful', ('Versatile (' + newFeat + ')'));
            if (newFeat === 'Skilled') {
                [skilledskills, skilledtools] = calculateSkilled(tempSkills, tempTools, skilledProficiencies, allSkills);
                tempSkills = skilledskills;
                tempTools = skilledtools;
            }
            break;
        case 'Orc':
            feats.push('Adrenaline Rush', 'Darkvision (120 ft.)', 'Relentless Endurance');
            break;
        case 'Tiefling':
            character[0] = generateSubClass(race, speciesTiefling);
            feats.push('Darkvision (60 ft.)', 'Fiendish Legacy', 'Otherworldly Presence');
            break;
        default:
            console.log('Error: Race not found');
    }

    if (background === 'Charlatan' || background === 'Noble' || background === 'Scribe') {
        [skilledskills, skilledtools] = calculateSkilled(tempSkills, tempTools, skilledProficiencies, allSkills);
        tempSkills = skilledskills;
        tempTools = skilledtools;
    }

    character[3] = tempSkills;
    character[4] = tempTools;
    character[5] = feats;

    let stats = [];
    while (stats.length < 6) {
        stats.push(rollStats());
    }

    stats = sortStats(className, stats, fighterType);

    character[6] = stats;
    character = eliminateDuplicates(character);

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
    //random:
    let character = generateCharacter(species[Math.floor(Math.random() * species.length)], backgrounds[Math.floor(Math.random() * backgrounds.length)], classes[Math.floor(Math.random() * classes.length)]);
    //custom:
    //let character = generateCharacter("Dragonborn", "Artisan", "Rogue");
    res.json({stats: character});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

