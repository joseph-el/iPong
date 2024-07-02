export const GAME_SETTING = {
  TIMER_VALUE: 3,
  RANGE_TOLERANCE: 4,

  /* Bot Game Settings */
  GAME_WIDTH: 800,
  GAME_HEIGHT: 500,
  FRAME_PER_SECONDS: 60,
  GAME_TARGET: 1000000,

  /* Players Settings */
  PLAYERS_WIDTH_PERCENTAGE: 6,
  PLAYERS_HEIGHT_PERCENTAGE: 23,
  FRACTION_FOR_SPEED: 0.09,

  /* Ball Settings */
  BALL_SIZE_PERCENTAGE: 2.5,
  BALL_SPEED_FACTOR: 0.015,
  BALL_VELOCITY: 4,

  /* Game Color */
  DEFAULT_COLOR: "WHITE",
  DEFAULT_FONT: "75px Arial",
  HIT_COLOR: "RED",
  PLAYER_DEF_COLOR: "WHITE",

  /* Net Settings */
  NET_IMG_PATH: "/assets/game/backgrounds/split-canvas.svg",
  NET_HEIGHT: 470, //update it to 500 if you change IMG
  NET_WIDTH: 8,

  /* Sounds */
  HIT_BALL_SOUND: "/sounds/hitBall.mp3",
  SCORE_SOUND: "/sounds/scoreSound.mp3",

  /*Live Game Emit Freq */
  EMIT_MOVE_LIMIT: 20, //milliseconds

  /* BOT ASSETS */
  BOT_ICON: "/ai.jpeg",
};
