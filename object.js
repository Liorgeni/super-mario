"use strict";

class Platform {
  constructor({ x, y, image, block, text }) {
    this.position = {
      x,
      y,
    };

    this.velocity = {
      x: 0,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.block = block;
    this.text = text;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
    if (this.text) {
      ctx.fillStyle = "red";
      ctx.fillText(this.text, this.position.x, this.position.y);
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.velocity = {
      x: 0,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}
