const random = require('random-int');

class DungeonRepository {
    constructor(){
        this.dungeons = [
            {
                name: 'Training Grounds',
                tag: 'tg',
                cooldown: 1,
                level: 1,
                exp: 5,
                rewards: {
                    quantity: 1,
                    drops: [
                        'c:ec',
                        'e:1,1,0',
                        'e:1,1,1',
                        'e:1,2,0',
                        'e:1,2,1',
                        'e:1,3,0',
                        'e:1,3,1',
                    ],
                    rates: [
                        30,
                        50,
                        70,
                        80,
                        90,
                        95,
                        100
                    ]
                }
            }
        ];
    }

    //TODO return more than 1 reward depending on the quantity specified by the dung
    getReward(tag){
        let reward = this.dungeons.find(d => d.tag == tag).rewards;
        console.log(reward);
        let r = random(1,100);
        var i;
        for(i = 0; i < reward.rates.length; i++){
            if(r <= reward.rates[i]) break;
        }
        console.log(r);
        console.log(i);
        return reward.drops[i];
    }
}

module.exports = DungeonRepository;