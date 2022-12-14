import { lerp } from "../Constants/GameMath.js";

const battleBoxLineWidth = 8;

const centerX = 640;
const centerY = 500;

class BattleBox {
  constructor(obj) {
    this.obj = obj;

    this.canvas = obj.canvas;
    this.ctx = obj.ctx;

    this.lineWidth = battleBoxLineWidth;

    // const w = this.canvas.width / 2;
    // const h = this.canvas.height / 2;
    // this.setBox([
    //   { x: w - 200, y: h - 200 },
    //   { x: w + 200, y: h + 200 }
    // ]);
    this.moving = false;
    this.lerpTime = 1;
    this.currentLerpTime = 0;
    this.setBoxSize(200, 200);
  }

  update() {
    if (this.moving) {
      this.currentLerpTime += this.obj.dt;
      if (this.currentLerpTime > this.lerpTime) {
        this.moving = false;
        for (let i = 0; i < 2; i++) {
          this.points[i].x = this.endPoints[i].x;
          this.points[i].y = this.endPoints[i].y;
        }

        return ;
      }

      const perc = this.currentLerpTime / this.lerpTime;
      for (let i = 0; i < 2; i++) {
        this.points[i].x = lerp(this.startPoints[i].x, this.endPoints[i].x, perc);
        this.points[i].y = lerp(this.startPoints[i].y, this.endPoints[i].y, perc);
      }
    }
  }

  setBoxSize(width, height) {
    this.startPoints = [
      { x: centerX - width, y: centerY - height },
      { x: centerX + width, y: centerY + height },
    ];
    this.endPoints = [
      { x: centerX - width, y: centerY - height },
      { x: centerX + width, y: centerY + height },
    ];
    this.points = [
      { x: centerX - width, y: centerY - height },
      { x: centerX + width, y: centerY + height },
    ];
  }

  setBox(newPoints, lerpTime = 1) {
    this.moving = true;
    this.currentLerpTime = 0;
    this.lerpTime = lerpTime;
    
    for (let i = 0; i < 2; i++) {
      this.startPoints[i].x = this.points[i].x;
      this.startPoints[i].y = this.points[i].y;

      this.endPoints[i].x = newPoints[i].x;
      this.endPoints[i].y = newPoints[i].y;
    }
  }

  getCenter() {
    return [
      this.points[0].x + ((this.points[1].x - this.points[0].x) / 2),
      this.points[0].y + ((this.points[1].y - this.points[0].y) / 2),
    ];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.rect(this.points[0].x, this.points[0].y, this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y);
    this.ctx.stroke();

    const [x, y] = this.getCenter();
    this.drawLine(x, this.points[0].y - 4, x, 0);
    this.drawLine(x, this.points[1].y + 4, x, this.obj.canvas.height);
    this.drawLine(this.points[0].x - 4, y, 0, y);
    this.drawLine(this.points[1].x + 4, y, this.obj.canvas.width, y);
  }

  drawLine(x, y, dx, dy) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1500;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(dx, dy);
    this.ctx.stroke();
  }

  withinRange(x, y, p) {
    p += this.lineWidth / 2;
    return [
      Math.max(this.points[0].x + p, Math.min(this.points[1].x - p, x)),
      Math.max(this.points[0].y + p, Math.min(this.points[1].y - p, y))
    ];
  }

  getUpLeft() {
    return [this.points[0].x, this.points[0].y];
  }

  getUpRight() {
    return [this.points[1].x, this.points[0].y];
  }

  getDownLeft() {
    return [this.points[0].x, this.points[1].y];
  }

  getDownRight() {
    return [this.points[1].x, this.points[1].y];
  }

  getSize() {
    return [
      this.points[1].x - this.points[0].x,
      this.points[1].y - this.points[0].y
    ];
  }
}

export { BattleBox, battleBoxLineWidth };