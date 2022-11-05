// baseado no trabalho de David Leyva: https://wp.nyu.edu/davidaleyva/assignment-4-oscillation/
// Mic Input: https://p5js.org/examples/sound-mic-input.html

//declares variable for the ocean wave
let wave;
//declares variable for the boat
let boat;
//declares variable for y value offset of wave movement
let yoff = 0;
// entrada de microfone
let mic;
var img;

function preload(){
  img = loadImage('assets/barco.png');
}

function setup() {
 // Iniciando();
 // set pixel resolution
  pixelDensity(1);

  canvas = createCanvas(windowWidth, windowHeight);

    // set text properties
  textAlign(CENTER);
  fill(255, 255, 255, 60);
  textSize(width * 0.67 / textWidth('this text fits 67% of the canvas width') * textSize());
   
  mic = new p5.AudioIn(startMicError); 
  img.resize(202,86); // mudando o tamanho do barco (diminuir o tamanho do barco) rancar foraaaa

  canvas.mousePressed(startMicGesture);
  startMicMsg();
  phase = 0;
  
  mic.start();
  Iniciando();

}



function startMicGesture() {
  getAudioContext().resume().then(() => {
    console.log('Audio Context is now ON');
    canvas.mousePressed(false);
    background(0);
    phase = 1;
  });
}


function startMicMsg() {
  
  background(0);
  //textAlign(CENTER);
  //fill(255, 255, 255, 60);
  //textSize(20);
  console.log('estamos aqui');
  text('touch to start microphone', width / 2, height / 2);
 
}

function startMicError() {
  push();
  background(0);
  //textAlign(CENTER);
  //fill(255, 255, 255, 60);
  //textSize(20);
  text('failed to start the microphone', width / 2, height / 2);
  pop();
}

function draw() {

  switch (phase) {
    case 0:
      // wait mic gesture
      break;
    
    case 1:
    //ativa a obra
    Sereia();
     break;

    case 2:
    //ativa a obra
    Sereia();
     break;

   }

}

//creates and uses a class for the boat object
class Boat {
  constructor(x, y) {
    
    //declares and initializes constructor variable for x position of boat
    this.x = x;
    this.y = y;
    this.angle = 0;
     this.x = windowWidth/2;
  }

  update() {
    //gradually increments x position of boat on the canvas
    //this.x = 500;
    //this.pos.add(this.vel);
    
  }

  display(imgP) {
    //push function to save current boat drawing settings
    push();
    //moves current x and y boat position over from top left of canvas to middle left
    translate(this.x, this.y);
    fill(0);
    ellipse(0,0,20);
    //makes the boat tilt and rotate on the canvas
    rotate(this.angle);

      ////displays the body of the boat as a quadrangle with a red color hahahahaha
      //noStroke();
      //fill('black');
      //quad(-150, -50, 150, -50, 100, 50, -100, 50);
      image(imgP,-100,-80);; // imagem do barco 

        
    //pop function to restore current boat drawing settings
    pop();
  }
}

//creates and uses a class for the ocean waves
class Wave {
  constructor(y) {
    //declares and initializes constructor variable for y position of wave
    this.y = y;
  }

  update() {
    //begins drawing of wave shape on the canvas
    beginShape();
    //displays ocean waves as a dark blue color without strokes
    noStroke();
    fill(70,130,180);
    //declares variable for x value offset of wave movement
    let xoff = 0;
    //for loop to create wave form and movement
    for (let x = 0; x <= width; x += 1) {
      //increases intensity and height of wave along with slider adjustment
      let y = this.y - noise(xoff, yoff) * 120 * mic.getLevel()*5;
      vertex(x, y);
      //increases tilt and rotation of boat along with slider adjustment
      boat.angle = map(sin(y), -6, 6, -0.08, 0.08);
      //gradually increments x position offset of wave form and movement
      xoff += 0.01;
    }
    //gradually increments y position offset of wave form and movement
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);
    //ends drawing of wave shape on the canvas
    endShape(CLOSE);
    //declares and initializes variable for x position offset of boat
    let boatxOff = boat.x * 0.01;
    //increases intensity and height of boat along with slider adjustment
    boat.y = this.y - noise(boatxOff, yoff) * 120 * mic.getLevel()*5;
  }
 }



function Sereia(){
  //displays the sketch with a cyan background
  background(200);
  //object class function to display the boat on the canvas
  boat.display(img);
  //object class function to display the boat's action updates
  boat.update();
  //object class function to display the wave's action updates
  wave.update();
  var vol = mic.getLevel();
  console.log(vol);
  phase = 2;
  
}

function Iniciando(){
  //sets default angle measurement mode to radians
  angleMode(RADIANS);
  //creates canvas size for running the sketch
  //createCanvas(1000, 700);
  //creates new ocean wave object with an amplitude, period, and phase
  wave = new Wave(350);
  //creates new boat object with an x and y position on the canvas
  boat = new Boat(0, 500);

}