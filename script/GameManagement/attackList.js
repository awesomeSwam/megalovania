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
  "sans"
];

const listNameObj = {
  gasterBlaster: 0,
  tornado: 1,
  platformer: 2,
  lineBone: 3,
  rotBones: 4,
  alertBones: 5,
  lineBoneX: 6,
  sans: 7
};

const {
  gasterBlaster: _gasterBlaster,
  tornado: _tornado,
  platformer: _platformer,
  lineBone: _lineBone,
  rotBones: _rotBones,
  alertBones: _alertBones,
  lineBoneX: _lineBoneX
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
  constructor (time, cbf, diff, loop) {
    this.time = time;
    this.cbf = cbf;

    this.loop = loop;
    this.diff = diff;
    this.t = 0;
    this.k = 0;
  }

  func (_this) {
    this.loop -= 1; if (this.loop < 0) return null;
    return this.cbf(_this);
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

const newEvent_swing_right = time => new Event(time, "swingAttack_right");
const newEvent_swing_left = time => new Event(time, "swingAttack_left");
const newEvent_swing_up = time => new Event(time, "swingAttack_up");
const newEvent_swing_down = time => new Event(time, "swingAttack_down");

const newEvent_setBoxSizeCenter = (time, param) => new Event(time, "setBoxSize", param); // param [ size ]
const newEvent_setBoxSizeWidthHeight = (time, param) => new Event(time, "setBoxWidthHeight", param); // param [ width, height ]
const newEvent_setBox = (time, param) => new Event(time, "setBox", param) // param [ x1, y1, x2, y2, lerpTime ]

  // new Attack(0, () => Generator.LineBone.downRight(500, 50)),
  // new Attack(0, () => Generator.LineBone.downRight(500, 50)),
  // new Attack(0, () => Generator.LineBone.downRight(500, 50)),
  // new Attack(4, () => Generator.GasterBlaster.leftAll(3)),
  // new Attack(8, () => Generator.GasterBlaster.rightAll(3)),
  
  // newEvent_toBlueState(10),
  // newEvent_toRedState(11),
  // new AttackLoop(12, () => Generator.GasterBlaster.random(), 0.5, 12)

const pattern1 = [
  newEvent_toBlueState(0),
  
  newEvent_setBoxSizeWidthHeight(0, [400, 200]),

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

  // new AttackLoop(9, (this_) => {
  //   let ret = [];
  //   const l = Math.sin(this_.k * 4.5) * 100 + 200;
  //   ret.push(Generator.LineBone.downRight(800, l - 80)[1]);
  //   ret.push(Generator.LineBone.upRight(800, 400 - l - 80)[1]);

  //   return [_lineBone, ret];
  // }, 0.08, 5),

  new Attack(8.6, () => Generator.RotBones.targetPlayer()),

  newEvent_setBox(10, [170, 350, 1110, 650, 0.6]),

  new AttackLoop(10, () => {
    let ret = [];
    ret.push(Generator.LineBone.downRight(650, 125)[1]);
    ret.push(Generator.LineBone.upLeft(650, 125)[1]);

    return [_lineBone, ret];
  }, 0.6, 5),

  newEvent_toBlueState(14.5),
  newEvent_swing_down(14.5),
  
  new Attack(14, () => Generator.AlertBones.up(150, 0.5)),
  new Attack(14.7, () => Generator.AlertBones.down(150, 0.5)),
].sort(cmp);

const attackList = [
  ...pattern1,
];

export { attackList, listName, listNameObj };