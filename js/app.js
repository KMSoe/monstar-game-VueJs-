new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monstarHealth: 100,
        gameIsRunning: false,
        logs: [],
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monstarHealth = 100;
        },
        attack: function () {
            this.playerAttack(3, 10);
            this.monstartAttack();
        },
        specialAttack: function () {
            this.playerAttack(10, 20);
            this.monstartAttack();
        },
        playerAttack: function (min, max) {
            let damage = this.calculateDamage(min, max)
            this.monstarHealth -= damage;

            let log = {
                isPlayer: true,
                message: `Player hits Monstar for ${damage}`,
            }

            this.logs.unshift(log);

            if (this.checkWin()) {
                return;
            }
        },
        monstartAttack: function () {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;

            let log = {
                isPlayer: false,
                message: `Monstar hits player for ${damage}`,
            }

            this.logs.unshift(log);
            this.checkWin();
        },
        heal: function () {
            let message = '';

            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                message = 'Player heal for 10';
            } else {
                message = `Player heal for ${100 - this.playerHealth}`;
                this.playerHealth = 100;
            }

            let log = {
                isPlayer: true,
                message,
            }

            this.logs.unshift(log);
            this.monstartAttack();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max + 1), min);
        },
        checkWin: function () {
            if (this.monstarHealth <= 0) {
                if (confirm('You Won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;

                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;

                }
                return true;
            }

            return false;
        }
    },
})