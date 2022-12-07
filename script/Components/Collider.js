import { toRad } from "../Constants/GameMath.js";

const Debugger = {
  ctx: null,
  is: true,

  circle: function(x, y) {
    this.ctx.strokeStyle = this.debugColor;
    this.ctx.fillStyle = "yellow";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  },

  rect: function(col, collision = false) {
    this.ctx.strokeStyle = collision ? "red" : "green";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.rect(col.o.x - col.l, col.o.y - col.u, col.l + col.r, col.u + col.d);
    this.ctx.stroke();
  },

  rectRot: function(col, collision = false) {
    this.ctx.save();
    this.ctx.strokeStyle = collision ? "red" : "green";
    this.ctx.lineWidth = 2;
    this.ctx.translate(col.o.x, col.o.y);
    this.ctx.rotate(col.o.angle * toRad);
    this.ctx.beginPath();
    this.ctx.rect(-col.l, -col.u, col.l + col.r, col.u + col.d);
    this.ctx.stroke();
    this.ctx.restore();
  }
};

class Collider {
  constructor(object, left, right, up, down) {
    this.o = object; // object with x, y (angle selection)

    this.l = left;
    this.r = right;
    this.u = up;
    this.d = down;
  }

  AABB(p) {
    const b = (
      this.o.x - this.l < p.o.x + p.r &&
      this.o.x + this.r > p.o.x - p.l &&
      this.o.y - this.u < p.o.y + p.d &&
      this.o.y + this.d > p.o.y - p.u
    );

    if (Debugger.is) {
      Debugger.rect(this, b);
    }

    return b;
  }

  OBB(p) {
    const r1 = this.getRotPoints();
    const r2 = p.getPoints();

    const r1_center = { x:   (r1[0].x + r1[3].x) / 2, y:  (r1[0].y + r1[3].y) / 2 };
    const r2_center = { x:   (r2[0].x + r2[3].x) / 2, y:  (r2[0].y + r2[3].y) / 2 };
    const centerVec = { x: r2_center.x - r1_center.x, y: r2_center.y - r1_center.y};

    const b = this.SAT(r1, r2, centerVec) && this.SAT(r2, r1, centerVec);

    if (Debugger.is) {
      r1.forEach(point => Debugger.circle(point.x, point.y));

      Debugger.circle(r1_center.x, r1_center.y);
      
      Debugger.rectRot(this, b);
      console.log(this.o)
    }

    return b;
  }

  SAT(r1, r2, centerVec) {
    const diag1 = { x: r2[3].x - r2[0].x, y: r2[3].y - r2[0].y };
    const diag2 = { x: r2[2].x - r2[1].x, y: r2[2].y - r2[1].y };

    const axis1 = { x: r1[1].x - r1[0].x, y: r1[1].y - r1[0].y };
    const axis1_size = Math.sqrt(axis1.x * axis1.x + axis1.y * axis1.y);

    const axis2 = { x: r1[2].x - r1[0].x, y: r1[2].y - r1[0].y };
    const axis2_size = Math.sqrt(axis2.x * axis2.x + axis2.y * axis2.y);
    
    return (
      Math.abs((centerVec.x * axis1.x + centerVec.y * axis1.y) / axis1_size) * 2 <
      axis1_size + Math.max(
        Math.abs((diag1.x * axis1.x + diag1.y * axis1.y) / axis1_size),
        Math.abs((diag2.x * axis1.x + diag2.y * axis1.y) / axis1_size)
      ) &&

      Math.abs((centerVec.x * axis2.x + centerVec.y * axis2.y) / axis2_size) * 2 <
      axis2_size + Math.max(
        Math.abs((diag1.x * axis2.x + diag1.y * axis2.y) / axis2_size),
        Math.abs((diag2.x * axis2.x + diag2.y * axis2.y) / axis2_size)
      )
    );
  }

  getPoints() {
    return [
      { x: this.o.x - this.l, y: this.o.y - this.u },
      { x: this.o.x - this.l, y: this.o.y + this.d },
      { x: this.o.x + this.r, y: this.o.y - this.u },
      { x: this.o.x + this.r, y: this.o.y + this.d },
    ]
  }

  getRotPoints() {
    const rad = this.o.angle * toRad;
    
    const c = Math.cos(rad);
    const s = Math.sin(rad);

    return [
      { x: (-this.l) * c - (-this.u) * s + this.o.x, y: (-this.l) * s + (-this.u) * c + this.o.y },
      { x: (-this.l) * c -    this.d * s + this.o.x, y: (-this.l) * s +    this.d * c + this.o.y },
      { x:    this.r * c - (-this.u) * s + this.o.x, y:    this.r * s + (-this.u) * c + this.o.y },
      { x:    this.r * c -    this.d * s + this.o.x, y:    this.r * s +    this.d * c + this.o.y },
    ];
  }
}

export { Collider, Debugger };
