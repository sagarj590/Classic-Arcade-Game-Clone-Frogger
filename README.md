# Classic-Arcade-Game-Clone-Frogger 
## Project Requirements 
You will be provided with visual assets and a game loop engine; using these tools you must add a number of entities to the game including the player characters and enemies to recreate the classic arcade game "Frogger".

## How I learnt to make the game run 
- We don't see anything when the game starts we dont see anything on the screen after loading the HTML file. This is because `allEnemies` is not defined. 
- There are three `.js` files in the js folder, one `.html` and `.css` files each. 
- The `app.js` has a lot of things. It has various commands for enemies' &amp; player's upate and render functions. 
- The `engine.js` is assigned to immediately invoked function. It executes the game. It has the kickoff point `main()`. It also defines other variables that set the canvas' width and height. The `onReady()` acts as push function.   
- The `resources.js` takes array of images.For every instance in the array we call underbar load on url. It is the 'else' block that makes new image and defines onload function which is to be executed once only.  Once loading is done, cache `url` to `false` and all images load.

## Installation / How to run the application
- Click download ZIP on the right of the screen, then extract the zip file to your computer.
- Locate where you unzipped the files in the repo.
- Click index.html to open the game in your browser and enjoy the app !!!

## How to play the game   
- Use arrow keys up,  down, right and left to move the boy on the grass, to get him to the river without colliding with the bugs on the stone path.  
- If the boy collides with the bugs, he has to go back to the start point. This can be done either by refreshing or hitting "Play Again" button. 
- If you successfully move the boy with no collisions, you win the game and twinkling animation appears. 
- If you want to reset the game, please refresh the page.


## Resources  
- Understanding the [engine.js](https://plus.google.com/u/0/events/cupbs3pbne7qkuqok4g0ldhntic?authkey=COGW25b5jbv3-AE)   
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/README.md)  
- www.w3schools.com/js   
- [Markdown Basics](http://markdown-guide.readthedocs.io/en/latest/basics.html) 
- [Online Markdown Editor](https://dillinger.io/)
