module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _nursery: createjs.Bitmap;
    private _mira: objects.Mira;
    // private _island: objects.Island;
    private _clouds: objects.Cloud[];
    private _cloudNum: number;
    private _scoreBoard: managers.ScoreBoard;
    private _bulletManager: managers.Bullet;
    private _labelLevel:objects.Label;
    private _engineSound: createjs.AbstractSoundInstance;
    // private _coin: objects.Coin;
    private _enemy1: objects.Enemy1;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods



    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._nursery = new createjs.Bitmap(managers.Game.assetManager.getResult("nursery"));
      this._nursery.scaleX = 640 / this._nursery.getBounds().width;
      this._nursery.scaleY = 480 / this._nursery.getBounds().height;
      this._labelLevel = new objects.Label("Level 1", "30px", "Arial", "#FF0000", 250, 50, false);

      this._mira = new objects.Mira();
      managers.Game.mira = this._mira;

      // make a reference to the bullet manager in the game manager
      this._bulletManager = new managers.Bullet();
      managers.Game.bulletManger = this._bulletManager;

      // create an enemy object
      this._enemy1 = new objects.Enemy1();

      // this._coin = new objects.Coin();
      // this._island = new objects.Island();

      // instantiate the cloud array
      // this._clouds = new Array<objects.Cloud>();
      // this._cloudNum = 2;
      // loop and add each cloud to the array
      // for (let count = 0; count < this._cloudNum; count++) {
      // this._clouds[count] = new objects.Cloud();
      // }

      this._engineSound = createjs.Sound.play("gameMusic");
      this._engineSound.loop = -1; // play forever
      this._engineSound.volume = 0.3;

      // create the scoreboard UI for the Scene
      this._scoreBoard = new managers.ScoreBoard();
      managers.Game.scoreBoard = this._scoreBoard;

      this.Main();
    }

    // triggered every frame
    public Update(): void {
      //console.log("Num Objects: " + this.numChildren);

      this._mira.Update();

      this._enemy1.Update();

      this._bulletManager.Update();

      if(this._scoreBoard.Score == 2000){
        this._engineSound.stop();
        managers.Game.currentScene = config.Scene.LVL2;
        console.log("switch to lvl 2");
      }

      // this._coin.x = this._island.x;
      // this._coin.y = this._island.y;
      // this._coin.Update();

      // this._island.Update();

      // check collision between plane and coin
      // managers.Collision.Check(this._mira, this._coin);

      // this._clouds.forEach(cloud => {
      // cloud.Update();
      // check collision between plane and current cloud
      // managers.Collision.Check(this._mira, cloud);
      // });

      managers.Collision.Check(this._mira, this._enemy1);


      this._bulletManager.Bullets.forEach(bullet => {
        managers.Collision.Check(bullet, this._enemy1);
      });

      // if lives fall below zero switch scenes to the game over scene
      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        if (managers.Game.HighScore <= managers.Game.scoreBoard.Score) {
          managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
          managers.Game.HighScore = managers.Game.scoreBoard.HighScore;
        }
        managers.Game.currentScene = config.Scene.OVER;
      }

    }

    // This is where the fun happens
    public Main(): void {
      // add the ocean to the scene
      this.addChild(this._nursery);

      // add the island to the scene
      // this.addChild(this._island);

      // add the coin to the scene
      // this.addChild(this._coin);

      // add the plane to the scene
      this.addChild(this._mira);

      // add the enemy plane to the scene
      this.addChild(this._enemy1);

      //add level label to scene
      this.addChild(this._labelLevel);

      // add the bullets to the scene
      this._bulletManager.Bullets.forEach(bullet => {
        this.addChild(bullet);
      });

      // add clouds to the scene

      // this._clouds.forEach(cloud => {
      // this.addChild(cloud);
      // });

      // add scoreboard labels to the scene
      this.addChild(this._scoreBoard.LivesLabel);
      this.addChild(this._scoreBoard.ScoreLabel);

      //click to fire
      this._nursery.addEventListener("click", function(event) { 
        managers.Game.keyboardManager.fire = true; 
        setTimeout(function(){(managers.Game.keyboardManager.fire = false)}, 150);
         
      });
    }
  }
}
