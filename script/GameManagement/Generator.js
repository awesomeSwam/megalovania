import { LineBone, BlueLineBone, LineBoneX, RotBones, AlertBones } from "../Objects/Bone.js";
import { battleBoxLineWidth } from "../Objects/BattleBox.js";
import { randomInt, toRad } from "../Constants/GameMath.js";
import { GasterBlaster, GasterBlaster_half, GasterBlasterTornado } from "../Objects/GasterBlaster.js";

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

  LineBone_blue: {
    upLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return new BlueLineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "down");
    },

    upRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return new BlueLineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, -speed, length, "down");
    },

    rightUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return new BlueLineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, speed, length, "left");
    },
    
    rightDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return new BlueLineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "left");
    },

    leftUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return new BlueLineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "right");
    },
    
    leftDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return new BlueLineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, -speed, length, "right");
    },

    downLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return new BlueLineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, speed, length, "up");
    },

    downRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return new BlueLineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "up");
    }
  },

  LineBoneX: {
    upLeft: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return new LineBoneX(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, cycle, min_length, max_length, "down");
    },

    upRight: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return new LineBoneX(Generator.obj, x - LineBonePadding, y + LineBonePadding, -speed, cycle, min_length, max_length, "down");
    },

    rightUp: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return new LineBoneX(Generator.obj, x - LineBonePadding, y + LineBonePadding, speed, cycle, min_length, max_length, "left");
    },
    
    rightDown: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return new LineBoneX(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, cycle, min_length, max_length, "left");
    },

    leftUp: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return new LineBoneX(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, cycle, min_length, max_length, "right");
    },
    
    leftDown: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return new LineBoneX(Generator.obj, x + LineBonePadding, y - LineBonePadding, -speed, cycle, min_length, max_length, "right");
    },

    downLeft: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return new LineBoneX(Generator.obj, x + LineBonePadding, y - LineBonePadding, speed, cycle, min_length, max_length, "up");
    },

    downRight: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return new LineBoneX(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, cycle, min_length, max_length, "up");
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

      const _x = tx - Generator.obj.player.x;
      const _y = ty - Generator.obj.player.y;
      const nor = Math.sqrt(_x * _x + _y * _y);

      const arcCos = Math.acos(_x / nor) / toRad;
      const arcSin = Math.asin(_y / nor) / toRad;
      const tangle = (arcSin >= 0) ? arcCos : 360 - arcCos;

      return new GasterBlaster(Generator.obj, x, y, angle, tx, ty, tangle + 90);
    },

    left: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = 0, y = 0, angle = 0;
      const [tx, ty] = Generator.obj.battleBox.getUpLeft();
      const tangle = 180;

      return new GasterBlaster(Generator.obj, x, y, angle + 90, tx - 50, ty + l * idx, tangle + 90);
    },

    right: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = Generator.obj.canvas.width, y = 0, angle = 180;
      const [tx, ty] = Generator.obj.battleBox.getUpRight();
      const tangle = 0;

      return new GasterBlaster(Generator.obj, x, y, angle + 90, tx + 50, ty + l * idx, tangle + 90);
    },

    leftAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.left(split, i));
      }

      return ret;
    },

    rightAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.right(split, i));
      }

      return ret;
    },

    Tornado: function(loop, cnt, time) {
      return new GasterBlasterTornado(Generator.obj, loop, cnt, time);
    }
  },

  GasterBlaster_half: {
    random: function() {
      const x = randomInt(0, Generator.obj.canvas.width);
      const y = randomInt(0, Generator.obj.canvas.height);
      const angle = randomInt(0, 360);

      const tx = randomInt(0, Generator.obj.canvas.width);
      const ty = randomInt(0, Generator.obj.canvas.height);

      const _x = tx - Generator.obj.player.x;
      const _y = ty - Generator.obj.player.y;
      const nor = Math.sqrt(_x * _x + _y * _y);

      const arcCos = Math.acos(_x / nor) / toRad;
      const arcSin = Math.asin(_y / nor) / toRad;
      const tangle = (arcSin >= 0) ? arcCos : 360 - arcCos;

      return new GasterBlaster_half(Generator.obj, x, y, angle, tx, ty, tangle + 90);
    },

    left: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = 0, y = 0, angle = 0;
      const [tx, ty] = Generator.obj.battleBox.getUpLeft();
      const tangle = 180;

      return new GasterBlaster_half(Generator.obj, x, y, angle + 90, tx - 50, ty + l * idx, tangle + 90);
    },

    right: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = Generator.obj.canvas.width, y = 0, angle = 180;
      const [tx, ty] = Generator.obj.battleBox.getUpRight();
      const tangle = 0;

      return new GasterBlaster_half(Generator.obj, x, y, angle + 90, tx + 50, ty + l * idx, tangle + 90);
    },

    leftAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.left(split, i));
      }

      return ret;
    },

    rightAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.right(split, i));
      }

      return ret;
    },

    Tornado: function(loop, cnt, time) {
      return new GasterBlasterTornado(Generator.obj, loop, cnt, time);
    }
  },
}

export { Generator };