import { Sprite } from "../AssetsManagement/Sprite.js";
import { toRad } from "../Constants/GameMath.js";

class UndyneArrow {
  constructor(obj, x, y, speed) {
    this.obj = obj;
    this.ctx = obj.ctx;
    this.x = x;
    this.y = y;

    this.angle = 0;
    this.speed = speed;

    this.dirVecX = 0;
    this.dirVecY = 0;
  }

  move() {
    this.x -= this.dirVecX * this.speed * this.obj.dt;
    this.y -= this.dirVecY * this.speed * this.obj.dt;
  }

  angleToPlayer() {
    this.dirVecX = this.x - this.obj.player.x;
    this.dirVecY = this.y - this.obj.player.y;
    const nor = Math.sqrt(this.dirVecX * this.dirVecX + this.dirVecY * this.dirVecY);
    this.dirVecX /= nor;
    this.dirVecY /= nor;

    const arcCos = Math.acos(this.dirVecX) / toRad;
    const arcSin = Math.asin(this.dirVecY) / toRad;
    
    this.angle = (arcSin >= 0) ? arcCos : 360 - arcCos;
  }

  draw() {
    Sprite.drawRotation(this.ctx, "arrow", this.x, this.y, this.angle - 90);
  }
}

class UndyneArrowRandom {
  constructor(obj, speed) {
    super(obj, , y, speed);
  }


}

export { UndyneArrow };