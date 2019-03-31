var run=0;
var userlist = [];
const data={
    radius:0,
    posangle:0,
    sangle:0,
    inthis:10,
    currentdeg:0
}

var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.005;
tx = 0;
ty = 0;

function setup()
{
    
    var canvasDiv = document.getElementById('vis');
    var width = canvasDiv.offsetWidth ;
    var cnv = createCanvas(width, width*0.7);
    cnv.parent('vis');
    
}

function mouseWheel(event) {
    zoom += sensativity * event.delta;
    zoom = constrain(zoom, zMin, zMax);
    print(event.delta+' '+zoom);
    //uncomment to block page scrolling
    return false;
  }

function draw()
{
    background(200);
    translate(tx, ty);
    scale(zoom);
    if(run)
    {
        drawusers();
    }
    
    
    
}
function mouseDragged() {
	
				tx += mouseX-pmouseX;
				ty += mouseY-pmouseY;
				

  return false;
}
function adduser(user, d, path)
{
    if( d > data.currentdeg)
    {
        data.radius+=100;
        data.currentdeg+=1;
    }
    userlist.push([user,  data.posangle, data.radius]);
    console.log(d+' '+data.currentdeg)
    data.posangle+=(360/data.inthis);
    if(data.posangle>360+data.sangle)
    {
        data.sangle = Math.floor(Math.random() * 20);   
        data.posangle = data.sangle;
        data.inthis+=2;
        data.radius+=60;
    }
}

function drawusers()
{

    userlist.forEach(user => {
        drawuser(user[0], user[1], user[2]);
    });
}



function drawuser(user, posangle, radius)
{
    posangle = posangle * (Math.PI/180)
    
    xpos = width*0.5 + radius* Math.cos(posangle);
    ypos = height*0.5 + radius * Math.sin(posangle);
    ellipse(xpos, ypos, 50, 50);
}

var runalgo = function()
{
    run = 1;
    bfs(document.getElementById('username').value);
}

class User{
    constructor(user, posangle, radius, path) {
        this.user = user
        this.posangle = posangle
        this.radius = radius
        this.path = path;
      }
    
      
    
      display() {
        this.posangle = this.posangle * (Math.PI/180)
    
        xpos = width*0.5 + this.radius* Math.cos(posangle);
        ypos = height*0.5 + this.radius * Math.sin(posangle);
        ellipse(xpos, ypos, 50, 50);
      }
}