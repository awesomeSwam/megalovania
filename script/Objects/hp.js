import { Sound } from "../AssetsManagement/Sound.js";

class HP {
  constructor(obj, hp) {
    this.ctx = obj.ctx;
    this.obj = obj;
    this.max = hp;
    this.hp = hp;
    this.kr = hp;
    this.time = 0;

    this.isCollision = false;
  }

  update() {
    this.time++;
    console.log(this.time)
    if (this.isCollision) {
      if (this.hp <= 0){
        this.kr -= this.obj.dt * 30;
      }else{
        this.hp -= this.obj.dt * 30;
      }
      Sound.play("damaged");
    }
    if (this.time % 30 == 0){
      if (this.kr > this.hp){
        this.kr--;
      }
    }
    if (Math.floor(this.kr - this.hp) >= 15){
      this.kr--;
    } 
  }

  draw() {
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.font = "40px Undertale Sans";
    this.ctx.fillText("CHARA", 170, 912);
    this.ctx.fillText("LV 19", 300, 912);
    this.ctx.fillText("HP", 450, 912);

    this.drawLine(480, 480 + 200, 900, 900, "red");
    this.drawLine(480, 480 + 200 * this.kr / this.max, 900, 900, "#c201c4");
    this.drawLine(480, 480 + 200 * this.hp / this.max, 900, 900, "yellow");
    
    if (!(Math.floor(this.kr - this.hp) <= 0)){
      this.ctx.fillStyle = "#c201c4";
    } 
    this.ctx.fillText(`KR ${Math.floor(this.kr)} / 100`, 805, 912);
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