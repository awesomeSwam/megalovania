import { Animation } from "../AssetsManagement/Animation.js"
import { Sprite } from "../AssetsManagement/Sprite.js";
import { SpriteSheet } from "../AssetsManagement/SpriteSheet.js";
import { Debugger } from "../Components/Collider.js";
import { KeyListener } from "../InputManagement/KeyListener.js";
import { BattleBox } from "../Objects/BattleBox.js";
import { Heart } from "../Objects/Heart.js";
import { Sans } from "../Objects/Sans.js";
import { Generator } from "./Generator.js";
import { DrawBone } from "../Objects/Bone.js";
import { Sound } from "../AssetsManagement/Sound.js";
import { HP } from "../Objects/hp.js"

import { attackList, listName } from "./attackList.js";
import { Animator } from "../Components/Animator.js";

const s = [
  "do you wanna have a bad time?",
  "(You felt your sins crawling on your back.)",
];

const ending = [
  "so... guess that's it. huh?",
  "just...",
  "don't say i didn't warn you",
]

const Game = {
  canvas: null,
  ctx: null,
  obj: {},

  load: function(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext("2d");

    KeyListener.listenKeyEvent();
    Generator.canvas = this.canvas;
    Animation.ctx = this.ctx;
    Sprite.ctx = this.ctx;
    Debugger.ctx = this.ctx;
    DrawBone.ctx = this.ctx;
    
    SpriteSheet.load();
    Sound.load();

    this.ctx.withinRange = (x, y) => (
      -200 > x || x > this.canvas.width + 200 ||
      -200 > y || y > 960 + 200 );
    this.obj = {
      canvas: this.canvas,
      ctx: this.ctx,
      dt: 0
    };

    this.battleBox = new BattleBox(this.obj);
    this.obj.battleBox = this.battleBox;
    this.player = new Heart(this.obj, this.battleBox, 350);
    this.obj.player = this.player;

    Generator.obj = this.obj;

    this.attackList = attackList;

    this.gasterBlaster = [];
    this.tornado = [];
    this.platformer = [];
    this.sans = new Sans(this.obj);
    this.lineBone = [];
    this.rotBones = [];
    this.alertBones = [];
    this.lineBoneX = [];
    this.lazerBone = [];
    this.dirBone = [];
    this.loop = [];
    this.lineBoneBlue = [];

    this.hp = new HP(this.obj, 100);

    this.state = "sans";

    this.s_state = 0;
    this.s_t = 0;
    this.s_str = "";

    this.ending_state = 0;
    this.ending_t = 0;
    this.ending_str = "";

    this.animator = new Animator(this.ctx);
    this.animator.addAnimation("attack_anim", 0.05);
  },

  start: function() {
    this.gameLoop();
  },

  gameLoop: function() {
    switch (this.state) {
      case "sans":
        this.s();
        break;
      case "game":
        this.game();
        
        if (this.time >= 156) {
          this.state = "ending";
          this.animator.initialize("attack_anim");
          Sound.play("fight");
        }

        break;
      case "ending":
        this.ending();
        break;
      case "dead":
        
        break;
      default:
        break;
    }

    window.requestAnimationFrame(() => this.gameLoop());
  },

  ending: function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.ending_state != 0) {
      this.sans.set_sans_face(6 + this.ending_state);
      this.sans.drawDead();
    } else {
      this.sans.drawStay(0);
    }

    this.ending_update();

    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "48px Undertale Sans";
    this.ctx.fillText(this.ending_str, 640, 350);

    Sprite.drawCenter("heart_red_down", 640, 600);
  },

  ending_update: function() {
    const now = Date.now();
    const dt = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;

    if (this.ending_state == 0) {
      if (this.animator.update(dt)) {
        this.ending_state++;
      }

      this.animator.playCenter(this.sans.x, this.sans.y - 100);
      return ;
    }

    if (this.ending_state - 1 >= ending.length) {
      if (KeyListener.any) {
        this.state = "end";
      }

      return ;
    }

    if (this.ending_t > 0) {
      this.ending_t = Math.max(0, this.ending_t - dt);
      return ;
    }

    if (this.ending_str.length < ending[this.ending_state - 1].length) {
      Sound.play("speak");
      this.ending_str += ending[this.ending_state - 1][this.ending_str.length];
      this.ending_t = 0.02;
      return ;
    }

    if (KeyListener.any) {
      this.ending_str = "";
      this.ending_state++;
    }
  },

  dead: function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },

  s: function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.sans.drawStay((this.s_state == 0) ? 4 : 6);

    this.s_update();

    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "48px Undertale Sans";
    this.ctx.fillText(this.s_str, 640, 350);

    Sprite.drawCenter("heart_red_down", 640, 600);
  },

  s_update: function() {
    const now = Date.now();
    const dt = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;

    if (this.s_state >= s.length) {
      if (KeyListener.any) {
        this.state = "game";
        
        this.obj.dt = 0;
        this.lastUpdate = Date.now();
        this.time = 0;
  
        Sound.play("megalovania");
      }

      return ;
    }

    if (this.s_t > 0) {
      this.s_t = Math.max(0, this.s_t - dt);
      return ;
    }

    if (this.s_str.length < s[this.s_state].length) {
      Sound.play("speak");
      this.s_str += s[this.s_state][this.s_str.length];
      this.s_t = 0.02;
      return ;
    }

    if (KeyListener.any) {
      this.s_str = "";
      this.s_state++;
    }
  },

  game: function() {
    const now = Date.now();
    this.obj.dt = (now - this.lastUpdate) / 1000;
    this.lastUpdate = now;

    this.time += this.obj.dt;

    this.updateAttackList();
    this.update();
    this.draw();

    if (this.hp.kr <= 1) {
      location.href = "game-over.html"
      this.state = "dead";
      Howler.stop();
    }
  },

  updateAttackList: function() {
    let x = 0;
    for (let i = 0; i < this.attackList.length; i++) {
      if (this.time < this.attackList[i].time) break;
      const a = this.attackList[i]; x++;

      if (a.isEvent) {
        if (a.param == null) {
          this.sans[a.func]();
        } else {
          this.sans[a.func](...a.param);
        }
        continue;
      }
      
      if (!a.isAttack) {
        this.loop.push(a);
        continue;
      }

      const [b, c] = a.func(a);

      if (Array.isArray(c)) {
        for (let d of c) this[listName[b]].push(d);
        continue;
      }
      
      this[listName[b]].push(c);
    }

    this.attackList.splice(0, x);

    this.loop.filter(p => {
      p.t += this.obj.dt;
      
      if (p.t < p.diff) return false;

      p.t -= p.diff;
      const a = p.func(p);

      if (a == null) return true;

      const [b, c] = a;
      if (Array.isArray(c)) {
        for (let d of c) this[listName[b]].push(d);
        return false;
      }
      
      this[listName[b]].push(c);
    });
  },

  update: function() {
    this.battleBox.update();
    this.sans.update();
    this.player.update();

    this.lineBoneBlue = this.lineBoneBlue.filter(p => !p.update());
    this.lineBone = this.lineBone.filter(p => !p.update());
    this.rotBones = this.rotBones.filter(p => !p.update());
    this.alertBones = this.alertBones.filter(p => !p.update());
    this.gasterBlaster = this.gasterBlaster.filter(p => !p.update());
    this.lineBoneX = this.lineBoneX.filter(p => !p.update());
    this.tornado = this.tornado.filter(p => !p.update());
    this.platformer = this.platformer.filter(p => !p.update());
    this.lazerBone = this.lazerBone.filter(p => !p.update());
    this.dirBone = this.dirBone.filter(p => !p.update());

    this.hp.isCollision = this.check();
    this.hp.update();
  },

  draw: function() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.lineBoneBlue.forEach(p => p.draw());
    this.lineBone.forEach(p => p.draw());
    this.lineBoneX.forEach(p => p.draw());
    this.alertBones.forEach(p => p.draw());
    this.platformer.forEach(p => p.draw());
    
    this.battleBox.draw();
    
    this.hp.draw();
    this.sans.draw();
    this.player.draw();
    this.alertBones.forEach(p => p.drawAlert());
    this.rotBones.forEach(p => p.draw());
    this.gasterBlaster.forEach(p => p.draw());
    this.tornado.forEach(p => p.draw());
    this.lazerBone.forEach(p => p.draw());
    this.dirBone.forEach(p => p.draw());
  },

  check: function() {
    const arr = ["lineBone", "lineBoneX", "alertBones", "rotBones", "gasterBlaster", "tornado", "lazerBone", "dirBone"];
    let b = false;

    arr.forEach(x => {
      this[x].forEach(y => {
        if (y.check()) b = true;
      });
    });

    this.lineBoneBlue.forEach(p => {
      if (p.check() && this.player.moved) {
        b = true;
      }
    })

    return b;
  }
}

export { Game };