import { Sound } from "../AssetsManagement/Sound.js";

class HP {
  constructor(obj, hp) {
    this.ctx = obj.ctx;
    this.obj = obj;
    this.max = hp;
    this.hp = hp;

    this.isCollision = false;
  }

  update() {
    if (this.isCollision) {
      Sound.play("damaged");
      this.hp -= this.obj.dt * 30;
    }
  }

  draw() {
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Undertale Sans";
    this.ctx.fillText("HP", 450, 912);

    this.drawLine(480, 480 + 200, 900, 900, "yellow");
    this.drawLine(480, 480 + 200 * this.hp / this.max, 900, 900, "red");

    this.ctx.fillText(`${Math.floor(this.hp)} / 100`, 785, 912);
  }

  drawLine(fromX, toX, fromY, toY, color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 30;
    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();
  }
}

export { HP };