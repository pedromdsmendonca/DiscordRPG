class EquipManager{
    printable(e){
        return `
        [${e.grade} ${e.type} Lvl.${e.lvl}] +${e.enhance}
        <${e.id}>
        ---------------------------
        `;
    }
}

module.exports = EquipManager;