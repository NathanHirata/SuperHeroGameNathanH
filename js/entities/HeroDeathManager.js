game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function() {
        //checks if the player is dead
        if (game.data.player.dead) {
            //removes the player and then spawns at the given coordinates
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
    }
});

