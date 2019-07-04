class JobManager{
    constructor(){
        this.jobs = [
            {
                name: 'Warrior',
                grade: 0,
                hp: 50,
                att: 10,
            },
            {
                name: 'Mage',
                grade: 0,
                matt: 10,
                eva: 1,
            },
            {
                name: 'Druid',
                grade: 0,
                hp: 25,
                mdef: 5,
            },
            {
                name: 'Cleric',
                grade: 0,
                mdef: 5,
                eva: 1,
            },
            {
                name: 'Gladiator',
                grade: 1,
                hp: 100,
                att: 15,
                def: 5,
            },
            {
                name: 'Sorcerer',
                grade: 1,
                matt: 20,
                mdef: 5,
                eva: 1
            },
            {
                name: 'Elementalist',
                grade: 2,
                hp: 25,
                matt: 15,
                eva: 1
            },
            {
                name: 'Overlord',
                grade: 3,
                hp: 150,
                att: 25,
                matt: 25,
                def: 10,
                mdef: 10,
                eva: 2
            },
        ]
    }

    getJob(name){
        let job = this.jobs.find(j => j.name === name);
        job.lvl = 1;
        return job;
    }
}

module.exports = JobManager;