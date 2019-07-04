const Equip = require('./models/equip');

module.exports = () => {
    return {
        equips: [
            new Equip(1,1,0),
            new Equip(1,1,1),
            new Equip(1,1,2),
            new Equip(1,1,3)
        ],
        consumables: [
            //general use
            {
                name: 'Enhance Crystal',
                tag: 'ec',
                desc: 'Used to enhance equipment: !enchance <equip>',
                quantity: 1
            },
            {
                name: 'Blood Gem',
                tag: 'bg',
                desc: 'Used to gain a new class. For more info: !class help',
                quantity: 0
            },
            {
                name: 'Ancient Coin',
                tag: 'ac',
                desc: 'Exchange for equips in arena shop: !arena shop',
                quantity: 0
            },
            {
                name: 'Training Ticket',
                tag: 'tt',
                desc: 'Use this to enter the training area: !training help',
                quantity: 1
            },
            //potions
            {
                name: 'Experience Potion',
                tag: 'ep',
                desc: 'Double the ammount of experience gained in the next dungeon.',
                quantity: 0
            },
            {
                name: 'Speed Potion',
                tag: 'sp',
                desc: 'The next dungeon takes half as long to complete.',
                quantity: 0
            },
            {
                name: 'Recovery Potion',
                tag: 'rp',
                desc: 'Instantly removes the death penalty.',
                quantity: 1
            },
            //class changes
            {
                name: 'Class Change: Warrior',
                tag: 'ccwarrior',
                desc: 'Gain the basic class Warrior.',
                quantity: 0
            },
            {
                name: 'Class Change: Mage',
                tag: 'ccmage',
                desc: 'Gain the basic class Mage.',
                quantity: 0
            },
            {
                name: 'Class Change: Druid',
                tag: 'ccdruid',
                desc: 'Gain the basic class Druid.',
                quantity: 0
            },
            {
                name: 'Class Change: Cleric',
                tag: 'cccleric',
                desc: 'Gain the basic class Cleric.',
                quantity: 0
            },
            {
                name: 'Class Change: Gladiator',
                tag: 'ccglad',
                desc: 'Gain the intermediate class Gladiator.',
                quantity: 0
            },
            {
                name: 'Class Change: Sorcerer',
                tag: 'ccsorc',
                desc: 'Gain the intermediate class Sorcerer.',
                quantity: 0
            },
            {
                name: 'Class Change: Elementalist',
                tag: 'ccele',
                desc: 'Gain the advanced class Elementalist.',
                quantity: 0
            },
            {
                name: 'Class Change: Overlord',
                tag: 'ccover',
                desc: 'Gain the secret class Overlord.',
                quantity: 0
            },
        ]
    }
}