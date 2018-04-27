/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function () {

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyboardManager: managers.Keyboard;
  let textureAtlasData: any;
  let textureAtlas: createjs.SpriteSheet;
  let stats: Stats;
  

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
    { id: "gameMusic", src: "./Assets/audio/ToddlerTroubleAudio/gameMusic.mp3" },
    { id: "cupcakeSound", src: "./Assets/audio/ToddlerTroubleAudio/cupcakeSound.mp3" },
    { id: "life", src: "./Assets/audio/life.wav" },
    { id: "explosion", src: "./Assets/audio/explosion.mp3" },
    { id: "bubbleSound", src: "./Assets/audio/ToddlerTroubleAudio/bubbleShot.mp3" },
    { id: "mira", src: "./Assets/images/ToddlerTroubleImages/Characters/MiraTop.png" }, 
    { id: "restartBtn", src: "./Assets/images/ToddlerTroubleImages/Buttons/Try1.png" },
    { id: "mainBtn", src: "./Assets/images/ToddlerTroubleImages/Buttons/Main1.png" },
    { id: "bubble", src: "./Assets/images/ToddlerTroubleImages/Ammo/bubble.png" }, 
    { id: "enemy1", src: "./Assets/images/ToddlerTroubleImages/Characters/AniBaby1.png" },   
    { id: "enemy2", src: "./Assets/images/ToddlerTroubleImages/Characters/AniBaby2.png" },   
    { id: "cupcake", src: "./Assets/images/ToddlerTroubleImages/cupcake.png" },
    { id: "startButton", src: "./Assets/images/ToddlerTroubleImages/Buttons/Play1.png" },
    { id: "nursery", src: "./Assets/images/ToddlerTroubleImages/Backgrounds/Nursery.png" },
    { id: "endScene", src: "./Assets/images/ToddlerTroubleImages/Backgrounds/endScene.png" },
    { id: "logo", src: "./Assets/images/ToddlerTroubleImages/TodTroLogo.png" },
    
    
  ];

  // preloads assets
  function Init(): void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
    document.onmousemove = getMousePos;
    
  }

  function getMousePos(event) {
    if (event.pageX != null && event.clientX != null) {
      managers.Game.mouseX = event.clientX - canvas.scrollLeft + window.pageXOffset;
      managers.Game.mouseY = event.clientY - canvas.scrollTop + window.pageYOffset;
    }
  }

  function InitStats(): void {
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
  }

  function Start(): void {
    console.log("Starting Application...")
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

  function Update(): void {
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

  function Main(): void {
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
