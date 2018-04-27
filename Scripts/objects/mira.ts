module objects {
  export class Mira extends objects.GameObject {
    // private instance variables
    private _bulletSpawn: math.Vec2;

    // public properties

    // Constructor
    constructor() {
      super("mira");
      this.Start();
    }

    // private methods

    // public methods

    // Initializes variables and creates new objects
    public Start(): void {

      this.x = 320;
      this.y = 430;
      this._bulletSpawn = new math.Vec2();
    }

    // updates the game object every frame
    public Update(): void {
      this.Move();
      this.RotateTowardCursor();
      this.CheckBounds();
      this.BulletFire();
    }

    // reset the objects location to some value
    public Reset(): void {

    }

    // move the object to some new location
    public Move(): void {
      // mouse controls
      // this.x = objects.Game.stage.mouseX;

      // keyboard controls
      if (managers.Game.keyboardManager.moveLeft) {
        this.x -= 5;
      }

      if (managers.Game.keyboardManager.moveRight) {
        this.x += 5;
      }

      if (managers.Game.keyboardManager.moveForward) {
        this.y -= 5;
      }

      if (managers.Game.keyboardManager.moveBackward) {
        this.y += 5;
      }

    }

    public RotateTowardCursor() {
      let rotationRad = Math.atan2(managers.Game.mouseY  - this.y, managers.Game.mouseX - this.x);
      this.rotation = rotationRad * (180 / Math.PI) - 90;
    }

    // check to see if some boundary has been passed
    public CheckBounds(): void {
      // right boundary
      if (this.x >= 640 - this.halfWidth) {
        this.x = 640 - this.halfWidth;
      }

      // left boundary
      if (this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }

      // right boundary
      if (this.y >= 480 - this.halfHeight) {
        this.y = 480 - this.halfHeight;
      }

      // left boundary
      if (this.y <= this.halfHeight) {
        this.y = this.halfHeight;
      }
    }

    public BulletFire(): void {
      // check if Plane is "alive"
      if (this.alpha = 1) {
        let ticker: number = createjs.Ticker.getTicks();
        if ((managers.Game.keyboardManager.fire) && (ticker % 10 == 0)) {
          let rotationRad = Math.atan2(managers.Game.mouseY  - this.y, managers.Game.mouseX - this.x);
          let spawnX = Math.cos(rotationRad) * 50;
          let spawnY = Math.sin(rotationRad) * 50;
          this._bulletSpawn = new math.Vec2(this.x + spawnX, this.y + spawnY);
          let currentBullet = managers.Game.bulletManger.CurrentBullet;
          let bullet = managers.Game.bulletManger.Bullets[currentBullet];
          bullet.x = this._bulletSpawn.x;
          bullet.y = this._bulletSpawn.y;
          bullet.rotation = rotationRad;
          managers.Game.bulletManger.CurrentBullet++;
          if (managers.Game.bulletManger.CurrentBullet > 49) {
            managers.Game.bulletManger.CurrentBullet = 0;
          }
          createjs.Sound.play("bubbleSound");
        }
      }
    }
  }
}
