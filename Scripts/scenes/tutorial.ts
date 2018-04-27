module scenes {
  export class TutorialScene extends objects.Scene {
    // Private Instance Variables
    private _welcomeLabel: createjs.Bitmap;
    private _startButton: objects.Button;
    private _nursery: createjs.Bitmap;
    private _instructions: objects.Label;


    // Public Properties

    // Constructor
    constructor() {
      super();

      this.Start();
    }

    // Private Mathods
    private _startButtonClick():void {
      managers.Game.currentScene = config.Scene.START;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {


      this._nursery = new createjs.Bitmap(managers.Game.assetManager.getResult("nursery"));
      this._nursery.scaleX = 640 / this._nursery.getBounds().width;
      this._nursery.scaleY = 480 / this._nursery.getBounds().height;

      this._welcomeLabel = new objects.GameObject("tutorial");
      this._welcomeLabel.x = 320;
      this._welcomeLabel.y = 90;

      this._instructions = new objects.Label("Using the arrow keys to move and the mouse \n to aim (click to shoot, or use the spacebar), \ndo your job and calm those babies!", "20px", "Cheri", "#222222", 700, 200, true)
      

      this._startButton = new objects.Button("back", 100, 400);
      this.Main();
    }

    public Update(): void {
      // this._ocean.Update();
    }

    // This is where the fun happens
    public Main(): void {
      // add the ocean object
      this.addChild(this._nursery);

      // add the welcome label to the scene
      this.addChild(this._welcomeLabel);

      // add the startButton to the scene
       this.addChild(this._startButton);

       this.addChild(this._instructions);
       

       this._startButton.on("click", this._startButtonClick);
    }
  }
}
