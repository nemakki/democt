
let capture;
let w = 320;
let h = 240;
let trackColor;

function setup() {
  canvas = createCanvas(400, 400);
  
  canvas.parent("sketch");
  capture = createCapture(VIDEO);
  capture.hide();
  
  trackColor = [255, 0, 0];
  
  
}

function draw() {
  background(220);
    image(capture, 0, 0, w, h);
  capture.loadPixels();
  
  let highValue = 500;
  
  let closestX = 0;
  let closestY = 0;
  
  for (let y = 0; y < h; y ++){
    for (let x = 0; x < w; x ++){
      
      let index = (x + y*w)*4;
      
      //grab current color from the webcam feed
      let r1 = capture.pixels[index];
      let g1 = capture.pixels[index+1];
      let b1 = capture.pixels[index+2];
      
      //set the color values for the track color
      //based on the color we select with our mouse
      let r2 = trackColor[0];
      let g2 = trackColor[1];
      let b2 = trackColor[2];
      
      let distance = dist(r1, g1, b1, r2, g2, b2);
      
      if(distance < highValue){
        highValue = distance;
        closestX = x;
        closestY = y;
      }
      
    }
  }
  
  if(highValue < 50){
    fill(trackColor);
    strokeWeight(3.0);
    stroke(0);
    
    ellipse(closestX, closestY, 16, 16);
  }



}

function mousePressed(){
  
  trackColor = capture.get(mouseX, mouseY);
  print(trackColor);
  
}
