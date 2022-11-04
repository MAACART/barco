// baseado no trabalho de David Leyva: https://wp.nyu.edu/davidaleyva/assignment-4-oscillation/
// Mic Input: https://p5js.org/examples/sound-mic-input.html

//declares variable for the ocean wave
let wave;
//declares variable for the boat
let boat;
//declares variable for y value offset of wave movement
let yoff = 0;
//declares variable for the slider object
let slider;

// entrada de microfone
let mic;

let img;

function preload() {
  img = loadImage("assets/barco.png");
}

function setup() {
  //sets default angle measurement mode to radians
  angleMode(RADIANS);
  //creates canvas size for running the sketch
  createCanvas(1000, 700);
  //creates new ocean wave object with an amplitude, period, and phase
  wave = new Wave(350);
  //creates new boat object with an x and y position on the canvas
  boat = new Boat(0, 500);
 
   
  mic = new p5.AudioIn(); 
  mic.start();
}

function draw() {
  //displays the sketch with a cyan background
  background(200);
  //object class function to display the boat on the canvas
  boat.display();
  //object class function to display the boat's action updates
  boat.update();
  //object class function to display the wave's action updates
  wave.update();
  var vol = mic.getLevel();
  console.log(vol);
}

//creates and uses a class for the boat object
class Boat {
  constructor(x, y) {
    
    //declares and initializes constructor variable for x position of boat
    this.x = x;
    this.y = y;
    this.angle = 0;
     this.x = 500;
  }

  update() {
    //gradually increments x position of boat on the canvas
    //this.x = 500;
    //this.pos.add(this.vel);
    
  }

  display() {
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
        
    //pop function to restore current boat drawing settings
    image(img, 0, 0);
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
    fill(255);
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
