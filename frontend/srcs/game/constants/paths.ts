import { env } from "process";

export const PATHS = {
  BACKEND_GAME_PATH: env.BACKEND_URL + "/pongGame",
  DEFAULT_GAME_PAGE: "/ipong/home?mode=default",
  PRACTICE_MODE: "/ipong/home?mode=practice",
  ONLINE_RANDOM_MODE: "/ipong/home?mode=onlineBattle",
};
