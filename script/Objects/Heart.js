import { KeyListener } from "../Components/KeyListener.js";
import { Sprite } from "../AssetsManagement/Sprite.js";
import { Collider } from "./Collider.js";
import { battleBoxLineWidth } from "./BattleBox.js";
import { Debugger } from "../Components/Collider.js";

const moveDir = {
  a: -1,
  d: 1,
  w: -1,
  s: 1
};

const heart_size = 16;

const red_speed = 200;

const blue_vSpeed = 400;
const blue_hSpeed = 300;
const blue_states = {
  "up": 0, "down": 1, "right": 2, "left": 3
};

const blue_up_state = 0;
const blue_down_state = 1;
const blue_right_state = 2;
const blue_left_state = 3;

const padding = heart_size + battleBoxLineWidth / 2;

class Heart {
  constructor(obj) {
    this.ctx = obj.ctx;
    this.battleBox = obj.battleBox;

    [this.x, this.y] = this.battleBox.getCenter();
 
    this.collider = new Collider(this, heart_size - 6, heart_size - 6, heart_size - 6, heart_size - 6);
    this.platformerCollider = new Collider(this, heart_size, heart_size, heart_size, heart_size);

    /* soul state */
    this.blue_jumping = false;
    this.blue_velocity = 0;
    this.blue_state = blue_states["down"];
    this.blue_onPlatformer = false;
  }

  update() {
    this.moveBlue(this.obj.dt);
  }

  changeBlueState(state) {
    this.blue_state = blue_states[state];
    this.blue_velocity = -1000;
    this.blue_jumping = false;
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
      const nordt = this.obj.dt * this.red_speed / Math.sqrt(dx * dx + dy * dy);
      this.x += dx * nordt;
      this.y += dy * nordt;
    }

    this.inRange();
  }

  moveBlue() {
    const hState = KeyListener.keys.horizontal.state;
    const vState = KeyListener.keys.vertical.state;
    const h = KeyListener.keys.horizontal[hState];
    const v = KeyListener.keys.vertical[vState];

    if (this.blue_state == blue_up_state || this.blue_state == blue_down_state) {
      const isUp = this.blue_state == blue_up_state;

      if (h) {
        this.x += moveDir[hState] * blue_hSpeed * this.obj.dt;
      }

      if (v) {
        const isGrounded = Math.floor(this.y) == Math.floor(isUp ? this.battleBox.points[1].y + padding : this.battleBox.points[0].y - padding);
        if (isGrounded || this.blue_onPlatformer) {
          this.blue_velocity = 0;
          this.blue_jumping = false;
        }
      } else {
        if (this.blue_velocity > 0) {
          this.blue_velocity = 0;
          this.blue_jumping = false;
        }
      }

      this.blue_velocity -= blue_vSpeed * this.obj.dt;
      this.y -= this.blue_velocity * this.obj.dt * (isUp ? 1 : -1);
    } else {
      const isLeft = this.blue_state == blue_left_state;

      if (v) {
        this.y += moveDir[vState] * blue_vSpeed * this.obj.dt;
      }
      
      if (h) {
        const isGrounded = Math.floor(this.x) == Math.floor(isLeft ? this.battleBox.points[1].x + padding : this.battleBox.points[0].x - padding);
        if (isGrounded || this.blue_onPlatformer) {
          this.blue_velocity = 0;
          this.blue_jumping = false;
        }
      } else {
        if (this.blue_velocity > 0) {
          this.blue_velocity = 0;
          this.blue_jumping = false;
        }
      }

      this.blue_velocity -= blue_hSpeed * this.obj.dt;
      this.x -= this.blue_velocity * this.obj.dt * (isLeft ? 1 : -1);
    }

    if (this.blue_velocity < 0) {
      this.blue_jumping = false;
    }

    this.inRange();
    this.blue_onPlatformer = false;
  }

  draw() {
    Sprite.draw(this.ctx, `heart_blue_${this.blue_state}`, this.x, this.y);

    if (Debugger.is) {
      Debugger.rect(this.collider);
      Debugger.rect(this.platformerCollider);
    }
  }
}

export { Heart, blue_up_state, blue_down_state, blue_right_state, blue_left_state };