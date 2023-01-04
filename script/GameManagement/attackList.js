import { randomInt } from "../Constants/GameMath.js";
import { Generator } from "./Generator.js";

const cmp = (a, b) => a.time - b.time;

const listName = [
  "gasterBlaster",
  "tornado",
  "platformer",
  "lineBone",
  "rotBones",
  "alertBones",
  "lineBoneX",
  "sans",
  "lazerBone",
  "dirBone",
  "lineBoneBlue"
];

const listNameObj = {
  gasterBlaster: 0,
  tornado: 1,
  platformer: 2,
  lineBone: 3,
  rotBones: 4,
  alertBones: 5,
  lineBoneX: 6,
  sans: 7,
  lazerBone: 8,
  dirBone: 9,
  lineBoneBlue: 10,
};

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
  lineBoneBlue: _lineBone_blue,
} = listNameObj;

class Attack {
  constructor (time, cbf) {
    this.isAttack = true;
    this.time = time;
    this.cbf = cbf;
  }

  func () {
    return this.cbf();
  }
}

class AttackLoop {
  constructor (time, cbf, diff, loop, init = null) {
    this.time = time;
    this.cbf = cbf;

    this.loop = loop;
    this.diff = diff;
    this.t = 0;

    if (init != null) {
      init(this);
    }
  }

  func (this_) {
    this.loop -= 1; if (this.loop < 0) return null;
    return this.cbf(this_);
  }
}

class Event {
  constructor (time, func, param = null) {
    this.isEvent = true;
    this.time = time;
    this.func = func;
    this.param = param;
  }
}

const newEvent_toBlueState = time => new Event(time, "toBlueState");
const newEvent_toRedState = time => new Event(time, "toRedState");
const newEvent_toRightState = time => new Event(time, "toRightState");

const newEvent_swing_right = time => new Event(time, "swingAttack_right");
const newEvent_swing_left = time => new Event(time, "swingAttack_left");
const newEvent_swing_up = time => new Event(time, "swingAttack_up");
const newEvent_swing_down = time => new Event(time, "swingAttack_down");

const newEvent_set_sans_face = (time, param) => new Event(time, "set_sans_face", param);
const newEvent_tp = (time, param) => new Event(time, "tp", param);
const newEvent_lerp = (time, param) => new Event(time, "lerp", param);

const newEvent_setSweat = (time, param) => new Event(time, "setSweat", param);

const newEvent_setBoxSizeCenter = (time, param) => new Event(time, "setBoxSize", param); // param [ size ]
const newEvent_setBoxSizeWidthHeight = (time, param) => new Event(time, "setBoxWidthHeight", param); // param [ width, height ]
const newEvent_setBox = (time, param) => new Event(time, "setBox", param) // param [ x1, y1, x2, y2, lerpTime ]
const newEvent_right_moveTo = (time, param) => new Event(time, "right_moveTo", param); // param [ x, y, lerpTime ]

  // new Attack(0, () => Generator.LineBone.downRight(500, 50)),
  // new Attack(0, () => Generator.LineBone.downRight(500, 50)),
  // new Attack(0, () => Generator.LineBone.downRight(500, 50)),
  // new Attack(4, () => Generator.GasterBlaster.leftAll(3)),
  // new Attack(8, () => Generator.GasterBlaster.rightAll(3)),
  
  // newEvent_toBlueState(10),
  // newEvent_toRedState(11),
  // new AttackLoop(12, () => Generator.GasterBlaster.random(), 0.5, 12)

const pattern1 = [
  new AttackLoop(0, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(500, 25)[1]);
    ret.push(Generator.LineBone.downLeft(500, 25)[1]);
    ret.push(Generator.LineBone.upRight(500, 260)[1]);
    ret.push(Generator.LineBone.upLeft(500, 260)[1]);

    return [_lineBone, ret];
  }, 0.8, 2),
  
  new Attack(3.2, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(500, 175)[1]);
    ret.push(Generator.LineBone.downLeft(500, 175)[1]);
    ret.push(Generator.LineBone.upRight(500, 110)[1]);
    ret.push(Generator.LineBone.upLeft(500, 110)[1]);

    return [_lineBone, ret];
  }),

  new AttackLoop(3.7, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(600, 260)[1]);
    ret.push(Generator.LineBone.downLeft(600, 260)[1]);
    ret.push(Generator.LineBone.upRight(600, 25)[1]);
    ret.push(Generator.LineBone.upLeft(600, 25)[1]);

    return [_lineBone, ret];
  }, 0.75, 2),

  newEvent_swing_up(4.2),

  new AttackLoop(6.6, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(800, 110)[1]);
    ret.push(Generator.LineBone.downLeft(800, 110)[1]);
    ret.push(Generator.LineBone.upRight(800, 175)[1]);
    ret.push(Generator.LineBone.upLeft(800, 175)[1]);
    
    return [_lineBone, ret];
  }, 0.2, 6),

  newEvent_swing_right(7.4),

  new Attack(7.5, () => Generator.AlertBones.left(200, 1)),

  newEvent_toRedState(8.6),

  newEvent_setBox(8.8, [170, 350, 1110, 650, 0.3]),

  new AttackLoop(8 , () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(650, 125)[1]);
    ret.push(Generator.LineBone.upLeft(650, 125)[1]);

    return [_lineBone, ret];
  }, 0.6, 4),

  newEvent_toBlueState(11.3),
  newEvent_swing_down(11.3),
  
  new Attack(11, () => Generator.AlertBones.up(150, 0.5)),
  new Attack(11.7, () => Generator.AlertBones.down(150, 0.5)),

  new AttackLoop(12, (this_) => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(800, this_.l - 70)[1]);
    ret.push(Generator.LineBone.upRight(800, 300 - this_.l - 70)[1]);
    this_.l += 40;
    return [_lineBone, ret];
  }, 0.8, 4, (this_) => {
    this_.l = 80;
  }),

  newEvent_swing_up(14.6),

  newEvent_swing_down(16.2),
  newEvent_toRedState(16.6),

  newEvent_setBox(16, [440, 280, 840, 680, 0.3]),
].sort(cmp);
pattern1.forEach(v => v.time += 2);

const pattern2 = [
  // new AttackLoop(0.1, () => Generator.LazerBone.toPlayer(), 0.5, 3),  
  
  // new Attack(2, () => {
  //   let ret = [];
  //   ret.push(Generator.LazerBone.toPlayer()
  // }),

  new Attack(0, () => Generator.DirBone.slice(...Generator.obj.battleBox.getUpRight(), 90, 8, 500)),
  new Attack(1, () => Generator.DirBone.slice(...Generator.obj.battleBox.getUpLeft(), 0, 8, 500)),
  new Attack(2, () => Generator.DirBone.slice(...Generator.obj.battleBox.getDownLeft(), 270, 8, 500)),
  new Attack(3, () => Generator.DirBone.slice(...Generator.obj.battleBox.getDownRight(), 180, 8, 500)),

  new Attack(4, () => Generator.AlertBones.up(300, 0.5)),

  newEvent_toBlueState(5.5),
  newEvent_swing_down(5.5),
  newEvent_setBox(5.5, [170, 400, 1110, 800, 0.3]),

  new AttackLoop(6.5, () => Generator.LineBone.downRight(200, 50), 0.1, 100),

  new Attack(7.4, () => Generator.LineBone.downRight(500, 120)),
  new Attack(8.2, () => Generator.LineBone.upLeft(500, 120)),
  new Attack(10, () => Generator.LineBone.downLeft(500, 260)),
  new Attack(7.4, () => Generator.Platformer.platformerTime(1280, 680, 0, 680, 3)),
  new Attack(9.2, () => Generator.Platformer.platformerTime(1280, 650, 0, 650, 3)),
  new Attack(8.4, () => Generator.LineBone.downRight(700, 160)),
  new Attack(10.5, () => Generator.Platformer.platformerTime(1280, 500, 0, 500, 4)),
  new Attack(12.2, () => Generator.LineBone_blue.upRight(800, 200)),
  new Attack(14.2, () => Generator.LineBone.upRight(400, 50)),
  new Attack(12, () => Generator.Platformer.platformerTime(1280, 600, 0, 600, 4)),
  new Attack(14, () => Generator.Platformer.platformerTime(1280, 700, 0, 700, 4)),
  new Attack(16.2, () => Generator.LineBone.upRight(1000, 180)),
  new Attack(17.2, () => Generator.LineBone.downRight(500, 200)),

  new AttackLoop(16, () => Generator.RotBones.targetPlayer(), 1.5, 3),
  
  new AttackLoop(20.5, () => Generator.LineBone_blue.downLeft(500, 200), 1.5, 2),
  new AttackLoop(20, () => Generator.LineBone.downLeft(500, 50), 1.5, 2),

  newEvent_swing_left(25.5),
  newEvent_setBox(25.5, [170, 200, 470, 800, 0.3]),
  newEvent_lerp(25.5, [800, 400, 0.3]),
  newEvent_swing_down(26),
  
  new Attack(26, () => Generator.AlertBones.up(100, 0.5)),
  new Attack(26, () => Generator.GasterBlaster_half.new(220, -100, 180, 220, 120, 0)),
  new Attack(27, () => Generator.GasterBlaster.new(320, -100, 180, 320, 120, 0)),
  new Attack(26, () => Generator.GasterBlaster_half.new(420, -100, 180, 420, 120, 0)),

  newEvent_setBox(29, [800, 300, 1000, 500, 0.6]),
  newEvent_lerp(29, [400, 400, 0.6]),
  new Attack(29.6, () => Generator.DirBone.slice(...Generator.obj.battleBox.getUpRight(), 90, 4, 700)),

  new AttackLoop(30, (this_) => Generator.AlertBones.up(this_.l += 25, 0.5), 0.3, 4, (this_) => this_.l = 10),
  newEvent_setBox(32, [800, 300, 1000, 850, 0.3]),
  newEvent_lerp(32, [640, 250, 0.3]),
  newEvent_swing_down(32.5),

  new AttackLoop(32.3, () => Generator.LazerBone.toPlayer(), 0.8, 3),
  new AttackLoop(35, () => Generator.LazerBone.toPlayerDouble(), 0.8, 3),

  newEvent_swing_left(38.2),
  newEvent_setBox(38.5, [170, 350, 1110, 850, 0.3]),

  new Attack(39, () => Generator.AlertBones.right(220, 0.5)),
  newEvent_toRedState(39.5),

  new AttackLoop(40, () => Generator.GasterBlaster_half.random(), 0.5, 20),

  new AttackLoop(52, () => Generator.LineBoneX.downRight(400, 10, 20, 80), 0.3, 33),
  new AttackLoop(52, () => Generator.LineBoneX.upRight(400, 10, 20, 80), 0.3, 33),
  new AttackLoop(52, () => Generator.RotBones.targetPlayer(), 0.8, 12),
].sort(cmp);
pattern2.forEach(v => v.time += 16.5 + 2);

const pattern3 = [
  newEvent_lerp(0.1, [-500, 250, 0.9]),
  newEvent_tp(1, [1500, 250]),
  newEvent_set_sans_face(1, [1]),
  newEvent_lerp(1.1, [-500, 250, 1.8]),
  newEvent_tp(3, [1500, 250]),
  newEvent_set_sans_face(3, [2]),
  newEvent_lerp(3.1, [-500, 250, 1.8]),
  newEvent_tp(5, [1500, 250]),
  newEvent_set_sans_face(5, [3]),
  newEvent_lerp(5.1, [-500, 250, 1.8]),
  newEvent_tp(7, [1500, 250]),
  newEvent_set_sans_face(7, [4]),
  newEvent_lerp(7.1, [-500, 250, 1.8]),
  newEvent_tp(9, [1500, 250]),
  newEvent_set_sans_face(9, [5]),
  newEvent_lerp(9.1, [-500, 250, 1.8]),
  newEvent_tp(11, [1500, 250]),
  newEvent_set_sans_face(11, [0]),
  newEvent_lerp(11.1, [640 - 500, 250, 1.4]),
  newEvent_lerp(12.51, [640, 250, 0.7]),

  newEvent_setBox(0, [-10, 400, 1290, 700, 0.4]),
  newEvent_swing_right(0),
  newEvent_toRightState(0.5),
  newEvent_right_moveTo(0.5, [100, 550, 0.5]),
  new Attack(1.5, () => Generator.GasterBlaster_half.new(0, 420, -90, 1000, 420, 90)),
  new Attack(0.5, () => Generator.GasterBlaster.new(0, 550, -90, 1000, 550, 90)),
  new Attack(1.5, () => Generator.GasterBlaster_half.new(0, 680, -90, 1000, 680, 90)),
  new Attack(3, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(1000, 130)[1]);
    ret.push(Generator.LineBone.upRight(1000, 60)[1]);

    return [_lineBone, ret];
  }),
  new Attack(4.5, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(1000, 60)[1]);
    ret.push(Generator.LineBone.upRight(1000, 130)[1]);

    return [_lineBone, ret];
  }),
  new Attack(5.2, () => Generator.LineBone_blue.downLeft(800, 262)),
  new AttackLoop(6, (this_) => {
    let ret = [];
    const l = Math.sin(this_.l * 6.5) * 50 + 150;
    ret.push(Generator.LineBone.downRight(800, l - 65)[1]);
    ret.push(Generator.LineBone.upRight(800, 300 - l - 65)[1]);

    this_.l += 0.05;
    return [_lineBone, ret];
  }, 0.05, 100, (this_) => this_.l = 0),
  new Attack(5, () => Generator.GasterBlaster_half.new(-100, 420, 90, 100, 520, -90)),
  new Attack(5, () => Generator.GasterBlaster_half.new(-100, 680, 90, 100, 680, -90)),
  new AttackLoop(12, () => Generator.GasterBlaster.random(), 0.5, 3),
  newEvent_setBox(13, [-10, 400, 1000, 700, 0.4]),
  newEvent_toBlueState(13),
  newEvent_swing_right(13),
  newEvent_toRedState(14.8),
  new Attack(14, () => Generator.AlertBones.left(180, 0.5)),
  newEvent_setBox(15, [170, 300, 1110, 800, 0.3]),
  newEvent_setSweat(15, [1]),
  new Attack(16, () => Generator.GasterBlaster_half.Tornado(2, 36, 3)),
  new Attack(22, () => Generator.GasterBlaster_half.TornadoReverse(2, 36, 3)),
  newEvent_setSweat(15, [2]),
].sort(cmp);
pattern3.forEach(v => v.time += 81 + 2);

const dir = [
  "up",
  "left",
  "down",
  "right"
];

const pattern4 = [
  newEvent_toBlueState(0),
  newEvent_setBox(0, [390, 300, 890, 800, 0.3]),
  newEvent_setSweat(10, [3]),
];

for (let i = 0; i < 24; i++) {
  const t = randomInt(0, 3);
  const a = dir[t];
  const b = dir[(t < 2) ? t + 2 : t - 2];
  pattern4.push(new Event(i * 1.15, `swingAttack_${a}`)),
  pattern4.push(new Attack(i * 1.15, () => Generator.AlertBones[b](150, 0.3)))
}

pattern4.forEach(v => v.time += 112 + 2);

const attackList = [
  newEvent_toBlueState(0),
  newEvent_setBoxSizeWidthHeight(0, [400, 200]),
  ...pattern1,
  ...pattern2,
  ...pattern3,
  ...pattern4
].sort(cmp);

export { attackList, listName, listNameObj };