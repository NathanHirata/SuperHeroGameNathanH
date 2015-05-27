game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                //this is the settings for the enemy tower
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        //this means that the tower image "broken" is not showing
        this.broken = false;
        //this is the health of the tower
        this.health = game.data.enemyBaseHealth;
        //this means to always update the health and images
        this.alwaysUpdate = true;
        //this is the collision of the tower
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
        //these render the images for the tower
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    //this updates the health of the tower and image
    update: function(delta) {
        //this tells us that if the tower reaches its health below zero it changes the image to "broken" tower
        if (this.health <= 0) {
            //this confirms that the tower has been destroyed
            this.broken = true;
            game.data.win = true;
            //this is the image it changes too
            this.renderable.setCurrentAnimation("broken");
        }
        //updates the update function
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    },
    loseHealth: function(damage) {
        console.log(this.health);
        //this is the code that tells the tower to lose health when hit
        this.health = this.health - damage;
    }

});

