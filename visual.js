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
var sensitivity = 0.005;
tx = 0;
ty = 0;

userdict = {

}

function setup()
{
    
    var canvasDiv = document.getElementById('vis');
    var width = canvasDiv.offsetWidth ;
    var cnv = createCanvas(window.innerWidth*0.95, window.innerHeight*0.8);
    cnv.parent('vis');
    cnv.mousePressed(mousePressedCanvas);
    rectMode(CENTER);
    
}

// function mouseWheel(event) {
//     zoom += sensitivity * event.delta;
//     zoom = constrain(zoom, zMin, zMax);
//     print(event.delta+' '+zoom);
//     //uncomment to block page scrolling
//     return false;
//   }

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
    //userlist.push([user,  data.posangle, data.radius]);
    nuser = new User(user,  data.posangle, data.radius, path);
    userlist.push(nuser);
    userdict[user]=nuser;
    //console.log(d+' '+data.currentdeg)
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
        if(user.color=='#fff')
            user.displaypath();
        else
            user.displaypathbold();
    });
    userlist.forEach(user => {
        user.display();
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
        this.posangle = this.posangle * (Math.PI/180);
        this.x = width*0.5 + this.radius* Math.cos(this.posangle);
        this.y = height*0.5 + this.radius * Math.sin(this.posangle);
        this.color = '#fff'
        
      }
    
      
      
      display() {
        //displaypath(this.path)
        fill(this.color);
        ellipse(this.x, this.y, 50, 50);
      }

      displaypath()
        {
            let vertices = this.path.split('_')
            
            //console.log(vertices)
            if(vertices.length >= 2)
                line(userdict[vertices[vertices.length-2]].x, userdict[vertices[vertices.length-2]].y, userdict[vertices[vertices.length-1]].x, userdict[vertices[vertices.length-1]].y);
        }

        displaypathbold()
        {
            let vertices = this.path.split('_')
            
            //console.log(vertices)
            strokeWeight(4);
            stroke('red');
            
            if(vertices.length >= 2)
            {
                for(var i = 1; i<vertices.length; i++)
                    line(userdict[vertices[i-1]].x, userdict[vertices[i-1]].y, userdict[vertices[i]].x, userdict[vertices[i]].y)
            }

            strokeWeight(1);
            stroke('black');
        }
}


function mousePressedCanvas() {
        console.log(zoom);
		for (var i = 0; i < userlist.length; i++) {
			var useri = userlist[i];
            distance = dist(mouseX, mouseY, useri.x+tx, useri.y+ty);
            
			if (distance < 25) {
				console.log('ssss '+mouseX+' '+tx+' '+useri.x+' '+distance);
                useri.color = '#f00';
                infop.innerHTML = '@'+useri.user+'<br/>'
			} else {
				
				useri.color = '#fff';
			}
		}
	
  // Prevent default functionality.
  return false;
}

