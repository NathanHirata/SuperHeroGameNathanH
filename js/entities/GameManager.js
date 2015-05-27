game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        //doesnt end game 
        this.gameover = false;
    },
    update: function() {
        if (game.data.win === true && !this.gameover) {
            //this sends an alert depending who destroys each others bas first
            this.gameOver(true);
            alert("YOU WIN!");
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            alert("YOU LOSE!");
        }

        return true;
    },
    gameOver: function(win) {
        //this meanss if we destroy the base we get exp
        if (win) {
            game.data.exp += 10;
        } else {
            game.data.exp += 1;
        }
        //ends the game
        this.gameover = true;
        //saves our exp
        me.save.exp = game.data.exp;


        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
                .success(function(response) {
                    //changes screen
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    } else {
                        //sends a alert
                        alert(response);
                    }
                })
                .fail(function(response) {
                    //sends us an alert
                    alert("fail");
                });

    }
});



