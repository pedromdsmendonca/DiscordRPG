class JobManager{
    constructor(){
        this.jobs = [
            {
                name: 'Warrior',
                grade: 0,
                hp: 50,
                att: 10,
                base: {
                    dmgi: 4
                },
                incremental: {
                    dmgi: 1
                },
                weapons: ['sword']
            },
            {
                name: 'Mage',
                grade: 0,
                matt: 15,
                base: {
                    eva: 3,
                    cr: 4
                },
                incremental: {
                    cr: 1
                },
                weapons: ['sword']
            },
        ]
    }

    getJob(name){
        let job = this.jobs.find(j => j.name === name);
        job.lvl = 1;
        job.active = true;
        return job;
    }
}

module.exports = JobManager;