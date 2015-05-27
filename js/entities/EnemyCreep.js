game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                //creep settings
                image: "creep1",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        //creep health
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //this means it doesnt attack
        this.attacking = false;
        //this times the last hit and each one after
        this.lastHit = new Date().getTime();
        this.lastAttacking = new Date().getTime();
        this.now = new Date().getTime();
        //this is the speed of the creep
        this.body.setVelocity(3, 20);

        this.type = "EnemyCreep";

//this is the image of the creep
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("walk");

    },
    loseHealth: function(damage) {
        //this makes the creep lose health when attacked
        this.health = this.health - damage;
    },
    update: function(delta) {
        //this tells us wen the creeps life is at 0 then it dies/dissapears
        if (this.health <= 0) {
            //removes creep
            me.game.world.removeChild(this);
        }

        this.now = new Date().getTime();

        //speed of attack
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //checks collosion with other objects
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        //this is about the creeps attacking the player base
        if (response.b.type === 'PlayerBase') {
            //this lets the creep attackt the base
            this.attacking = true;
            //times the attack
            this.lastAttacking = this.now;
            //spped of attack on the base
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            //speed of attack
            if ((this.now - this.lastHit >= 1000)) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        } else if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;
            this.attacking = true;
            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
                this.renderable.setCurrentAnimation("attack");
            }
        }else if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
        }
    }

});





