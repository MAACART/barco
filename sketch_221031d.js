
// baseado nos trabalhos de David Leyva: https://wp.nyu.edu/davidaleyva/assignment-4-oscillation/ 
//e de Cris Duarte e Rolf Simoes: https://github.com/crisduarte/pintando-com-a-voz
//Agradecimentos especiais ao mestre Sergio Venancio


//declares variable for the ocean wave
let wave;
//declares variable for the boat
let boat;
//declares variable for y value offset of wave movement
let yoff = 0;
// entrada de microfone
let mic;
var img;


var modal;
var modalOn;

var pos;

var canvas;
var cor;

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
  fill(70,130,180, 60);

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
  text('Syreni', width / 2, height / 3);
  text('toque para ligar seu microfone', width / 2, height / 2);
  text(' touch to start microphone', width / 2, height / 1.5);
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


function toggleModal() {
  if(modalOn) {
    modal.hide();
    modalOn = false;
  } else {
    modal.show();
    modalOn = true;
  }
}

function windowResized() {
  
    pos = canvas.position();
    slider.position(pos.x,pos.y+35);
    daytxt.position(pos.x+15,pos.y+60);
    acctxt.position(pos.x+15,pos.y);
    info.position(pos.x+15,pos.y+height-30);
    modal.position(pos.x,pos.y);
    modal.size(width,height);
    //close.position(15,height-30);
  
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
      
    //NOVO - COMEÇO
  translate(0,110);
  fill(255,255,255, 0);
 if (mouseButton == LEFT) {
    fill(70,130,180, 1000 /*trocar esse valor para transparência*/);
  }
  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.06;
  }
  // increment y dimension for noise
  yoff += 0.0005;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
//NOVO - FIM

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


    cor = mic.getLevel()*1000; 
    console.log( "nossa cor esta aqui" + cor  );

    //begins drawing of wave shape on the canvas
    beginShape();
    //displays ocean waves as a dark blue color without strokes
    noStroke();
    fill(70- cor,130- cor,180 - cor);
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
  background(255 - cor);
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

   pos = canvas.position();// posicao p botao

  info = createButton(' ');
  info.class('assets/infobtn');
  info.position(pos.x+15,pos.y+height-30);
  info.mousePressed(toggleModal);

  modal = select('#modal');
  modal.position(pos.x,pos.y)
  modal.size(width,height);
  modal.hide();
  modalOn = false;

  close = createButton(' ');
  close.class('assets/closebtn');
  close.position(15,height-30);
  close.parent("modal")
  close.mousePressed(toggleModal);

}
