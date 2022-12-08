import { LineBone, RotBones, AlertBones } from "../Objects/Bone.js";
import { battleBoxLineWidth } from "../Objects/BattleBox.js";
import { randomInt, toRad } from "../Constants/GameMath.js";
import { GasterBlaster } from "../Objects/GasterBlaster.js";

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

  AlertBones: {
    right: function(length, time) {
      return new AlertBones(Generator.obj, length, "right", time);
    },

    left: function(length, time) {
      return new AlertBones(Generator.obj, length, "left", time);
    },

    up: function(length, time) {
      return new AlertBones(Generator.obj, length, "up", time);
    },

    down: function(length, time) {
      return new AlertBones(Generator.obj, length, "down", time);
    },
  },

  GasterBlaster: {
    random: function() {
      const x = randomInt(0, Generator.obj.canvas.width);
      const y = randomInt(0, Generator.obj.canvas.height);
      const angle = randomInt(0, 360);

      const tx = randomInt(0, Generator.obj.canvas.width);
      const ty = randomInt(0, Generator.obj.canvas.height);

      const _x = x - Generator.obj.player.x;
      const _y = y - Generator.obj.player.y;
      const nor = Math.sqrt(_x * _x + _y * _y);
  
      const arcCos = Math.acos(_x / nor) / toRad;
      const arcSin = Math.asin(_y / nor) / toRad;
      
      const tangle = (arcSin >= 0) ? arcCos : 360 - arcCos;
      
      return new GasterBlaster(Generator.obj, x, y, angle, tx, ty, tangle);
    }
  }
}

export { Generator };