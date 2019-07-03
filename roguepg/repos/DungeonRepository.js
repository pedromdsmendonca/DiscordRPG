class DungeonRepository {
    constructor(){
        this.dungeons = [
            {
                name: 'Training Grounds',
                tag: 'tg',
                cooldown: 10,
                level: 1,
                rewards: {
                    equips: {
                        dropRate: 50,
                        rates: {
                            c: 60,
                            u: 30,
                            r: 10,
                            e: 0,
                            l: 0
                        },
                        level: 1,
                    },
                    consumables: {
                        droprate: 100,
                        rates: {
                            eh: 100
                        }
                    }
                }
            }
        ];
    }
}

module.exports = DungeonRepository;