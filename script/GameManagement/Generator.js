import { LineBone, RotBones } from "../Objects/Bone.js";
import { battleBoxLineWidth } from "../Objects/BattleBox.js";
// import { GasterBlaster } from "../Objects/GasterBlaster.js";
import { randomFloat } from "../Constants/GameMath.js";

const LineBonePadding = battleBoxLineWidth / 2 + 2;
const Generator = {
  obj: null,

  LineBone: {
    upLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return new LineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "down");
    },

    upRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return new LineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, -speed, length, "down");
    },

    rightUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return new LineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, speed, length, "left");
    },
    
    rightDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return new LineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "left");
    },

    leftUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return new LineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "right");
    },
    
    leftDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return new LineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, -speed, length, "right");
    },

    downLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return new LineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, speed, length, "up");
    },

    downRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return new LineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "up");
    }
  },

  RotBones: {
    targetPlayer: function() {
      return new RotBones(Generator.obj, Generator.obj.player.x, Generator.obj.player.y);
    }
  },

  GasterBlaster: {
    random: function(obj, ) {
      return new GasterBlaster(obj,
        randomFloat(0, this.canvas.width),
        randomFloat(0, this.canvas.height), angle, x, y, angle);
    }
  }
}

export { Generator };