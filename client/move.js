var socket;
// circle constructor
function MakeCircle(xPos,yPos,diameter) {
  this.x = xPos;
  this.y = yPos;
  this.d = diameter;
}


function drawLoc (location) {
    ellipse(location.x,location.y,location.d,location.d);
}

//canvas
function setup() {
  socket = io();
  createCanvas(600, 400);
    background("black");

    socket.on("joined", function(color){
      console.log(color);
      socket.emit('color', color);
      paint(color);
    });
}

function paint(color) {
    fill(color);
}

var circle = new MakeCircle(300, 200, 20);
function draw() {

  ellipse(circle.x,circle.y,circle.d,circle.d);
  if (keyIsDown(RIGHT_ARROW)){
  circle.x += 5;
  }
  if (keyIsDown(LEFT_ARROW)){
  circle.x -= 5;
  }
  if (keyIsDown(UP_ARROW)){
  circle.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)){
  circle.y += 5;
  }
  socket.emit("loc", circle);

  socket.on("color", function(color){
  fill(color);
  });
  socket.on("loc", function (data) {
  drawLoc(data);
  });

};


//join game
$('.join').on('click',function(event){
  event.preventDefault();
socket.emit("signup", {
  name: $("#name").val() ,
  color: $("#color").val()
});
$('#form1').trigger('reset');
});
