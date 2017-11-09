/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
	/* Define the variables we'll be using within this scope,
     * create the canvas element, get the 2D context 
     * Set the canvas' width & height then add it to DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        sparkleNum = 0,
        showNum = 0,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get the time distance (dt) as a parameter when call update() which sets enemies moving at the same speed in different computers irrespective of the rate at which it processes instructions. */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        /* Set lastTime to get the dt at next call of main() & using requestAnimationFrame calling main() in loop. */
        lastTime = now;
        win.requestAnimationFrame(main);

    }

    /* Set the game enviroment, set lastTime once only need to call at the start. */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* Update all the game entities, and check whether player reaches end line or collides with enemy-bugs. */
     
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkWin();
    }
    
    // Check if player collides with any of the enemies, if yes stop the game. */
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if (Math.floor(enemy.x / rowUnit) == Math.floor(player.x / rowUnit) && 
                Math.floor(enemy.y / colUnit) == Math.floor(player.y / colUnit)) {
                
                play = false;

                /* Show "Play Again" button. */
                var btn = doc.getElementById("play");
                btn.style.display = "block";
                return;
            }
        });
        return;
    }

    // Check whether player wins the game, if yes stop the game.
    function checkWin() {
        if (Math.floor(player.y / colUnit) == 0) {
            play = false;
            isWin = true;
            /* Show "Play Again" button with winning message. */
            var btn = doc.getElementById("play");
            btn.style.display = "block";
        }

    }

    // Set the function when click the 'Play Again' button.
    function startPlay() {
        play = true;
        isWin = false;

        // Loop all enemy instances to reset speeds when game resarts.
        allEnemies.forEach(function(enemy) {
            enemy.rand = getRandomNum(1, 10);
        });
        reset();

        // Hide the "Play Again" button
        var btn = doc.getElementById("play");
        btn.style.display = "none";
    }

    function getRandomNum(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    /* Loop allEnemies array and update allEnemies location. */
    function updateEntities(dt) {
        if (play) {
            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
        }
    }

    /* Render the game background, game components and greeting messages when player either wins or loses. */
    function render() {
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 1 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
        ctx.fillStyle = "rgba(255, 152, 0, 0.85)";
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        // Show "Game Over" or "Well Done, You Win!" on screen depending upon the outcome.
		if (!play && !isWin) {
            ctx.font = "60px Impact";
            ctx.fillText("Game Over", canvas.width/2, 200);
            ctx.strokeText("Game Over", canvas.width/2, 200);
        } else if (isWin) {
            ctx.font = "50px Impact";
            ctx.fillText("Well Done, You Win!", canvas.width/2, 200);
            ctx.strokeText("Well Done, You Win!", canvas.width/2, 200);
        }
    }

    /* Show all enemies and player that will be called during each loop. */
    function renderEntities() {
        if (play) {
            allEnemies.forEach(function(enemy) {
                enemy.render();
            });
            player.render();
        }

/* Show all stars, sparkleNum and showNum control the twinkling animation. */
        if (isWin) {
            if (sparkleNum < 20) {

                sparkleNum ++;
            } else {
                if (showNum < 20) {
                    showNum ++;
                    allStars.forEach(function(star) {
                        star.render();
                    });
                } else {
                    showNum = 0;
                    sparkleNum = 0;
                }
            }
            player.render();
        }
    }

    // Reset enemies and player positions to start point.
    function reset() {
        play = true;
        allEnemies.forEach(function(enemy) {
            enemy.x = -101;
        });
        player.x = 2 * rowUnit;
        player.y = 5 * colUnit;
    }

    /* Load all necessary images and use init() as callback function. After loading all images the game will start. */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/enemy-bug1.png',
        'images/enemy-bug2.png',
        'images/char-boy.png',
        'images/char-horn-girl.png',
        'images/Star.png'
    ]);
    Resources.onReady(init);

	/* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.c = canvas;
    global.startPlay = startPlay;

})(this);
