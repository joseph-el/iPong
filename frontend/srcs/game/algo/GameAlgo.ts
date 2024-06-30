import { Player } from "../entities/Player";
import { Ball } from "../entities/Ball";
import { GAME_SETTING } from "../constants/settings";

export class GameAlgo {
  /* Game Size */
  width: number;
  height: number;

  /* Game Render */
  private framePerSeconds: number;
  private loop: NodeJS.Timeout | null;
  private ctx: CanvasRenderingContext2D | null;

  /* Game Settings */
  private target: number;

  /* Game Entities */
  player: Player | null;
  computer: Player | null;
  private ball: Ball | null;

  /* Game Design */
  private defaultColor: string;
  private font: string;
  private hitBallColor: string;
  private hitBallSizeX: number;
  private hitBallSizeY: number;

  /* Game Entities Sizes */
  private playerWidthPercentage: number;
  private playerHeightPercentage: number;
  private ballSizePercentage: number;

  /* Game Speed */
  private fractionForSpeed: number;
  private ballVelocity: number;
  private ballSpeed: number;
  private ballSpeedFactor: number;

  /* Game Entities Sizes */
  private ballSize: number;

  /* Game Net Settings */
  private netWidth: number;
  private netGap: number;

  /* Sounds */
  private ballHitSound: HTMLAudioElement | null;
  private scoreSound: HTMLAudioElement | null;

  /* Images */
  private bgImage: HTMLImageElement | null;
  private netImage: HTMLImageElement | null;
  private skinImage: HTMLImageElement | null;
  private botSkinImage: HTMLImageElement | null;

  /* Images Helpers */
  private isBgImageLoaded: boolean = false;
  private isNetImageLoaded: boolean = false;
  private isSkinImageLoaded: boolean = false;
  private isBotSkinImageLoaded: boolean = false;

  /* images paths */
  private mapPath: string;
  private skinPath: string;
  private botSkinPath: string;

  /* CallBacks */
  winnerCallback: (winner: string) => void;
  playerScoreCallback: (p1Score: number) => void;
  botScoreCallback: (p2Score: number) => void;

  constructor(
    ctx: CanvasRenderingContext2D,
    mapPath: string,
    skinPath: string,
    botSkinPath: string,
    winnerCallback: (winner: string) => void,
    playerScoreCallback: (p1Score: number) => void,
    botScoreCallback: (p2Score: number) => void
  ) {
    this.width = GAME_SETTING.GAME_WIDTH;
    this.height = GAME_SETTING.GAME_HEIGHT;
    this.framePerSeconds = GAME_SETTING.FRAME_PER_SECONDS;
    this.loop = null;
    this.ctx = ctx;
    this.target = GAME_SETTING.GAME_TARGET;
    this.player = null;
    this.computer = null;
    this.ball = null;
    this.mapPath = mapPath;
    this.skinPath = skinPath;
    this.botSkinPath = botSkinPath;
    this.winnerCallback = winnerCallback;
    this.playerScoreCallback = playerScoreCallback;
    this.botScoreCallback = botScoreCallback;
    /* Game General Settings */
    this.defaultColor = GAME_SETTING.DEFAULT_COLOR;

    /* Players Settings */
    this.playerWidthPercentage = GAME_SETTING.PLAYERS_WIDTH_PERCENTAGE;
    this.playerHeightPercentage = GAME_SETTING.PLAYERS_HEIGHT_PERCENTAGE;
    this.fractionForSpeed = GAME_SETTING.FRACTION_FOR_SPEED;

    /* Ball Settings */
    this.ballSizePercentage = GAME_SETTING.BALL_SIZE_PERCENTAGE;
    this.ballSpeedFactor = GAME_SETTING.BALL_SPEED_FACTOR;
    this.ballSpeed = Math.min(this.width, this.height) * this.ballSpeedFactor;
    this.ballVelocity = GAME_SETTING.BALL_VELOCITY;
    this.ballSize =
      Math.min(this.width, this.height) * (this.ballSizePercentage / 100);

    /* Net Settings */
    this.netWidth = Math.ceil(this.width * 0.006);
    this.netGap = Math.ceil(this.height * 0.04);

    /* Scores Settings */
    this.font = GAME_SETTING.DEFAULT_FONT;

    /* Sounds Settings */
    this.ballHitSound = null;
    this.scoreSound = null;

    /* Skins And Backgrounds */
    this.bgImage = null;
    this.netImage = null;
    this.skinImage = null;

    /* Effects Settings */
    this.hitBallColor = GAME_SETTING.HIT_COLOR;
    this.hitBallSizeX = Math.floor(this.ballSize * 3);
    this.hitBallSizeY = Math.floor(this.ballSize * 2.5);

    /* Init Data*/
    this.initGameEntities();
    this.preLoadSounds();
    this.preLoadImages();
  }

  /* Game Init Methods */
  private initGameEntities() {
    const playersWidth = (this.width * this.playerWidthPercentage) / 100;
    const playersHeight = (this.height * this.playerHeightPercentage) / 100;

    this.player = new Player(
      0,
      (this.height - playersHeight) / 2,
      playersWidth,
      playersHeight,
      0,
      this.defaultColor,
      this.fractionForSpeed
    );
    this.computer = new Player(
      this.width - playersWidth,
      (this.height - playersHeight) / 2,
      playersWidth,
      playersHeight,
      0,
      this.defaultColor,
      this.fractionForSpeed
    );
    this.ball = new Ball(
      this.width / 2,
      this.height / 2,
      this.ballSize,
      this.ballVelocity,
      this.ballVelocity,
      this.ballVelocity,
      this.ballSpeed,
      this.defaultColor
    );
    this.preLoadSounds();
  }

  /* Drawing Methods */
  private drawScores(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.defaultColor;
    ctx.font = this.font;
    ctx.fillText(
      this.player!.score.toString(),
      this.width / 4,
      this.height / 5
    );
    ctx.fillText(
      this.computer!.score.toString(),
      (3 * this.width) / 4,
      this.height / 5
    );
  }
  private drawNet(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.defaultColor; // Fix: Changed to defaultColor
    ctx.beginPath();
    for (let y = this.netGap; y < this.height; y += this.netGap * 2) {
      ctx.rect((this.width - this.netWidth) / 2, y, this.netWidth, this.netGap);
    }
    ctx.fill();
  }
  private drawFlash(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(
      x,
      y,
      this.hitBallSizeX / 2,
      this.hitBallSizeY / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.hitBallColor;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.restore();
  }
  private drawPlayerShadow(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
    const shadowOffsetX = 3;
    const shadowOffsetY = 5;
    ctx.fillRect(
      this.player!.x + shadowOffsetX,
      this.player!.y + shadowOffsetY,
      this.player!.width,
      this.player!.height
    );
  }
  private drawBallTrail(ctx: CanvasRenderingContext2D) {
    const numSegments = 6;
    const opacityStep = 0.1;
    let opacity = 0.4;
    const opacityDelta = opacityStep;
    for (let i = 0; i < numSegments; i++) {
      ctx.beginPath();
      ctx.arc(
        this.ball!.x - this.ball!.velocityX * i,
        this.ball!.y - this.ball!.velocityY * i,
        this.ball!.radius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      opacity -= opacityDelta;
    }
  }

  /* On Going Game Settings */
  private updateScores() {
    if (this.ball!.x - this.ball!.radius < 0) {
      this.playScoreSound();
      this.computer!.score++;
      this.ball!.resetBall(this.width, this.height, 1);
      this.botScoreCallback(this.computer!.score);
      if (this.computer!.score >= this.target) {
        this.endGame("Bot");
      }
    } else if (this.ball!.x + this.ball!.radius > this.width) {
      this.playScoreSound();
      this.player!.score++;
      this.ball!.resetBall(this.width, this.height, 2);
      this.playerScoreCallback(this.player!.score);
      if (this.player!.score >= this.target) {
        this.endGame("Player");
      }
    }
  }

  /* Sounds Control */
  private playScoreSound() {
    if (this.scoreSound) {
      this.scoreSound.pause();
      this.scoreSound.currentTime = 0;
      this.scoreSound.play();
    }
  }

  /* Loading Images/Sounds For The Game */
  private preLoadImages() {
    this.bgImage = new Image();
    this.netImage = new Image();
    this.skinImage = new Image();
    this.botSkinImage = new Image();

    this.bgImage.onload = () => {
      this.isBgImageLoaded = true;
    };

    this.netImage.onload = () => {
      this.isNetImageLoaded = true;
    };

    this.skinImage.onload = () => {
      this.isSkinImageLoaded = true;
    };

    this.botSkinImage.onload = () => {
      this.isBotSkinImageLoaded = true;
    };

    this.bgImage.onerror = () => {
      this.isBgImageLoaded = false;
    };
    this.netImage.onerror = () => {
      this.isNetImageLoaded = false;
    };

    this.skinImage.onerror = () => {
      this.isSkinImageLoaded = false;
    };

    this.botSkinImage.onerror = () => {
      this.isBotSkinImageLoaded = false;
    };

    this.bgImage.src = this.mapPath;
    this.netImage.src = GAME_SETTING.NET_IMG_PATH;
    this.botSkinImage.src = this.botSkinPath;
    this.skinImage.src = this.skinPath;
  }
  private preLoadSounds() {
    this.ballHitSound = new Audio(GAME_SETTING.HIT_BALL_SOUND);
    this.scoreSound = new Audio(GAME_SETTING.SCORE_SOUND);
  }

  /* Game Control */
  startGame(ctx: CanvasRenderingContext2D) {
    if (!ctx) {
      return;
    }
    this.ctx = ctx;
    this.loop = setInterval(() => {
      if (this.ctx) {
        this.render(this.ctx);
      }
      this.update();
    }, 1000 / this.framePerSeconds);
  }

  endGame(winner: string) {
    if (this.loop) {
      clearInterval(this.loop);
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.winnerCallback(winner);
  }

  clearGameData() {
    if (this.loop) {
      clearInterval(this.loop);
      this.loop = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /* Reset game entities */
    this.player = null;
    this.computer = null;
    this.ball = null;

    /* Reset sounds */
    this.stopAndResetSound(this.ballHitSound);
    this.stopAndResetSound(this.scoreSound);

    /* Reset images */
    if (this.bgImage) {
      this.bgImage.src = "";
      this.bgImage = null;
    }
    if (this.netImage) {
      this.netImage.src = "";
      this.netImage = null;
    }
    if (this.skinImage) {
      this.skinImage.src = "";
      this.skinImage = null;
    }
    if (this.botSkinImage) {
      this.botSkinImage.src = "";
      this.botSkinImage = null;
    }
    this.isBgImageLoaded = false;
    this.isSkinImageLoaded = false;
    this.isBotSkinImageLoaded = false;
  }

  private stopAndResetSound(sound: HTMLAudioElement | null) {
    if (sound && !sound.paused) {
      sound.pause();
      sound.currentTime = 0;
    }
    sound = null;
  }

  private render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
    if (this.isBgImageLoaded && this.bgImage) {
      ctx.drawImage(this.bgImage, 0, 0, this.width, this.height);
    } else {
      ctx.fillStyle = "BLACK";
      ctx.fillRect(0, 0, this.width, this.height);
    }
    // this.drawScores(ctx);
    if (this.isNetImageLoaded && this.netImage) {
      const netX = (this.width - GAME_SETTING.NET_WIDTH) / 2;
      const netY = (this.height - GAME_SETTING.NET_HEIGHT) / 2;
      ctx.drawImage(
        this.netImage,
        netX,
        netY,
        GAME_SETTING.NET_WIDTH,
        GAME_SETTING.NET_HEIGHT
      );
    } else {
      this.drawNet(ctx);
    }
    this.drawPlayerShadow(ctx);
    if (this.isSkinImageLoaded && this.skinImage) {
      ctx.drawImage(
        this.skinImage,
        this.player!.x,
        this.player!.y,
        this.player!.width,
        this.player!.height
      );
    } else {
      this.player!.drawPlayer(ctx);
    }
    if (this.isBotSkinImageLoaded && this.botSkinImage) {
      ctx.drawImage(
        this.botSkinImage,
        this.computer!.x,
        this.computer!.y,
        this.computer!.width,
        this.computer!.height
      );
    } else {
      this.computer!.drawPlayer(ctx);
    }
    this.drawBallTrail(ctx);
    this.ball!.drawBall(ctx);
  }

  private update() {
    if (!this.ctx) return;

    this.updateScores();
    this.ball!.ballTopAndBottomCollision(
      this.height,
      this.ctx,
      this.hitBallSizeX
    );
    this.ball!.moveBall();
    this.botControlOn();
    const player =
      this.ball!.x + this.ball!.radius < this.width / 2
        ? this.player
        : this.computer;
    if (this.ball!.ballPlayerCollision(player!)) {
      if (this.ballHitSound && this.ballHitSound.readyState === 4) {
        this.ballHitSound.pause();
        this.ballHitSound.currentTime = 0;
        this.ballHitSound.play();
      }
      let collidePoint = this.ball!.y - (player!.y + player!.height / 2);
      collidePoint = collidePoint / (player!.height / 2);
      const angleRad = (Math.PI / 4) * collidePoint;
      const direction =
        this.ball!.x + this.ball!.radius < this.width / 2 ? 1 : -1;
      this.ball!.velocityX = direction * this.ball!.speed * Math.cos(angleRad);
      this.ball!.velocityY = this.ball!.speed * Math.sin(angleRad);
      this.ball!.speed += 0.1;
      this.drawFlash(this.ctx, this.ball!.x, this.ball!.y);
    }
  }

  /* Control Bot  */
  private botControlOn() {
    this.computer!.y +=
      (this.ball!.y - (this.computer!.y + this.computer!.height / 2)) * 0.1;
    if (this.computer!.y < 0) {
      this.computer!.y = 0;
    } else if (this.computer!.y + this.computer!.height > this.height) {
      this.computer!.y = this.height - this.computer!.height;
    }
  }
}
