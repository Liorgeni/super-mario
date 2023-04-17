"use strict";
async function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = url;
  });
}

function isOnTopPlatform({ obj, platform }) {
  return (
    obj.position.y + obj.height <= platform.position.y &&
    obj.position.y + obj.height + obj.velocity.y >= platform.position.y &&
    obj.position.x + obj.width >= platform.position.x &&
    obj.position.x <= platform.position.x + platform.width
  );
}
function collisionTop({ obj1, obj2 }) {
  return (
    obj1.position.y + obj1.height <= obj2.position.y &&
    obj1.position.y + obj1.height + obj1.velocity.y >= obj2.position.y &&
    obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width
  );
}

function isOnTopPlatfornCircle({ obj, platform }) {
  return (
    obj.position.y + obj.radius <= platform.position.y &&
    obj.position.y + obj.radius + obj.velocity.y >= platform.position.y &&
    obj.position.x + obj.radius >= platform.position.x &&
    obj.position.x <= platform.position.x + platform.width
  );
}

function isHitBottom({ obj, platform }) {
  return (
    obj.position.y <= platform.position.y + platform.height &&
    obj.position.y - obj.velocity.y >= platform.position.y + platform.height &&
    obj.position.x + obj.width >= platform.position.x &&
    obj.position.x <= platform.position.x + platform.width
  );
}

function isHitSide({ obj, platform }) {
  return (
    obj.position.x + obj.width + obj.velocity.x - platform.velocity.x >=
      platform.position.x &&
    obj.position.x + obj.velocity.x <= platform.position.x + platform.width &&
    obj.position.y <= platform.position.y + platform.height &&
    obj.position.y + obj.height >= platform.position.y
  );
}
function objectSTouch({ obj1, obj2 }) {
  return (
    obj1.position.x + obj1.width >= obj2.position.x &&
    obj1.position.x <= obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height >= obj2.position.y &&
    obj1.position.y <= obj2.position.y + obj2.height
  );
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

function score(bollean) {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(scoreText, 20, 20);
  if (!bollean) return;
  if (bollean) {
    scoreText = (+scoreText + 1).toString();
    ctx.fillText(scoreText, 20, 20);
    console.log(scoreText);
  }
}
