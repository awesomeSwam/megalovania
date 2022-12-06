import { Game } from "./GameManagement/Game.js";
window.onload = () => {
  Game.load("canvas");
  Game.start();
}