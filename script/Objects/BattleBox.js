import { lerp } from "../Constants/GameMath";

const battleBoxLineWidth = 8;

class BattleBox {
  constructor(obj) {
    this.obj = obj;

    this.canvas = obj.canvas;
    this.ctx = obj.ctx;

    this.lineWidth = battleBoxLineWidth;

    const w = this.canvas.width / 2;
    const h = this.canvas.height / 2;
    this.set(w - 200, h - 200, w + 200, h + 200);
    
    this.moving = false;
    this.lerpTime = 1;
    this.currentLerpTime = 0;
    this.startPoints = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
    this.endPoints = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
    this.points = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];
  }

  update() {
    if (this.moving) {
      this.currentLerpTime += this.obj.dt;
      if (this.currentLerpTime > this.lerpTime) {
        this.currentLerpTime = this.lerpTime;
        this.moving = false;
        for (let i = 0; i < 2; i++) {
          this.points[i].x = this.endPoints[i].x;
          this.points[i].y = this.endPoints[i].y;
        }
      }

      const perc = this.currentLerpTime / this.lerpTime;
      for (let i = 0; i < 2; i++) {
        this.points[i].x = lerp(this.startPoints[i].x, this.endPoints[i].x, perc);
        this.points[i].y = lerp(this.startPoints[i].y, this.endPoints[i].y, perc);
      }
    }
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
  }

  withinRange(x, y, p) {
    p += this.lineWidth / 2;
    return [
      Math.max(this.points[0].x + p, Math.min(this.points[1].x - p, x)),
      Math.max(this.points[0].y + p, Math.min(this.points[1].y - p, y))
    ];
  }
}

export { BattleBox, battleBoxLineWidth };