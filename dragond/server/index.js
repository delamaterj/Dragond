const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

/*class Class {
    constructor(potentialSkills, feats, proficiencies)
}*/

let allSkills = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuation', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'];
let allTools = [
    "Alchemist's Supplies", "Brewer's Supplies", "Calligrapher's Supplies", "Carpenter's Tools", "Cartographer's Tools", "Cobbler's Tools", "Cook's Utensils", "Glassblower's Tools", "Jeweler's Tools", "Leatherworker's Tools", "Mason's Tools", "Painter's Supplies", "Potter's Tools", "Smith's Tools", "Tinker's Tools", "Weaver's Tools", "Woodcarver's Tools",
    "Disguise Kit", "Forgery Kit", "Herbalism Kit", "Navigator's Tools", "Poisoner's Kit", "Thieves' Tools",
    'Dice', 'Dragonchess', 'Playing Cards', 'Three-dragon Ante',
    'Bagpipes', 'Drum', 'Dulcimer', 'Flute', 'Horn', 'Lute', 'Lyre', 'Pan Flute', 'Shawm', 'Viol'
];

let skilledProficiencies = allSkills.concat(allTools);

let species = ['Aasimar', 'Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Goliath', 'Halfling', 'Human', 'Orc', 'Tiefling'];
let speciesDragonborn = ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'];
let speciesElf = ['Drow', 'High', 'Wood'];
let speciesGnome = ['Rock', 'Forest'];
let speciesGoliath = ['Cloud', 'Fire', 'Frost', 'Hill', 'Stone', 'Storm'];
let speciesTiefling = ['Abyssal', 'Chthonic', 'Infernal'];

let backgrounds = ['Acolyte', 'Artisan', 'Charlatan', 'Criminal', 'Entertainer', 'Farmer', 'Guard', 'Guide', 'Hermit', 'Merchant', 'Noble', 'Sage', 'Sailor', 'Scribe', 'Soldier', 'Wayfarer'];

let barbarianSkills = [2, 'Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'];
let bardSkills = [3];
bardSkills = bardSkills.concat(allSkills);
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
        if (tempTools.includes(tempValue) || tempTools.includes(tempValue)) {
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
    console.log(stats);
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
    console.log(duplicateStats);
    return duplicateStats;

}

function generateCharacter(race, background, className) {
    
    let character = [race, className, background, [], [], [], []];
    //skills, tools, feats, stats
    let tempSkills = [];
    let tempTools = [];
    let feats = [];
    let fighterType = "null";

    switch (background) {
        case 'Acolyte':
            tempSkills.push('Insight');
            tempSkills.push('Religion');
            tempTools.push("Calligrapher's Supplies");
            feats.push('Magic Initiate (Cleric)');
            break;
        case 'Artisan':
            tempSkills.push('Investigation');
            tempSkills.push('Persuasion');
            feats.push('Crafter');
            //artisan toolss
            break;
        case 'Charlatan':
            tempSkills.push('Deception');
            tempSkills.push('Sleight of Hand');
            tempTools.push('Forgery Kit');
            feats.push('Skilled');
            break;
        case 'Criminal':
            tempSkills.push('Sleight of Hand');
            tempSkills.push('Stealth');
            tempTools.push("Thieves' Tools");
            feats.push('Alert');
            break;
        case 'Entertainer':
            tempSkills.push('Acrobatics');
            tempSkills.push('Performance');
            tempTools = acquireToolInst(tempTools, 4);
            feats.push('Musician');
            break;
        case 'Farmer':
            tempSkills.push('Animal Handling');
            tempSkills.push('Nature');
            tempTools.push("Carpenter's Tools");
            feats.push('Tough');
            break;
        case 'Guard':
            tempSkills.push('Athletics');
            tempSkills.push('Perception');
            tempTools = acquireToolGaming(tempTools);
            feats.push('Alert');
            break;
        case 'Guide':
            tempSkills.push('Stealth');
            tempSkills.push('Survival');
            tempTools.push("Cartographer's Tools");
            feats.push('Magic Initiate (Druid)');
            break;
        case 'Hermit':
            tempSkills.push('Medicine');
            tempSkills.push('Religion');
            tempTools.push('Herbalism Kit');
            feats.push('Healer');
            break;
        case 'Merchant':
            tempSkills.push('Animal Handling');
            tempSkills.push('Persuasion');
            tempTools.push("Navigator's Tools");
            feats.push('Lucky');
            break;
        case 'Noble':
            tempSkills.push('History');
            tempSkills.push('Persuasion');
            tempTools = acquireToolGaming(tempTools);
            feats.push('Skilled');
            break;
        case 'Sage':
            tempSkills.push('Arcana');
            tempSkills.push('History');
            tempTools.push("Calligrapher's Supplies");
            feats.push('Magic Initiate (Wizard)');
            break;
        case 'Sailor':
            tempSkills.push('Acrobatics');
            tempSkills.push('Perception');
            tempTools.push("Navigator's Tools");
            feats.push('Tavern Brawler');
            break;
        case 'Scribe':
            tempSkills.push('Investigation');
            tempSkills.push('Perception');
            tempTools.push("Calligrapher's Supplies");
            feats.push('Skilled');
            break;
        case 'Soldier':
            tempSkills.push('Athletics');
            tempSkills.push('Intimidation');
            tempTools = acquireToolGaming(tempTools);
            feats.push('Savage Attacker');
            break;
        case 'Wayfarer':
            tempSkills.push('Insight');
            tempSkills.push('Stealth');
            tempTools.push("Thieves' Tools");
            feats.push('Lucky');
            break;
        default:
            console.log('Error: Background not found');
    }

    if(race === 'Elf') {
        tempSkills = acquireSkills(tempSkills, [1, 'Insight', 'Perception', 'Survival']);
    }

    switch (className) {
        case 'Barbarian':
            tempSkills = acquireSkills(tempSkills, barbarianSkills);
            break;
        case 'Bard':
            tempSkills = acquireSkills(tempSkills, bardSkills);
            tempTools = acquireToolInst(tempTools, 3);
            //inst equip
            break;
        case 'Cleric':
            tempSkills = acquireSkills(tempSkills, clericSkills);
            break;
        case 'Druid':
            tempSkills = acquireSkills(tempSkills, druidSkills);
            tempTools.push('Herbalism Kit');
            break;
        case 'Fighter':
            tempSkills = acquireSkills(tempSkills, fighterSkills);
            let fighterTypes = ["str", "dex"]
            fighterType = fighterTypes[Math.floor(Math.random() * fighterTypes.length)]
            break;
        case 'Monk':
            tempSkills = acquireSkills(tempSkills, monkSkills);
            //tool
            //tool equip
            break;
        case 'Paladin':
            tempSkills = acquireSkills(tempSkills, paladinSkills);
            break;
        case 'Ranger':
            tempSkills = acquireSkills(tempSkills, rangerSkills);
            break;
        case 'Rogue':
            tempSkills = acquireSkills(tempSkills, rogueSkills);
            tempTools.push("Thieve's Tools")
            break;
        case 'Sorcerer':
            tempSkills = acquireSkills(tempSkills, sorcererSkills);
            break;
        case 'Warlock':
            tempSkills = acquireSkills(tempSkills, warlockSkills);
            break;
        case 'Wizard':
            tempSkills = acquireSkills(tempSkills, wizardSkills);
            break;
        default:
            console.log('Error: Class ' + className + ' not found');
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
    let character = generateCharacter(species[Math.floor(Math.random() * species.length)], backgrounds[Math.floor(Math.random() * backgrounds.length)], classes[Math.floor(Math.random() * classes.length)]);
    res.json({stats: character});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

