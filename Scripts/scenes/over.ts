module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overLabel: objects.Label;
    private _restartButton: objects.Button;
    private _mainButton: objects.Button;    
    //private _ocean: objects.Ocean;
    private _loseScreen: createjs.Bitmap;

    private _scoreboard: managers.ScoreBoard;

    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    private _restartButtonClick():void {
      managers.Game.currentScene = config.Scene.PLAY;
    }

    private _mainButtonClick():void {
      managers.Game.currentScene = config.Scene.START;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      
      this._loseScreen = new createjs.Bitmap(managers.Game.assetManager.getResult("endScene"));
      this._loseScreen.scaleX = 640 / this._loseScreen.getBounds().width;
      this._loseScreen.scaleY = 480 / this._loseScreen.getBounds().height;
      this._restartButton = new objects.Button("restartBtn", 520, 400);
      this._mainButton = new objects.Button("mainBtn", 120, 400);      
      this._scoreboard = new managers.ScoreBoard();

      this.Main();
    }

    public Update(): void {
      //this._ocean.Update();
    }

    // This is where the fun happens
    public Main(): void {
      // add the ocean object
      this.addChild(this._loseScreen);

      // add the welcome label to the scene
      this.addChild(this._overLabel);

      // add the backButton to the scene
      this.addChild(this._restartButton);

      this.addChild(this._mainButton);
      

      // add scoreboard to the scene
      this.addChild(this._scoreboard.HighScoreLabel);
      this._scoreboard.HighScore = managers.Game.HighScore;

      // event listeners
      this._restartButton.on("click", this._restartButtonClick);
      this._mainButton.on("click", this._mainButtonClick);
    }
  }
}
