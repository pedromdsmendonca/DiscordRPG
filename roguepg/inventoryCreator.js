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
                quantity: 1
            }
        ]
    }
}