var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var config;
(function (config) {
    var Keys = /** @class */ (function () {
        function Keys() {
        }
        // arrow keys
        Keys.LEFT_ARROW = 37;
        Keys.RIGHT_ARROW = 39;
        Keys.UP_ARROW = 38;
        Keys.DOWN_ARROW = 40;
        // WASD keys
        Keys.W = 87;
        Keys.A = 65;
        Keys.S = 83;
        Keys.D = 68;
        // space bar
        Keys.SPACE = 32;
        return Keys;
    }());
    config.Keys = Keys;
})(config || (config = {}));
var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["PLAY"] = 1] = "PLAY";
        Scene[Scene["OVER"] = 2] = "OVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
var managers;
(function (managers) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.HighScore = 0;
        return Game;
    }());
    managers.Game = Game;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // Private Instance Variables
        // Public Propoerties
        // Constructor
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColour) || this;
            if (isCentered) {
                _this.regX = _this.getMeasuredWidth() * 0.5;
                _this.regY = _this.getMeasuredHeight() * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // Constructor
        function Scene() {
            var _this = _super.call(this) || this;
            _this.assetManager = managers.Game.assetManager;
            return _this;
        }
        // Private Methods
        // Public Methods
        Scene.prototype.Start = function () {
        };
        Scene.prototype.Update = function () {
        };
        Scene.prototype.Main = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
var math;
(function (math) {
    var Vec2 = /** @class */ (function (_super) {
        __extends(Vec2, _super);
        // private instance variables
        // public properties
        // constructors
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, x, y) || this;
        }
        // private methods
        // public methods
        Vec2.Distance = function (P1, P2) {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        };
        return Vec2;
    }(createjs.Point));
    math.Vec2 = Vec2;
})(math || (math = {}));
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // constructors
        function GameObject(imageString) {
            var _this = _super.call(this, managers.Game.textureAtlas, imageString) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // private methods
        GameObject.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.isColliding = false;
        };
        // public methods
        GameObject.prototype.Start = function () {
        };
        GameObject.prototype.Update = function () {
        };
        GameObject.prototype.Reset = function () {
        };
        GameObject.prototype.CheckBounds = function () {
        };
        GameObject.prototype.Move = function () {
        };
        return GameObject;
    }(createjs.Sprite));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Explosion = /** @class */ (function (_super) {
        __extends(Explosion, _super);
        // private instance variables
        // public properties
        // constructors
        function Explosion(spriteString) {
            var _this = _super.call(this, spriteString) || this;
            _this.Start();
            return _this;
        }
        // private methods
        Explosion.prototype._animationEnded = function () {
            this.alpha = 0;
            this.off("animationend", this._animationEnded.bind(this), false);
            managers.Game.currentSceneObject.removeChild(this);
        };
        // public methods
        Explosion.prototype.Start = function () {
            this.on("animationend", this._animationEnded.bind(this), false);
        };
        Explosion.prototype.Update = function () {
        };
        return Explosion;
    }(objects.GameObject));
    objects.Explosion = Explosion;
})(objects || (objects = {}));
var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // constructors
        function Keyboard() {
            this.enabled = true;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // private methods
        // public methods
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveForward = true;
                    break;
                case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = true;
                    break;
                case config.Keys.S:
                case config.Keys.DOWN_ARROW:
                    this.moveBackward = true;
                    break;
                case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = true;
                    break;
                case config.Keys.SPACE:
                    this.fire = true;
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveForward = false;
                    break;
                case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = false;
                    break;
                case config.Keys.S:
                case config.Keys.DOWN_ARROW:
                    this.moveBackward = false;
                    break;
                case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = false;
                    break;
                case config.Keys.SPACE:
                    this.fire = false;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        // constructors
        function ScoreBoard() {
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            // public properties
            get: function () {
                return this._lives;
            },
            set: function (newLives) {
                this._lives = newLives;
                this.LivesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
                this.ScoreLabel.text = "Score: " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newHighScore) {
                this._highScore = newHighScore;
                this.HighScoreLabel.text = "High Score: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        ScoreBoard.prototype._initialize = function () {
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "Dock51", "#FFFF00", 10, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Dock51", "#FFFF00", 500, 10, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "Dock51", "#FFFF00", 320, 240, true);
            this.Lives = 5;
            this.Score = 0;
            this.HighScore = 0;
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        // constructors
        function Bullet() {
            this.Start();
        }
        // private methods
        Bullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.Bullet();
            }
        };
        // public methods
        Bullet.prototype.Start = function () {
            // set the default bullet count
            this._bulletCount = 50;
            // create the bullet container
            this.Bullets = new Array();
            // build bullet array
            this._buildBulletPool();
            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        };
        Bullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            // create two vec2 objects
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "coin":
                            if ((object2.alpha != 0) && (object1.alpha != 0)) {
                                createjs.Sound.play("coin");
                                managers.Game.scoreBoard.Score += 100;
                                object2.alpha = 0;
                                // add a life power up
                                if (managers.Game.scoreBoard.Score % 1000 == 0) {
                                    managers.Game.scoreBoard.Lives += 1;
                                    createjs.Sound.play("life");
                                }
                                if (managers.Game.HighScore <= managers.Game.scoreBoard.Score) {
                                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                                    managers.Game.HighScore = managers.Game.scoreBoard.HighScore;
                                }
                            }
                            break;
                        case "cloud":
                            if (object1.alpha != 0) {
                                createjs.Sound.play("explosion");
                                managers.Game.scoreBoard.Lives -= 1;
                                var explosion = new objects.Explosion("explosion");
                                explosion.x = object1.x;
                                explosion.y = object1.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                object1.alpha = 0; // make the plane object invisible
                                managers.Game.plane.planeFlash.alpha = 1;
                                managers.Game.plane.planeFlash.gotoAndPlay("planeflash");
                            }
                            break;
                        case "enemy":
                            if (object2.alpha != 0) {
                                createjs.Sound.play("explosion");
                                var explosion = new objects.Explosion("explosion");
                                explosion.x = object2.x;
                                explosion.y = object2.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                managers.Game.scoreBoard.Score += 200;
                                object2.Reset();
                            }
                            break;
                    }
                }
            }
            else {
                object2.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // Private Instance Variables
        // Public Properties
        // Constructor
        function Button(imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, imageString) || this;
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._mouseOver);
            _this.on("mouseout", _this._mouseOut);
            return _this;
        }
        // Private Methods
        Button.prototype._mouseOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype._mouseOut = function () {
            this.alpha = 1.0;
        };
        return Button;
    }(objects.GameObject));
    objects.Button = Button;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // private instance variables
        // public properties
        // Constructor
        function Enemy() {
            var _this = _super.call(this, "enemy") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Enemy.prototype.Start = function () {
            this._dy = 10;
            this.Reset();
        };
        // updates the game object every frame
        Enemy.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // reset the objects location to some value
        Enemy.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -480;
            this.alpha = 0;
        };
        // move the object to some new location
        Enemy.prototype.Move = function () {
            this.y += this._dy;
        };
        // check to see if some boundary has been passed
        Enemy.prototype.CheckBounds = function () {
            // turn enemy back on when it appears on the screen
            if ((this.y >= 0) && (this.alpha == 0)) {
                this.alpha = 1;
            }
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // private instance variables
        // public properties
        // constructors
        function Bullet() {
            var _this = _super.call(this, "bullet") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Bullet.prototype.Start = function () {
            this._dx = 0;
            this._dy = -10;
            this.Reset();
        };
        Bullet.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Bullet.prototype.Reset = function () {
            this.x = -5000;
            this.y = -5000;
        };
        Bullet.prototype.CheckBounds = function () {
            if (this.y <= -this.height) {
                this.Reset();
            }
        };
        Bullet.prototype.Move = function () {
            this.y += this._dy;
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Ocean = /** @class */ (function (_super) {
        __extends(Ocean, _super);
        // public properties
        // Constructor
        function Ocean() {
            var _this = _super.call(this, managers.Game.assetManager.getResult("ocean")) || this;
            _this.Start();
            return _this;
        }
        // private methods
        // reset the objects location to some value
        Ocean.prototype._reset = function () {
            this.y = -960;
        };
        // move the object to some new location
        Ocean.prototype._move = function () {
            this.y += this._dy;
        };
        // check to see if some boundary has been passed
        Ocean.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        // public methods
        // Initializes variables and creates new objects
        Ocean.prototype.Start = function () {
            this._dy = 5;
            this._reset();
        };
        // updates the game object every frame
        Ocean.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Ocean;
    }(createjs.Bitmap));
    objects.Ocean = Ocean;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // Constructor
        function Plane() {
            var _this = _super.call(this, "plane") || this;
            _this.Start();
            return _this;
        }
        // private methods
        Plane.prototype._animationEnded = function () {
            if (this.alpha == 0) {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }
        };
        // public methods
        // Initializes variables and creates new objects
        Plane.prototype.Start = function () {
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 1;
            this.planeFlash.on("animationend", this._animationEnded.bind(this), false);
            this.x = 320;
            this.y = 430;
            this._bulletSpawn = new math.Vec2();
        };
        // updates the game object every frame
        Plane.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this.BulletFire();
        };
        // reset the objects location to some value
        Plane.prototype.Reset = function () {
        };
        // move the object to some new location
        Plane.prototype.Move = function () {
            // mouse controls
            // this.x = objects.Game.stage.mouseX;
            // keyboard controls
            if (managers.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }
            if (managers.Game.keyboardManager.moveRight) {
                this.x += 5;
            }
            this.planeFlash.x = this.x;
            this.planeFlash.y = this.y;
        };
        // check to see if some boundary has been passed
        Plane.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        };
        Plane.prototype.BulletFire = function () {
            // check if Plane is "alive"
            if (this.alpha = 1) {
                var ticker = createjs.Ticker.getTicks();
                if ((managers.Game.keyboardManager.fire) && (ticker % 10 == 0)) {
                    this._bulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight);
                    var currentBullet = managers.Game.bulletManger.CurrentBullet;
                    var bullet = managers.Game.bulletManger.Bullets[currentBullet];
                    bullet.x = this._bulletSpawn.x;
                    bullet.y = this._bulletSpawn.y;
                    managers.Game.bulletManger.CurrentBullet++;
                    if (managers.Game.bulletManger.CurrentBullet > 49) {
                        managers.Game.bulletManger.CurrentBullet = 0;
                    }
                    createjs.Sound.play("bulletSound");
                }
            }
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var PlaneFlash = /** @class */ (function (_super) {
        __extends(PlaneFlash, _super);
        // private instance variables
        // public properties
        // constructors
        function PlaneFlash() {
            return _super.call(this, "planeflash") || this;
        }
        // private methods
        // public methods
        PlaneFlash.prototype.Start = function () {
        };
        PlaneFlash.prototype.Update = function () {
        };
        return PlaneFlash;
    }(objects.GameObject));
    objects.PlaneFlash = PlaneFlash;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        // private instance variables
        // public properties
        // constructors
        function Coin() {
            var _this = _super.call(this, "coin") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        Coin.prototype.Start = function () {
        };
        Coin.prototype.Update = function () {
            this.CheckBounds();
        };
        Coin.prototype.CheckBounds = function () {
            if (this.y > (480 + this.height)) {
                this.alpha = 1;
            }
        };
        return Coin;
    }(objects.GameObject));
    objects.Coin = Coin;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Island = /** @class */ (function (_super) {
        __extends(Island, _super);
        // private instance variables
        // public properties
        // Constructor
        function Island() {
            var _this = _super.call(this, "island") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Island.prototype.Start = function () {
            this._dy = 5;
            this.Reset();
        };
        // updates the game object every frame
        Island.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // reset the objects location to some value
        Island.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
        };
        // move the object to some new location
        Island.prototype.Move = function () {
            this.y += this._dy;
        };
        // check to see if some boundary has been passed
        Island.prototype.CheckBounds = function () {
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        return Island;
    }(objects.GameObject));
    objects.Island = Island;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        // private instance variables
        // public properties
        // Constructor
        function Cloud() {
            var _this = _super.call(this, "cloud") || this;
            _this.Start();
            return _this;
        }
        // private methods
        // public methods
        // Initializes variables and creates new objects
        Cloud.prototype.Start = function () {
            this.Reset();
        };
        // updates the game object every frame
        Cloud.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        // reset the objects location to some value
        Cloud.prototype.Reset = function () {
            this.x = Math.floor((Math.random() * (640 - this.width)) + this.halfWidth);
            this.y = -this.height;
            this._dx = Math.floor((Math.random() * 4) - 2);
            this._dy = Math.floor((Math.random() * 5) + 5);
        };
        // move the object to some new location
        Cloud.prototype.Move = function () {
            this.y += this._dy;
            this.x += this._dx;
        };
        // check to see if some boundary has been passed
        Cloud.prototype.CheckBounds = function () {
            // check lower bounds
            if (this.y >= 480 + this.height) {
                this.Reset();
            }
        };
        return Cloud;
    }(objects.GameObject));
    objects.Cloud = Cloud;
})(objects || (objects = {}));
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._restartButtonClick = function () {
            managers.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._overLabel = new objects.Label("Game Over", "60px", "Dock51", "#FFFF00", 320, 140, true);
            this._restartButton = new objects.Button("restartButton", 320, 340);
            this._scoreboard = new managers.ScoreBoard();
            this.Main();
        };
        OverScene.prototype.Update = function () {
            this._ocean.Update();
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            // add the ocean object
            this.addChild(this._ocean);
            // add the welcome label to the scene
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._restartButton);
            // add scoreboard to the scene
            this.addChild(this._scoreboard.HighScoreLabel);
            this._scoreboard.HighScore = managers.Game.HighScore;
            // event listeners
            this._restartButton.on("click", this._restartButtonClick);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;
            // make a reference to the bullet manager in the game manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManger = this._bulletManager;
            // create an enemy object
            this._enemy = new objects.Enemy();
            this._coin = new objects.Coin();
            this._island = new objects.Island();
            // instantiate the cloud array
            this._clouds = new Array();
            this._cloudNum = 2;
            // loop and add each cloud to the array
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds[count] = new objects.Cloud();
            }
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // play forever
            this._engineSound.volume = 0.3;
            // create the scoreboard UI for the Scene
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoard = this._scoreBoard;
            this.Main();
        };
        // triggered every frame
        PlayScene.prototype.Update = function () {
            //console.log("Num Objects: " + this.numChildren);
            var _this = this;
            this._ocean.Update();
            this._plane.Update();
            this._enemy.Update();
            this._bulletManager.Update();
            this._coin.x = this._island.x;
            this._coin.y = this._island.y;
            this._coin.Update();
            this._island.Update();
            // check collision between plane and coin
            managers.Collision.Check(this._plane, this._coin);
            this._clouds.forEach(function (cloud) {
                cloud.Update();
                // check collision between plane and current cloud
                managers.Collision.Check(_this._plane, cloud);
            });
            this._bulletManager.Bullets.forEach(function (bullet) {
                managers.Collision.Check(bullet, _this._enemy);
            });
            // if lives fall below zero switch scenes to the game over scene
            if (this._scoreBoard.Lives <= 0) {
                this._engineSound.stop();
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add the ocean to the scene
            this.addChild(this._ocean);
            // add the island to the scene
            this.addChild(this._island);
            // add the coin to the scene
            this.addChild(this._coin);
            // add the plane to the scene
            this.addChild(this._plane);
            this.addChild(this._plane.planeFlash); // add the plane flashing effect
            // add the enemy plane to the scene
            this.addChild(this._enemy);
            // add the bullets to the scene
            this._bulletManager.Bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            // add clouds to the scene
            this._clouds.forEach(function (cloud) {
                _this.addChild(cloud);
            });
            // add scoreboard labels to the scene
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Public Properties
        // Constructor
        function StartScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        StartScene.prototype._startButtonClick = function () {
            managers.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        // Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._ocean = new objects.Ocean();
            this._welcomeLabel = new objects.Label("Mail Pilot", "60px", "Dock51", "#FFFF00", 320, 240, true);
            this._startButton = new objects.Button("startButton", 320, 340);
            this.Main();
        };
        StartScene.prototype.Update = function () {
            this._ocean.Update();
        };
        // This is where the fun happens
        StartScene.prototype.Main = function () {
            // add the ocean object
            this.addChild(this._ocean);
            // add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            // add the startButton to the scene
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
/// <reference path="../../Scripts/managers/game.ts"/>
/// <reference path="../../Scripts/objects/label.ts"/>
/// <reference path="../../Scripts/config/keys.ts"/>
/// <reference path="../../Scripts/config/scene.ts"/>
/// <reference path="../../Scripts/objects/scene.ts"/>
/// <reference path="../../Scripts/math/vec2.ts"/>
/// <reference path="../../Scripts/objects/gameobject.ts"/>
/// <reference path="../../Scripts/objects/explosion.ts"/>
// Managers
/// <reference path="../../Scripts/managers/keyboard.ts"/>
/// <reference path="../../Scripts/managers/scoreboard.ts"/>
/// <reference path="../../Scripts/managers/bullet.ts"/>
/// <reference path="../../Scripts/managers/collision.ts"/>
/// <reference path="../../Scripts/objects/button.ts"/>
/// <reference path="../../Scripts/objects/enemy.ts"/>
/// <reference path="../../Scripts/objects/bullet.ts"/>
/// <reference path="../../Scripts/objects/ocean.ts"/>
/// <reference path="../../Scripts/objects/plane.ts"/>
/// <reference path="../../Scripts/objects/planeflash.ts"/>
/// <reference path="../../Scripts/objects/coin.ts"/>
/// <reference path="../../Scripts/objects/island.ts"/>
/// <reference path="../../Scripts/objects/cloud.ts"/>
/// <reference path="../../Scripts/scenes/over.ts"/>
/// <reference path="../../Scripts/scenes/play.ts"/>
/// <reference path="../../Scripts/scenes/start.ts"/>
/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    var textureAtlasData;
    var textureAtlas;
    var stats;
    textureAtlasData = {
        "images": [
            ""
            //"./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [2, 2, 16, 16, 0, 0, 0],
            [20, 2, 226, 178, 0, 0, 0],
            [2, 182, 44, 40, 0, 0, 0],
            [48, 182, 44, 40, 0, 0, 0],
            [94, 182, 44, 40, 0, 0, 0],
            [140, 182, 44, 40, 0, 0, 0],
            [186, 182, 44, 40, 0, 0, 0],
            [2, 224, 44, 40, 0, 0, 0],
            [48, 224, 44, 40, 0, 0, 0],
            [94, 224, 44, 40, 0, 0, 0],
            [140, 224, 44, 40, 0, 0, 0],
            [186, 224, 44, 40, 0, 0, 0],
            [2, 266, 93, 74, 0, 0, 0],
            [97, 266, 93, 74, 0, 0, 0],
            [2, 342, 93, 74, 0, 0, 0],
            [97, 342, 65, 65, 0, 0, 0],
            [164, 342, 65, 65, 0, 0, 0],
            [2, 418, 65, 65, 0, 0, 0],
            [69, 418, 65, 65, 0, 0, 0],
            [136, 418, 65, 65, 0, 0, 0],
            [2, 485, 65, 65, 0, 0, 0],
            [69, 485, 65, 65, 0, 0, 0],
            [136, 485, 62, 63, 0, 0, 0],
            [2, 552, 65, 65, 0, 0, 0],
            [69, 552, 65, 65, 0, 0, 0],
            [136, 552, 65, 65, 0, 0, 0],
            [2, 619, 65, 65, 0, 0, 0],
            [69, 619, 65, 65, 0, 0, 0],
            [2, 686, 200, 60, 0, 0, 0],
            [204, 686, 32, 32, 0, 0, 0],
            [2, 748, 32, 32, 0, 0, 0],
            [36, 748, 32, 32, 0, 0, 0],
            [70, 748, 32, 32, 0, 0, 0],
            [104, 748, 32, 32, 0, 0, 0],
            [138, 748, 32, 32, 0, 0, 0],
            [2, 782, 200, 60, 0, 0, 0]
        ],
        "animations": {
            "bullet": { "frames": [0] },
            "cloud": { "frames": [1] },
            "coin": {
                "frames": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                "speed": 0.33
            },
            "enemy": {
                "frames": [12, 13, 14],
                "speed": 0.25
            },
            "explosion": {
                "frames": [15, 16, 17, 18, 19, 20, 21],
                "speed": 0.16
            },
            "island": { "frames": [22] },
            "plane": { "frames": [23, 24, 25] },
            "planeflash": {
                "frames": [26, 27, 26, 27, 26, 27],
                "speed": 0.08
            },
            "restartButton": { "frames": [28] },
            "smallexplosion": {
                "frames": [29, 30, 31, 32, 33, 34],
                "speed": 0.16
            },
            "startButton": { "frames": [35] }
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/life.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" },
        { id: "bulletSound", src: "./Assets/audio/bullet.mp3" }
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function InitStats() {
        stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(stats.dom);
    }
    function Start() {
        console.log("Starting Application...");
        // initialize performance counting
        InitStats();
        textureAtlasData.images = [assetManager.getResult("textureAtlas")];
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyboardManager = new managers.Keyboard();
        managers.Game.keyboardManager = keyboardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        stats.begin();
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
        stats.end();
    }
    function Main() {
        stage.removeAllChildren();
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map