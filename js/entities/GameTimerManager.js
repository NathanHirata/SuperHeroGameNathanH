game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();
        //checks if the players life dead
        if (game.data.player.dead) {
            //respawns player at cordinates
            me.state.current().resetPlayer(10, 0);
        }
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    goldTimerCheck: function() {
        //adds gold to the player when they kill a creep
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1 + 1);
        }
    },
    creepTimerCheck: function() {
        //this code adds a creep to the screen ever 10 seconds
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});


