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
            {
                name: 'Enhance Crystal',
                tag: 'eh',
                desc: 'Used to enhance equipment: !enchance <equip>',
                quantity: 1
            },
            {
                name: 'Blood Gem',
                tag: 'bg',
                desc: 'Used to gain a new class. For more info: !class help',
                quantity: 1
            },
            {
                name: 'Ancient Coin',
                tag: 'ac',
                desc: 'Exchange for equips in arena shop: !arena shop',
                quantity: 0
            }
        ]
    }
}