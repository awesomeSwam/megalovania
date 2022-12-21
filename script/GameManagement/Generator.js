import { LineBone, BlueLineBone, LineBoneX, RotBones, AlertBones, LazerBone, DirBone } from "../Objects/Bone.js";
import { battleBoxLineWidth } from "../Objects/BattleBox.js";
import { randomInt, toRad } from "../Constants/GameMath.js";
import { GasterBlaster, GasterBlaster_half, GasterBlasterTornado } from "../Objects/GasterBlaster.js";
import { Platformer } from "../Objects/Platformer.js";
import { listNameObj } from "./attackList.js";

const {
  gasterBlaster: _gasterBlaster,
  tornado: _tornado,
  platformer: _platformer,
  lineBone: _lineBone,
  rotBones: _rotBones,
  alertBones: _alertBones,
  lineBoneX: _lineBoneX,
  lazerBone: _lazerBone,
  dirBone: _dirBone,
  lineBoneBlue: _lineBone_blue
} = listNameObj;

const LineBonePadding = battleBoxLineWidth / 2 + 2;
const Generator = {
  obj: null,

  LineBone: {
    upLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return [_lineBone, new LineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "down")];
    },

    upRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return [_lineBone, new LineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, -speed, length, "down")];
    },

    rightUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return [_lineBone, new LineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, speed, length, "left")];
    },
    
    rightDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return [_lineBone, new LineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "left")];
    },

    leftUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return [_lineBone, new LineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "right")];
    },
    
    leftDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return [_lineBone, new LineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, -speed, length, "right")];
    },

    downLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return [_lineBone, new LineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, speed, length, "up")];
    },

    downRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return [_lineBone, new LineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "up")];
    }
  },

  LineBone_blue: {
    upLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "down")];
    },

    upRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, -speed, length, "down")];
    },

    rightUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x - LineBonePadding, y + LineBonePadding, speed, length, "left")];
    },
    
    rightDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "left")];
    },

    leftUp: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, length, "right")];
    },
    
    leftDown: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, -speed, length, "right")];
    },

    downLeft: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x + LineBonePadding, y - LineBonePadding, speed, length, "up")];
    },

    downRight: function(speed, length = 20) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return [_lineBone_blue, new BlueLineBone(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, length, "up")];
    }
  },

  LineBoneX: {
    upLeft: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return [_lineBoneX, new LineBoneX(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, cycle, min_length, max_length, "down")];
    },

    upRight: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return [_lineBoneX, new LineBoneX(Generator.obj, x - LineBonePadding, y + LineBonePadding, -speed, cycle, min_length, max_length, "down")];
    },

    rightUp: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpRight();
      return [_lineBoneX, new LineBoneX(Generator.obj, x - LineBonePadding, y + LineBonePadding, speed, cycle, min_length, max_length, "left")];
    },
    
    rightDown: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return [_lineBoneX, new LineBoneX(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, cycle, min_length, max_length, "left")];
    },

    leftUp: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getUpLeft();
      return [_lineBoneX, new LineBoneX(Generator.obj, x + LineBonePadding, y + LineBonePadding, speed, cycle, min_length, max_length, "right")];
    },
    
    leftDown: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return [_lineBoneX, new LineBoneX(Generator.obj, x + LineBonePadding, y - LineBonePadding, -speed, cycle, min_length, max_length, "right")];
    },

    downLeft: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownLeft();
      return [_lineBoneX, new LineBoneX(Generator.obj, x + LineBonePadding, y - LineBonePadding, speed, cycle, min_length, max_length, "up")];
    },

    downRight: function(speed, cycle, min_length, max_length) {
      const [x, y] = Generator.obj.battleBox.getDownRight();
      return [_lineBoneX, new LineBoneX(Generator.obj, x - LineBonePadding, y - LineBonePadding, -speed, cycle, min_length, max_length, "up")];
    }
  },

  RotBones: {
    targetPlayer: function() {
      return [_rotBones, new RotBones(Generator.obj, Generator.obj.player.x, Generator.obj.player.y)];
    }
  },

  AlertBones: {
    right: function(length, time) {
      return [_alertBones, new AlertBones(Generator.obj, length, "right", time)];
    },

    left: function(length, time) {
      return [_alertBones, new AlertBones(Generator.obj, length, "left", time)];
    },

    up: function(length, time) {
      return [_alertBones, new AlertBones(Generator.obj, length, "up", time)];
    },

    down: function(length, time) {
      return [_alertBones, new AlertBones(Generator.obj, length, "down", time)];
    },
  },

  GasterBlaster: {
    new: function(x, y, angle, tX, tY, tAngle) {
      return [_gasterBlaster, new GasterBlaster(Generator.obj, x, y, angle, tX, tY, tAngle)];
    },

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

      return [_gasterBlaster, new GasterBlaster(Generator.obj, x, y, angle, tx, ty, tangle + 90)];
    },

    left: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = 0, y = 0, angle = 0;
      const [tx, ty] = Generator.obj.battleBox.getUpLeft();
      const tangle = 180;

      return [_gasterBlaster, new GasterBlaster(Generator.obj, x, y, angle + 90, tx - 50, ty + l * idx, tangle + 90)];
    },

    right: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = Generator.obj.canvas.width, y = 0, angle = 180;
      const [tx, ty] = Generator.obj.battleBox.getUpRight();
      const tangle = 0;

      return [_gasterBlaster, new GasterBlaster(Generator.obj, x, y, angle + 90, tx + 50, ty + l * idx, tangle + 90)];
    },

    leftAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.left(split, i)[1]);
      }

      return [_gasterBlaster, ret];
    },

    rightAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.right(split, i)[1]);
      }

      return [_gasterBlaster, ret];
    },

    up: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].x - Generator.obj.battleBox.points[0].x) / split;
      const x = 0, y = 0, angle = 0;
      const [tx, ty] = Generator.obj.battleBox.getUpLeft();
      const tangle = -90;

      return [_gasterBlaster, new GasterBlaster(Generator.obj, x, y, angle + 90, tx + l * idx, ty - 50, tangle + 90)];
    },

    down: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].x - Generator.obj.battleBox.points[0].x) / split;
      const x = Generator.obj.canvas.width, y = Generator.obj.canvas.height, angle = 180;
      const [tx, ty] = Generator.obj.battleBox.getDownRight();
      const tangle = 90;

      return [_gasterBlaster, new GasterBlaster(Generator.obj, x, y, angle + 90, tx - l * idx, ty + 50, tangle + 90)];
    },

    upAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.up(split, i)[1]);
      }

      return [_gasterBlaster, ret];
    },

    downAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.down(split, i)[1]);
      }

      return [_gasterBlaster, ret];
    },

    Tornado: function(loop, cnt, time) {
      return [_tornado, new GasterBlasterTornado(Generator.obj, loop, cnt, time)];
    }
  },

  GasterBlaster_half: {
    new: function(x, y, angle, tX, tY, tAngle) {
      return [_gasterBlaster, new GasterBlaster_half(Generator.obj, x, y, angle, tX, tY, tAngle)];
    },
    
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

      return [_gasterBlaster, new GasterBlaster_half(Generator.obj, x, y, angle, tx, ty, tangle + 90)];
    },

    left: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = 0, y = 0, angle = 0;
      const [tx, ty] = Generator.obj.battleBox.getUpLeft();
      const tangle = 180;

      return [_gasterBlaster, new GasterBlaster_half(Generator.obj, x, y, angle + 90, tx - 50, ty + l * idx, tangle + 90)];
    },

    right: function(split, idx) {
      const l = (Generator.obj.battleBox.points[1].y - Generator.obj.battleBox.points[0].y) / split;
      const x = Generator.obj.canvas.width, y = 0, angle = 180;
      const [tx, ty] = Generator.obj.battleBox.getUpRight();
      const tangle = 0;

      return [_gasterBlaster, new GasterBlaster_half(Generator.obj, x, y, angle + 90, tx + 50, ty + l * idx, tangle + 90)];
    },

    leftAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.left(split, i)[1]);
      }

      return [_gasterBlaster, ret];
    },

    rightAll: function(split) {
      let ret = []; split--;
      for (let i = 0; i <= split; i++) {
        ret.push(this.right(split, i)[1]);
      }

      return [_gasterBlaster, ret];
    },

    Tornado: function(loop, cnt, time) {
      return [_tornado, new GasterBlasterTornado(Generator.obj, loop, cnt, time)];
    },

    TornadoReverse: function(loop, cnt, time) {
      return [_tornado, new GasterBlasterTornado(Generator.obj, loop, cnt, time, true)];
    }
  },

  Platformer: {
    platformer: function(fromX, fromY, toX, toY) {
      return [_platformer, new Platformer(Generator.obj, fromX, fromY, toX, toY)];
    },

    platformerTime: function(fromX, fromY, toX, toY, lerpTime) {
      return [_platformer, new Platformer(Generator.obj, fromX, fromY, toX, toY, lerpTime)];
    }
  }, 

  LazerBone: {
    lazerBone: function(x) {
      return [_lazerBone, new LazerBone(Generator.obj, x)];
    },

    random: function() {
      return [_lazerBone, new LazerBone(Generator.obj, randomInt(Generator.obj.battleBox.points[0].x + 30, Generator.obj.battleBox.points[1].x - 30))];
    },

    toPlayer: function() {
      return [_lazerBone, new LazerBone(Generator.obj, Generator.obj.player.x)];
    },

    toPlayerDouble: function() {
      return [_lazerBone, [new LazerBone(Generator.obj, Generator.obj.player.x - 15), new LazerBone(Generator.obj, Generator.obj.player.x + 15)]];
    },
  },

  DirBone: {
    point: function(x, y, angle, speed) {
      return [_dirBone, new DirBone(Generator.obj, x, y, angle, speed)];
    },
    slice: function(x, y, angle, slice, speed) {
      const a = 90 / (slice + 1);
      let ret = [];

      for (let i = 0; i < slice; i++) {
        angle += a;
        ret.push(new DirBone(Generator.obj, x, y, angle, speed));
      }

      return [_dirBone, ret];
    }
  }
};

export { Generator };