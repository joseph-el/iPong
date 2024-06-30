const url = import.meta.env.VITE_URL;

export const PATHS = {
  BACKEND_GAME_PATH: `http://${url}:3000/pongGame`,
  DEFAULT_GAME_PAGE: "/ipong/home?mode=default",
  PRACTICE_MODE: "/ipong/home?mode=practice",
  ONLINE_RANDOM_MODE: "/ipong/home?mode=onlineBattle",
};
