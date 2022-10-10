import {environment} from "../../../environments/environment";

const baseUrl: string = environment.apiBaseUrl;

export const ApiConfig = {
  frontEndTest: {
    jackpots: () => `${baseUrl}/front-end-test/jackpots.php`,
    games: () => `${baseUrl}/front-end-test/games.php`
  }
};
