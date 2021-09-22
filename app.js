function getRandomVal(min, max){
    return Math.floor(Math.random()*(max-min)) + min;
}
const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    methods: {
        restarting(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        attackMonster(){
            this.currentRound++;
            const AttackMonsterValue = getRandomVal(5,12);
            this.monsterHealth -= AttackMonsterValue;
            this.addLogMessages('player', 'attack', AttackMonsterValue);
            this.attackPlayer(); 
        },
        attackPlayer(){
            const AttackPlayerValue = getRandomVal(8,15);
            this.playerHealth -= AttackPlayerValue;
            this.addLogMessages('monster', 'attack', AttackPlayerValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            const AttackMonsterValue = getRandomVal(14,20);
            this.monsterHealth -= AttackMonsterValue;
            this.addLogMessages('player', 'attack', AttackMonsterValue);
            this.attackPlayer();    
        },
        healingPlayer(){
            this.currentRound++;
            const healingValue = getRandomVal(15,15);
            if (healingValue + this.playerHealth > 100) {
                this.playerHealth = 100;
            }else{
                this.playerHealth += healingValue;
            }
            this.addLogMessages('player', 'heal', healingValue);
        },
        surrender(){
            this.winner = 'monster';            
        },
        addLogMessages(who, what, value){
            this.logMessages.push({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
    computed: {
        healthBarMonster(){
            if (this.monsterHealth <= 0) {
                return{width: '0%'}
            }
            return {width: this.monsterHealth + '%'};
        },
        healthBarPlayer(){
            if (this.playerHealth <= 0) {
                return{width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        },
        roundCheck(){
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }else if (value <= 0) {
                this.winner = 'player';
            }
        }        

    }
})
app.mount('#game')

















































