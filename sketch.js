let size; // Canvas width
let img_front, img_back; // Image
let numVertex = 33; // SEED NUMBER
let vertexMin = 3; // Seed Min limit
let vertexMax = 42; // Seed Max limit
let interactStep = 1; // Step increase/decrease Seed
let pauseChange = 10;
let gemsVertex = [];
let gemsCuts = [];
let centerVect;
let saveNum = 0;
let scaleFactor = 2;

function preload() {
  /*
  Photo Credit: Mei-Ling Mirow
  https://meililngmirow.squarespace.com/
  https://www.instagram.com/meilingmirow/
  https://unsplash.com/@meilingmirow
  https://unsplash.com/photos/Q8VORo4QoyY
  Free to use under the Unsplash License
  */
  img_front = loadImage(
    "./assets/mei-ling-mirow-front.png"
  );
  img_back = loadImage(
    "./assets/mei-ling-mirow-back.png"
  );
}

function setup() {
  checkSize();
  createCanvas(size, (size * 5) / 4);
  frameRate(15);
  colorMode(HSB, 360);

  strokeJoin(ROUND);
  strokeCap(ROUND);
  stroke(360, 150, 360, 50);

  loadButton();
}

function loadButton() {
  buttonSave = createButton("SAVE");
  buttonSave.addClass("save");
  buttonSave.mousePressed(saveSouvenir);
  buttonSave.position(size / 2 - 30, (size * 5) / 4 - 45);
}

function checkSize() {
  width = windowWidth;
  height = windowHeight;

  if (width > height) size = (height * 4) / 5;
  else size = width;

  if (size <= 400) scaleFactor = 3;
  if (size > 400 && size < 1200) scaleFactor = 2;
  if (size >= 1200) scaleFactor = 1;

  density = size / 4;
  centerVect = createVector(size / 2, (size * 5) / 8);
}

function windowResized() {
  checkSize();
  resizeCanvas(size, (size * 5) / 4);
  gemsVertex = [];
  buttonSave.position(size / 2 - 30, (size * 5) / 4 - 45);
}

function draw() {
  background(0, 0, 360);
  strokeWeight(1);

  image(img_back, 0, 0, size, (size * 5) / 4);

  for (let i = 0; i < numVertex; i++) {
    gemsVertex.push(generateGem());
  }
  for (let i = 0; i < numVertex; i++) {
    gemsVertex[i].update();
  }

  changeDirection();

  image(img_front, 0, 0, size, (size * 5) / 4);

  // if (
  //   mouseX > size / 6 &&
  //   mouseX < (size * 5) / 6 &&
  //   mouseY > (size * 5) / 4 / 4 &&
  //   mouseY < (size * 5) / 4
  // )
    buttonSave.show();
  // else buttonSave.hide();
}

function generateGem() {
  let gemsVertex = {};
  gemsVertex.position = createVector(
    width / 2 + random(size / -3, size / 3),
    height / 2 + random(size / -3, size / 3)
  );
  gemsVertex.direction = createVector(
    round(random()) * 2 - 1,
    round(random()) * 2 - 1
  );
  gemsVertex.update = function () {
    this.position.add(this.direction);

    if (round(centerVect.dist(this.position)) >= size / 2.1) {
      this.direction.rotate(PI);
      this.counter = pauseChange;
    }
    if (this.counter > 0) this.counter -= 1;
  };
  gemsVertex.counter = 0;
  return gemsVertex;
}

function changeDirection() {
  for (let i = 0; i < numVertex; i++) {
    for (let j = 0; j < numVertex; j++) {
      // stroke(0 + i * 2, 200, 360, 100 - i);
      if (i != j) {
        let distance = gemsVertex[i].position.dist(gemsVertex[j].position);
        if (distance < size / 50) {
          if (gemsVertex[i].counter == 0) {
            gemsVertex[i].direction.rotate(random());
            gemsVertex[i].counter = pauseChange;
          }
          if (gemsVertex[j].counter == 0) {
            gemsVertex[j].direction.rotate(random());
            gemsVertex[j].counter = pauseChange;
          }
        }
        line(
          gemsVertex[i].position.x,
          gemsVertex[i].position.y,
          gemsVertex[j].position.x,
          gemsVertex[j].position.y
        );
      }
    }
  }
}

function saveSouvenir() {
  scaleSize();
  saveNum++;
  const zeroNum = (num, places) => String(saveNum).padStart(3, "0");
  saveCanvas(
    "Summer Sunrise Generator by Ana Gasharova - " + zeroNum(3, saveNum),
    "png"
  );
  resizeCanvas(size, (size * 5) / 4);
}

function scaleSize() {
  resizeCanvas(size * scaleFactor, (size * scaleFactor * 5) / 4);
  image(img_back, 0, 0, size * scaleFactor, (size * scaleFactor * 5) / 4);
  push();
  scale(scaleFactor);
  strokeWeight(1.5 / scaleFactor);
  changeDirection();
  pop();
  image(img_front, 0, 0, size * scaleFactor, (size * scaleFactor * 5) / 4);
}
