module objects {
  export class Bullet extends objects.GameObject {
    // private instance variables

    // public properties
    public rotationRad;

    // constructors
    constructor() {
      super("bubble");
      this.Start();
    }

    // private methods

    // public methods
    public Start(): void {
      this._dx = 0;
      this._dy = 0;
      this.Reset();
    }

    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public Reset():void {
      this.x = -5000;
      this.y = -5000;
    }

    public CheckBounds():void {
      if(this.y <= -this.height) {
        this.Reset();
      }
    }

    public Move():void {
      this.x += Math.cos(this.rotationRad) * 10;
      this.y += Math.sin(this.rotationRad) * 10;
    }
  }
}
