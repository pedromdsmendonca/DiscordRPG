module.exports = (name) => {
    return {
        name: name,
        level: 1,
        hp: 10,
        att: 5,
        def: 5,
        gold: 0,
        eva: 5,
        exp: 0,
        inventory: {
            equips: [
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
        },
        equips: [],
        weapon: {},
        armor: {},
        ring: {},
        amulet: {}
    }
}