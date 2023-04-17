"use strict";

class Goomba {
  constructor({
    position,
    velocity,
    distance = {
      limit: 50,
      traveled: 0,
    },
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.height = 50;
    this.width = 50;
    this.image = createImage(SPRITEGOOMBA);
    this.frames = 0;

    this.distance = distance;
  }
  //   draw() {
  //     ctx.fillStyle = "red";
  //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  //   }

  draw() {
    ctx.drawImage(
      this.image,
      130 * this.frames,
      0,
      130,
      150,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames >= 58) this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
    // Walk the Goomba back and forth
    this.distance.traveled += Math.abs(this.velocity.x);
    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0;
      this.velocity.x = -this.velocity.x;
    }
  }
}

class Particle {
  constructor({
    position,
    velocity,
    radius,
    color = "#654428",
    fireball = false,
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.radius = radius;
    this.lifetime = 300;
    this.color = color;
    this.fireball = fireball;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.lifetime--;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.radius + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity * 0.4;
    }
  }
}

//////////////

class Coin {
  constructor({ position }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.height = 40;
    this.width = 40;
    this.image = createImage(COIN);
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.draw();
  }
}
