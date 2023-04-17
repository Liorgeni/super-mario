"use strict";

animate();
init();

async function imagesloader() {
  platformImage = await loadImage(PLATFORM);
  hillsImage = await loadImage(HILLS);
  backgroundImage = await loadImage(BACKGROUND);
  oneblock = await loadImage(ONEBLOCK);
  tripleblock = await loadImage(TRIPPLEBLOCK);
  mediumPlatform = loadImage(MEDIUMPLATFORM);
  largePlatform = await loadImage(LARGEPLATFORM);
  tallPlatform = await loadImage(TALLPLATFORM);
  xTallPlatform = await loadImage(XTALLPLATFORM);
  flagImage = await loadImage(FLAGPOLE);
}

async function init() {
  await imagesloader();
  player = new Player();
  scrollOffset = 0;

  const platformsMap = [
    "lg",
    "lg",
    "gap",
    "lg",
    "gap",
    "gap",
    "lg",
    "gap",
    "tp",
    "gap",
    "xt",
    "gap",
    "xt",
    "gap",
    "gap",
    "xt",
  ];
  platforms = [
    new Platform({
      x: 908 + 100,
      y: 300,
      image: tripleblock,
      block: true,
    }),
    new Platform({
      x: 908 + 100 + oneblock.width,
      y: 100,
      image: oneblock,
      block: true,
    }),
    new Platform({
      x: 1991 + largePlatform.width - tallPlatform.width,
      y: canvas.height - largePlatform.height - tallPlatform.height,
      image: tallPlatform,
      block: false,
    }),
    new Platform({
      x: 1991 + largePlatform.width - tallPlatform.width - 100,
      y:
        canvas.height -
        largePlatform.height -
        tallPlatform.height +
        oneblock.height,
      image: oneblock,
      block: true,
    }),
    new Platform({
      x: 5712 + xTallPlatform.width + 175,
      y: canvas.height - xTallPlatform.height,
      image: oneblock,
      block: true,
    }),
    new Platform({
      x: 6116 + 175,
      y: canvas.height - xTallPlatform.height,
      image: oneblock,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 2,
      y: canvas.height - xTallPlatform.height,
      image: oneblock,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 3,
      y: canvas.height - xTallPlatform.height - 100,
      image: oneblock,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 4,
      y: canvas.height - xTallPlatform.height - 200,
      image: tripleblock,
      block: true,
    }),
    new Platform({
      x: 6116 + 175 * 4 + tripleblock.width,
      y: canvas.height - xTallPlatform.height - 200,
      image: tripleblock,
      block: true,
    }),
    new Platform({
      x: 6968 + 300,
      y: canvas.height - largePlatform.height,
      image: largePlatform,
      block: true,
    }),
  ];

  let platformDistance = 0;
  platformsMap.forEach((symbol) => {
    switch (symbol) {
      case "lg":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - largePlatform.height,
            image: largePlatform,
            block: true,
          })
        );
        platformDistance += largePlatform.width - 2;
        break;

      case "gap":
        platformDistance += 175;
        break;

      case "tp":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - tallPlatform.height,
            image: tallPlatform,
            block: true,
          })
        );
        platformDistance += tallPlatform.width - 2;
        break;

      case "xt":
        platforms.push(
          new Platform({
            x: platformDistance,
            y: canvas.height - xTallPlatform.height,
            image: xTallPlatform,
            block: true,
            text: platformDistance,
          })
        );
        platformDistance += xTallPlatform.width - 2;
        break;
    }
  });

  fireFlowers = [
    new FireFlower({
      position: { x: 1050, y: 100 },
      velocity: {
        x: 0,
        y: 0,
      },
    }),
  ];

  const goombaWidth = 50;
  goombas = [
    new Goomba({
      position: { x: 908 + largePlatform.width - goombaWidth, y: 100 },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: { x: 3249 + largePlatform.width - goombaWidth, y: 100 },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 3249 + largePlatform.width - goombaWidth - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 3249 + largePlatform.width - goombaWidth - goombaWidth - goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x:
          3249 +
          largePlatform.width -
          goombaWidth -
          goombaWidth -
          goombaWidth -
          goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 400,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 5135 + xTallPlatform.width / 2 + goombaWidth,
        y: 100,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
    new Goomba({
      position: {
        x: 6968,
        y: 0,
      },
      velocity: {
        x: -0.3,
        y: 0,
      },
      distance: {
        limit: 100,
        traveled: 0,
      },
    }),
  ];

  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: backgroundImage }),
    new GenericObject({ x: -1, y: -1, image: hillsImage }),
  ];

  flagPole = new GenericObject({
    x: 6968 + 400,
    y: canvas.height - largePlatform.height - flagImage.height,
    image: flagImage,
  });

  coins = [
    new Coin({
      position: { x: 300, y: 300 },
    }),
    new Coin({
      position: { x: 380, y: 300 },
    }),
    new Coin({
      position: { x: 460, y: 300 },
    }),
  ];
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.fillStyle = "red";
  // ctx.fillRect(20, 20, 20, 20);

  genericObjects.forEach((genericObject) => {
    genericObject.update();
    genericObject.velocity.x = 0;
  });

  platforms.forEach((platform) => {
    platform.update();
    platform.velocity.x = 0;
  });

  if (flagPole) {
    flagPole.update();
    flagPole.velocity.x = 0;
    // Mario touch flag
    if (
      objectSTouch({
        obj1: player,
        obj2: flagPole,
      })
    ) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  }

  // Mario obtains powerUp

  fireFlowers.forEach((fireFlower, idx) => {
    if (
      objectSTouch({
        obj1: player,
        obj2: fireFlower,
      })
    ) {
      player.powerUps.fireFlower = true;
      setTimeout(() => {
        fireFlowers.splice(idx, 1);
      }, 0);
    } else {
      fireFlower.update();
    }
  });
  // console.log(player.powerUps.fireFlower);
  goombas.forEach((goomba, idx) => {
    goomba.update();

    // Goomba get fireball and dies
    particles
      .filter((particle) => particle.fireball)
      .forEach((particle, particleIdx) => {
        if (
          particle.position.x + particle.radius >= goomba.position.x &&
          particle.position.y + particle.radius >= goomba.position.y &&
          particle.position.x - particle.radius <=
            goomba.position.x + goomba.width &&
          particle.position.y - particle.radius <=
            goomba.position.y + goomba.height
        ) {
          for (let i = 0; i < 50; i++) {
            particles.push(
              new Particle({
                position: {
                  x: goomba.position.x + goomba.width / 2,
                  y: goomba.position.y + goomba.height / 2,
                },
                velocity: {
                  x: (Math.random() - 0.5) * 7,
                  y: (Math.random() - 0.5) * 15,
                },
                radius: Math.random() * 3,
              })
            );
          }
          setTimeout(() => {
            goombas.splice(idx, 1);
            particles.splice(particleIdx, 1);
          }, 0);
        }
      });

    // Goonba Stomp
    if (
      collisionTop({
        obj1: player,
        obj2: goomba,
      })
    ) {
      for (let i = 0; i < 50; i++) {
        particles.push(
          new Particle({
            position: {
              x: goomba.position.x + goomba.width / 2,
              y: goomba.position.y + goomba.height / 2,
            },
            velocity: {
              x: (Math.random() - 0.5) * 7,
              y: (Math.random() - 0.5) * 15,
            },
            radius: Math.random() * 3,
          })
        );
      }
      player.velocity.y -= 20;
      setTimeout(() => {
        goombas.splice(idx, 1);
      }, 0);
    } else if (
      player.position.x + player.width >= goomba.position.x &&
      player.position.y + player.height >= goomba.position.y &&
      player.position.x <= goomba.position.x + goomba.width
    ) {
      // player hits gomba

      if (player.powerUps.fireFlower) {
        player.invincible = true;
        player.powerUps.fireFlower = false;
        setTimeout(() => {
          player.invincible = false;
        }, 1000);
      } else if (!player.invincible) {
        init();
      }
    }
  });
  particles.forEach((particle, i) => {
    particle.update();

    if (
      particle.fireball &&
      (particle.position.x - particle.radius >= canvas.width ||
        particle.position.x + particle.radius <= 0)
    ) {
      setTimeout(() => {
        particles.splice(i, 1);
      }, 0);
    }
  });

  // console.log(particles);
  if (!player) return;
  player.update();

  hitSide = false;
  if (keys.right.pressed && player.position.x < 400) {
    // keys.right.pressed = false;
    player.velocity.x = 5;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -5;
    // keys.left.pressed = false;
  } else {
    player.velocity.x *= 0.9;
  }
  // Mario collects coins
  score(false);
  // updateScore();

  coins.forEach((coin, idx) => {
    coin.update();

    if (
      objectSTouch({
        obj1: player,
        obj2: coin,
      })
    ) {
      coins.splice(idx, 1);
      score(true);

      console.log("coin collected");
    }
  });

  // Scrolling code

  if (keys.right.pressed) {
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];
      platform.velocity.x = -player.speed;
      if (platform.block && isHitSide({ obj: player, platform })) {
        platforms.forEach((platform) => {
          platform.velocity.x = 0;
        });

        hitSide = true;
        break;
      }
    }

    if (!hitSide) {
      flagPole.velocity.x = -player.speed;
      // if i want the player won't be able to ga back - mark the next line
      scrollOffset += player.speed;

      // platforms.forEach((platform) => {
      //   platform.velocity.x = -player.speed;
      // });
      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = -player.speed * 0.66;
      });
      goombas.forEach((goomba) => {
        goomba.position.x -= player.speed;
      });
      fireFlowers.forEach((fireFlower) => {
        fireFlower.position.x -= player.speed;
      });
      particles.forEach((particle) => {
        particle.position.x -= player.speed;
      });
      coins.forEach((coin) => {
        coin.position.x -= player.speed;
      });
    }
  } else if (keys.left.pressed && scrollOffset > 0) {
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i];
      platform.velocity.x = player.speed;
      if (platform.block && isHitSide({ obj: player, platform })) {
        platforms.forEach((platform) => {
          platform.velocity.x = 0;
        });

        hitSide = true;
        break;
      }
    }
    if (!hitSide) {
      scrollOffset -= player.speed;
      flagPole.velocity.x = player.speed;

      genericObjects.forEach((genericObject) => {
        genericObject.velocity.x = player.speed * 0.66;
      });
      goombas.forEach((goomba) => {
        goomba.position.x += player.speed;
      });

      fireFlowers.forEach((fireFlower) => {
        fireFlower.position.x += player.speed;
      });
      particles.forEach((particle) => {
        particle.position.x += player.speed;
      });
      coins.forEach((coin) => {
        coin.position.x += player.speed;
      });
    }
  }

  // Platform collision

  platforms.forEach((platform) => {
    if (isOnTopPlatform({ obj: player, platform })) {
      player.velocity.y = 0;
    }
    if (platform.block && isHitBottom({ obj: player, platform })) {
      player.velocity.y = -player.velocity.y;
    }
    if (platform.block && isHitSide({ obj: player, platform })) {
      player.velocity.x = 0;
    }
    // Particles bounce

    particles.forEach((particle, idx) => {
      if (isOnTopPlatfornCircle({ obj: particle, platform })) {
        particle.velocity.y = -particle.velocity.y * 0.9;
        if (particle.radius - 0.4 < 0) particles.splice(idx, 1);
        else particle.radius -= 0.4;
      }
      if (particle.lifetime < 0) particles.splice(idx, 1);
    });

    goombas.forEach((goomba) => {
      if (
        isOnTopPlatform({
          obj: goomba,
          platform,
        })
      ) {
        goomba.velocity.y = 0;
      }
    });
    fireFlowers.forEach((fireFlower) => {
      if (
        isOnTopPlatform({
          obj: fireFlower,
          platform,
        })
      ) {
        fireFlower.velocity.y = 0;
      }
    });
  });

  //  Win scenario

  if (platformImage && scrollOffset + 400 + player.width > 6968 + 500) {
    console.log("Win");
  }

  // Lose scenario
  if (player.position.y > canvas.height) {
    console.log("you lose");
    init();
  }

  // Sprite switching
  if (player.velocity.y !== 0) return;
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.currentSprite = player.sprites.run.right;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
  }

  if (!player.powerUps.fireFlower) return;
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.fireFlower.right
  ) {
    player.currentSprite = player.sprites.run.fireFlower.right;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.fireFlower.left
  ) {
    player.currentSprite = player.sprites.run.fireFlower.left;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.fireFlower.left
  ) {
    player.currentSprite = player.sprites.stand.fireFlower.left;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.fireFlower.right
  ) {
    player.currentSprite = player.sprites.stand.fireFlower.right;
  }
}

addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      lastKey = "left";
      break;
    case 83:
      break;
    case 68:
      keys.right.pressed = true;
      lastKey = "right";
      break;
    case 87:
      player.velocity.y -= 14;
      if (lastKey === "right") player.currentSprite = player.sprites.jump.right;
      else player.currentSprite = player.sprites.jump.left;
      if (!player.powerUps.fireFlower) break;
      if (lastKey === "right")
        player.currentSprite = player.sprites.jump.fireFlower.right;
      else player.currentSprite = player.sprites.jump.fireFlower.left;
      break;

    case 32:
      if (!player.powerUps.fireFlower) return;
      let velocity = 15;
      if (lastKey === "left") velocity = -velocity;
      particles.push(
        new Particle({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y + player.height / 2,
          },
          velocity: {
            x: velocity,
            y: 0,
          },
          radius: 5,
          color: "red",
          fireball: true,
        })
      );
      break;
  }
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;
    case 83:
      break;
    case 68:
      keys.right.pressed = false;
      break;
    case 87:
      break;
  }
});
