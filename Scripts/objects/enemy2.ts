module objects {
  export class Enemy2 extends objects.GameObject {
    // private instance variables

    // public properties
    public rotationRad;

    // Constructor
    constructor() {
      super("enemy2");
      this.Start();
    }

    // private methods

    // public methods

    // Initializes variables and creates new objects
    public Start():void {
      this._dy = 10;
      this.Reset();
    }

    // updates the game object every frame
    public Update():void {
      this.Move();
      this.CheckBounds();
    }

    // reset the objects location to some value
    public Reset():void {

      if (Math.random() < 0.25) {
        this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
        this.y = -0;
      }
      else if (Math.random() < 0.5) {
        this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
        this.y = 0;
      }
      else if (Math.random() < 0.75) {
        this.y = Math.floor((Math.random() * (480 - this.height)) + this.halfWidth);
        this.x = -0;
      }
      else {
        this.y = Math.floor((Math.random() * (480 - this.width)) + this.halfWidth);
        this.x = 0;
      }
      this.alpha = 0;

      this.rotationRad = Math.atan2(managers.Game.mira.y  - this.y, managers.Game.mira.x - this.x);
      this.rotation = this.rotationRad * (180 / Math.PI);
      console.log(this.rotation);
    }

    // move the object to some new location
    public Move():void {
      this.x += Math.cos(this.rotationRad) * 5;
      this.y += Math.sin(this.rotationRad) * 5;
    }

    // check to see if some boundary has been passed
    public CheckBounds():void {
      // turn enemy back on when it appears on the screen
      if((this.y >= 0) && (this.alpha == 0)) {
        this.alpha = 1;
      }

      // check x bounds
      if(this.x >= 640 + this.width || this.x <= -this.width) {
        this.Reset();
      }

      // check y bounds
      if(this.y >= 480 + this.height || this.y <= -this.height) {
        this.Reset();
      }
    }
  }
}
