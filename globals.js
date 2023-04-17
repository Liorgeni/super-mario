"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Imgs
// Enviorment
const PLATFORM = "img/platform.png";
const HILLS = "img/hills.png";
const BACKGROUND = "img/background.png";
const PLATFORMSMALL = "img/platformSmallTall.png";
const MEDIUMPLATFORM = "img/mdPlatform.png";
const LARGEPLATFORM = "img/lgPlatform.png";
const TALLPLATFORM = "img/tPlatform.png";
const XTALLPLATFORM = "img/xtPlatform.png";
const FLAGPOLE = "img/flagPole.png";
const COIN = "img/coin.png";

// Mario
const SPRITERUNLEFT = "img/spriteMarioRunLeft.png";
const SPRITERUNRIGHT = "img/spriteMarioRunRight.png";
const SPRITESTANDLEFT = "img/spriteMarioStandLeft2.png";
const SPRITESTANDRIGHT = "img/spriteMarioStandRight2.png";
const MARIOJUMPLEFT = "img/spriteMarioJumpLeft.png";
const MARIOJUMPRIGHT = "img/spriteMarioJumpRight.png";

// Fire
const FLOWERPOWER = "img/spriteFireFlower.png";
const FIRESPRITERUNLEFT = "img/spriteFireFlowerRunLeft.png";
const FIRESPRITERUNRIGHT = "img/spriteFireFlowerRunRight.png";
const FIRESPRITESTANDLEFT = "img/spriteFireFlowerStandLeft.png";
const FIRESPRITESTANDRIGHT = "img/spriteFireFlowerStandRight.png";
const FIREMARIOJUMPLEFT = "img/spriteFireFlowerJumpLeft.png";
const FIREMARIOJUMPRIGHT = "img/spriteFireFlowerJumpRight.png";
const SHOOTINGSPRITELEFT = "img/spriteFireFlowerShootLeft.png";
const SHOOTINGSPRITERIGHT = "img/spriteFireFlowerShootRight.png";
// Obsitcles
const SPRITEGOOMBA = "img/spriteGoomba.png";
const ONEBLOCK = "img/block.png";
const TRIPPLEBLOCK = "img/blockTri.png";

// Size measures
const gravity = 0.5;
canvas.width = 1024;
canvas.height = 576;

// vars
let scrollOffset;
let platforms = [];
let genericObjects = [];
let goombas = [];
let particles = [];
let player;
let lastKey;
let hitSide;
let fireFlowers = [];
let flagPole;

let platformImage;
let hillsImage;
let backgroundImage;
let oneblock;
let tripleblock;
let mediumPlatform;
let largePlatform;
let tallPlatform;
let xTallPlatform;
let flagImage;
let coins = [];
let scoreText = "0";
