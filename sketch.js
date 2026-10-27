const FRAME_COUNT = 24; // 設定橫向精靈圖的動畫影格數
const MOVE_SPEED = 4; // 設定角色每次繪製時的移動速度
let spriteSheet; // 宣告用來存放角色精靈圖的變數
let characterX; // 宣告角色目前的水平位置
let characterY; // 宣告角色目前的垂直位置
let facing = 1; // 設定角色初始朝向為右方
let animationFrame = 0; // 設定角色目前播放的動畫影格

function preload() { // 在畫面建立前載入角色精靈圖
  spriteSheet = loadImage("1/1.png"); // 載入 1 資料夾內的角色精靈圖
} // 結束圖片預載入函式

function setup() { // 設定畫布與角色的初始狀態
  createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布
  imageMode(CENTER); // 將圖片繪製位置設定為圖片中心
  characterX = width / 2; // 將角色放在畫布水平中央
  characterY = height / 2; // 將角色放在畫布垂直中央
} // 結束畫布設定函式

function draw() { // 每一畫格更新並繪製角色
  background(204, 238, 255); // 將畫布背景設為 #cceeff
  const movingRight = keyIsDown(RIGHT_ARROW); // 檢查鍵盤右鍵是否正被按住
  const movingLeft = keyIsDown(LEFT_ARROW); // 檢查鍵盤左鍵是否正被按住
  const isMoving = movingRight !== movingLeft; // 判斷角色是否只按住其中一個方向鍵
  if (movingRight && !movingLeft) { // 判斷是否只按住右鍵
    characterX += MOVE_SPEED; // 讓角色往右移動
    facing = 1; // 讓角色朝向右方
  } // 結束右移判斷
  if (movingLeft && !movingRight) { // 判斷是否只按住左鍵
    characterX -= MOVE_SPEED; // 讓角色往左移動
    facing = -1; // 讓角色翻轉並朝向左方
  } // 結束左移判斷
  const frameHeight = spriteSheet.height; // 取得精靈圖的影格高度
  const frameWidth = frameHeight; // 依照 88 像素高度使用正方形動畫影格
  const characterSize = frameHeight; // 將角色繪製尺寸設定為正方形影格大小
  characterX = constrain(characterX, characterSize / 2, width - characterSize / 2); // 限制角色留在畫布水平範圍內
  animationFrame = isMoving ? floor(frameCount / 8) % FRAME_COUNT : 0; // 移動時播放動畫，停止時顯示第一格
  push(); // 暫存目前的繪圖狀態
  translate(characterX, characterY); // 將繪圖原點移至角色位置
  scale(facing, 1); // 依角色朝向決定是否水平翻轉
  image(spriteSheet, 0, 0, characterSize, characterSize, animationFrame * frameWidth, 0, frameWidth, frameHeight); // 繪製目前的精靈圖影格
  pop(); // 還原先前的繪圖狀態
} // 結束每畫格繪製函式

function windowResized() { // 當瀏覽器視窗尺寸改變時重新調整畫布
  resizeCanvas(windowWidth, windowHeight); // 讓畫布重新符合視窗大小
  characterX = constrain(characterX, spriteSheet.height / 2, width - spriteSheet.height / 2); // 調整角色位置避免超出新畫布
  characterY = height / 2; // 讓角色在視窗高度改變後保持垂直置中
} // 結束視窗尺寸調整函式
