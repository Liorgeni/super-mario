"use strict";

class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.scale = 0.3;
    this.width = 398 * this.scale;
    this.height = 353 * this.scale;
    this.image = loadImage(SPRITESTANDRIGHT);
    this.frames = 0;
    this.sprites = {
      stand: {
        right: loadImage(SPRITESTANDRIGHT),
        left: loadImage(SPRITESTANDLEFT),
        fireFlower: {
          right: loadImage(FIRESPRITESTANDRIGHT),
          left: loadImage(FIRESPRITESTANDLEFT),
        },
      },
      run: {
        right: loadImage(SPRITERUNRIGHT),
        left: loadImage(SPRITERUNLEFT),
        fireFlower: {
          right: loadImage(FIRESPRITERUNRIGHT),
          left: loadImage(FIRESPRITERUNLEFT),
        },
      },
      jump: {
        right: loadImage(MARIOJUMPRIGHT),
        left: loadImage(MARIOJUMPLEFT),
        fireFlower: {
          right: loadImage(FIREMARIOJUMPRIGHT),
          left: loadImage(FIREMARIOJUMPLEFT),
        },
      },
    };
    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 398;
    this.powerUps = {
      fireFlower: false,
    };
    this.invincible = false;
    this.opacity = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "rgba(255,0,0,0.2)";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.currentSprite.then((result) => {
      ctx.drawImage(
        result,
        this.currentCropWidth * this.frames,
        0,
        this.currentCropWidth,
        353,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      ctx.restore();
    });
  }
  update() {
    this.frames++;
    const { currentSprite, sprites } = this;
    if (
      this.frames > 58 &&
      (currentSprite === sprites.stand.right ||
        currentSprite === sprites.stand.left ||
        currentSprite === sprites.stand.fireFlower.right ||
        currentSprite === sprites.stand.fireFlower.left)
    ) {
      this.frames = 0;
    } else if (
      this.frames > 28 &&
      (currentSprite === sprites.run.right ||
        currentSprite === sprites.run.left ||
        currentSprite === sprites.run.fireFlower.right ||
        currentSprite === sprites.run.fireFlower.left)
    ) {
      this.frames = 0;
    } else if (
      currentSprite === sprites.jump.right ||
      currentSprite === sprites.jump.left ||
      currentSprite === sprites.jump.fireFlower.right ||
      currentSprite === sprites.jump.fireFlower.left
    ) {
      this.frames = 0;
    }

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
      if (this.invincible) {
        if (this.opacity === 1) this.opacity = 0;
        else this.opacity = 1;
      } else this.opacity = 1;
    }
  }
}

class FireFlower {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 56;
    this.height = 60;
    this.image = createImage(FLOWERPOWER);
    this.frames = 0;
  }
  //   draw() {
  //     ctx.fillStyle = "red";
  //     ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  //   }

  draw() {
    ctx.drawImage(
      this.image,
      56 * this.frames,
      0,
      56,
      60,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames >= 75) this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}
