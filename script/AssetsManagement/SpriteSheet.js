import { Animation } from "./Animation.js";
import { Sprite } from "./Sprite.js";
import { gameSpriteSheetData_json } from "../Constants/spriteSheetData.js";

const SpriteSheet = {
  spriteSheets: { },

  load: function() {
    for (const [spriteSheet, json] of Object.entries(gameSpriteSheetData_json)) {
      this.spriteSheets[spriteSheet] = new Image();
      this.spriteSheets[spriteSheet].src = `./image/${spriteSheet}.png`;

      for (const [key, data] of Object.entries(json)) {
        const s = this.spriteSheets[spriteSheet];
        if (data[4] == 1) {
          Sprite.addSprite(s, key, data);
        } else {
          Animation.addAnimation(s, key, data, ((data[4] < 0) ? true : false));
        }
      }
    }
  }
}

export { SpriteSheet };