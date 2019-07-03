const Equip = require('./models/equip');

module.exports = () => {
    return {
        equips: [
            new Equip(),
            new Equip(),
            new Equip()
        ],
        consumables: [
            {
                name: "an item",
                quantity: 3
            },
            {
                name: "another item",
                quantity: 1
            },
            {
                name: "last item",
                quantity: 0
            }
        ]
    }
}