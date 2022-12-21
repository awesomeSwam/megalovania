import { KeyListener } from "../InputManagement/KeyListener.js";
import { Sprite } from "../AssetsManagement/Sprite.js";
import { battleBoxLineWidth } from "./BattleBox.js";
import { Debugger, Collider } from "../Components/Collider.js";
import { Sound } from "../AssetsManagement/Sound.js";
import { lerp } from "../Constants/GameMath.js";

const moveDir = {
  a: -1,
  d: 1,
  w: -1,
  s: 1
};

const right_moveDir = {
  w: -1,
  s: 1
}

const heart_size = 16;

const red_speed = 400;

const blue_vSpeed = 460;
const blue_gravity = 440;
const blue_hSpeed = 300;

const right_speed = 200;

const padding = heart_size + battleBoxLineWidth / 2;

const upperKey = {
  right: "a",
  left: "d",
  up: "s",
  down: "w"
};

class Heart {
  constructor(obj) {
    this.obj = obj;
    this.ctx = obj.ctx;
    this.battleBox = obj.battleBox;

    [this.x, this.y] = this.battleBox.getCenter();
 
    this.collider = new Collider(this, heart_size - 6, heart_size - 6, heart_size - 6, heart_size - 6);
    this.platformerCollider = new Collider(this, heart_size, heart_size, heart_size, heart_size);

    this.moved = false;

    this.state = "red";

    /* soul state */
    this.blue_jumping = false;
    this.blue_velocity = 0;
    this.blue_state = "down";
    this.blue_onPlatformer = false;
    this.blue_slam = false;
  }

  changeState(state) {
    this.state = state;
    if (state == "blue") {
      this.blue_jumping = false;
      this.blue_velocity = 0;
      this.blue_state = "down";
      this.blue_onPlatformer = false;
    }

    if (state == "right") {
      this.right_moving = false;
    }

    Sound.play("ding");
  }

  update() {
    this.moved = false;
    switch (this.state) {
      case "blue": this.moveBlue(); break;
      case "red": this.moveRed(); break;
      case "right": this.moveRight(); break;
      default: break;
    }
  }

  changeBlueState(state) {
    this.blue_state = state;
    this.blue_velocity = -1000;
    this.blue_jumping = false;
    this.blue_slam = true;
  }

  inRange() {
    [this.x, this.y] = this.battleBox.withinRange(this.x, this.y, heart_size);
  }

  moveRed() {
    const hState = KeyListener.keys.horizontal.state;
    const vState = KeyListener.keys.vertical.state;
    const h = KeyListener.keys.horizontal[hState];
    const v = KeyListener.keys.vertical[vState];

    if (h || v) {
      const dx = h ? moveDir[hState] : 0;
      const dy = v ? moveDir[vState] : 0;
      const nordt = this.obj.dt * red_speed / Math.sqrt(dx * dx + dy * dy);
      this.x += dx * nordt;
      this.y += dy * nordt;

      this.moved = true;
    }

    this.inRange();
  }

  moveBlue() {
    const hState = KeyListener.keys.horizontal.state;
    const vState = KeyListener.keys.vertical.state;

    if (this.blue_state == "up" || this.blue_state == "down") {
      const h = KeyListener.keys.horizontal[hState];
      const v = KeyListener.keys.vertical[vState] && vState == upperKey[this.blue_state];

      const isUp = this.blue_state == "up";

      if (h) {
        this.x += moveDir[hState] * blue_hSpeed * this.obj.dt;
        this.moved = true;
      }

      const isGrounded = Math.floor(this.y) == Math.floor(isUp ? this.battleBox.points[0].y + padding : this.battleBox.points[1].y - padding);
      if (isGrounded && this.blue_slam) { Sound.play("slam"); this.blue_slam = false; }
      if (isGrounded) this.blue_jumping = false;

      if (v) {
        if (isGrounded || this.blue_onPlatformer) {
          this.blue_velocity = blue_vSpeed;
          this.blue_jumping = true;
        }
      } else {
        if (this.blue_velocity > 0) {
          this.blue_velocity = 0;
          this.blue_jumping = false;
        }
      }
      
      this.blue_velocity -= blue_gravity * this.obj.dt;
      this.y += this.blue_velocity * this.obj.dt * (isUp ? 1 : -1);
    } else {
      const v = KeyListener.keys.vertical[vState];
      const h = KeyListener.keys.horizontal[hState] && hState == upperKey[this.blue_state];

      const isLeft = this.blue_state == "left";

      if (v) {
        this.y += moveDir[vState] * blue_vSpeed * this.obj.dt;
        this.moved = true;
      }
      
      const isGrounded = Math.floor(this.x) == Math.floor(isLeft ? this.battleBox.points[0].x + padding : this.battleBox.points[1].x - padding);
      if (isGrounded && this.blue_slam) { Sound.play("slam"); this.blue_slam = false; }
      if (isGrounded) this.blue_jumping = false;
      
      if (h) {
        if (isGrounded || this.blue_onPlatformer) {
          this.blue_velocity = blue_vSpeed;
          this.blue_jumping = true;
        }
      } else {
        if (this.blue_velocity > 0) {
          this.blue_velocity = 0;
          this.blue_jumping = false;
        }
      }

      this.blue_velocity -= blue_gravity * this.obj.dt;
      this.x += this.blue_velocity * this.obj.dt * (isLeft ? 1 : -1);
    }

    if (this.blue_velocity < 0) {
      this.blue_jumping = false;
    }

    if (this.blue_jumping) {
      this.moved = true;
    }

    this.inRange();
    this.blue_onPlatformer = false;
  }

  moveRight() {
    if (this.right_moving) {
      this.right_currentLerpTime += this.obj.dt;
      if (this.right_currentLerpTime > this.right_lerpTime) {
        this.right_currentLerpTime = this.right_lerpTime;
        this.right_moving = false;
      }
  
      const perc = this.right_currentLerpTime / this.right_lerpTime;
      this.x = lerp(this.right_startX, this.right_toX, perc);
      this.y = lerp(this.right_startY, this.right_toY, perc);
    }

    const vState = KeyListener.keys.vertical.state;
    const v = KeyListener.keys.vertical[vState];

    if (v) {
      const dx = v ? right_moveDir[vState] : 0;
      this.y += dx * this.obj.dt * right_speed;

      this.moved = true;
    }

    this.inRange();
  }

  draw() {
    switch (this.state) {
      case "red":
        Sprite.drawCenter("heart_red_down", this.x, this.y);
        break;
      case "blue":
        Sprite.drawCenter(`heart_blue_${this.blue_state}`, this.x, this.y);
        break;
      case "right":
        Sprite.drawCenter("heart_blue_right", this.x, this.y);
      default: break;
    }

    if (Debugger.is) {
      Debugger.rect(this.collider);
      Debugger.rect(this.platformerCollider);
    }
  }

  right_moveTo(x, y, t) {
    this.right_toX = x;
    this.right_toY = y;
    this.right_startX = this.x;
    this.right_startY = this.y;
    this.right_moving = true;
    this.right_lerpTime = t;
    this.right_currentLerpTime = 0;
  }
}

export { Heart };