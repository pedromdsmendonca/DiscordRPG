class UserRepository {
    constructor(){
        this.users = []
    }

    addUser(user, character){
        this.users.push({
            name: user.name,
            discordId: user.discordId,
            character: character
        });
    }

    getConsumables(id){
        let user = this.users.find(u => u.discordId == id);
        if(!user) return null;

        return user.character.inventory.consumables.filter(c => c.quantity > 0);
    }

    getEquips(id){
        let user = this.users.find(u => u.discordId == id);
        if(!user) return null;

        return user.character.inventory.equips;
    }

    getEquip(id, equipId){
        let user = this.users.find(u => u.discordId == id);
        if(!user) return null;

        let equip = user.character.inventory.equips.find(e => e.id == equipId);
        return equip;
    }
}

module.exports = UserRepository;