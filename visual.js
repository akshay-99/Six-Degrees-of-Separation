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
    var cnv = createCanvas(canvasDiv.offsetWidth, window.innerHeight*0.7);
    cnv.parent('vis');
    cnv.mousePressed(mousePressedCanvas);
    rectMode(CENTER);
    
}

function mouseWheel(event) {
    zoom += sensitivity * event.delta;
    zoom = constrain(zoom, zMin, zMax);
    print(event.delta+' '+zoom);
    //uncomment to block page scrolling
    return false;
  }

function draw()
{
    background(200);
    translate(width/2+tx, height/2+ty);
    //translate(tx, ty);
    scale(zoom);
    
    
    if(run)
    {
        drawusers();
    }
    
    
    
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
        if(user.path.split('_').length-1 == 0) user.color='#00f';
        user.display();
    });
    
}


var stopalgo = function()
{
    stop=true;
}


var runalgo = async function()
{
    if(run)
    {
        stop = true;
        await sleep(1000);
        userlist=[];
        userdict={};
        data.radius=0;
        data.currentdeg=0;
        data.inthis=10;
        data.posangle=0;
        data.sangle=0;
        queue = [];
        visited = new Set([]);
        profilepics = {}
        degreesobj = {}
        
        stop = false;
    }
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
        this.x = this.radius* Math.cos(this.posangle);
        this.y = this.radius * Math.sin(this.posangle);
        this.color = '#fff';
        this.intermediate = path.split('_').slice(1, path.length-1);
        
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
                for(var i = 1; i<vertices.length; i++){
                    line(userdict[vertices[i-1]].x, userdict[vertices[i-1]].y, userdict[vertices[i]].x, userdict[vertices[i]].y)
                    if(i!=vertices.length-1)
                    {
                        userdict[vertices[i]].color='#ffac59'
                    }
                }

            }

            strokeWeight(1);
            stroke('black');
        }
}


function mousePressedCanvas() {
        console.log(zoom);
        donealready = false
		for (var i = 0; i < userlist.length; i++) {
			var useri = userlist[i];
            distance = dist(mouseX-width/2, mouseY-height/2, (useri.x)*zoom+tx, (useri.y)*zoom+ty);
            
			if (distance < 25*zoom && !donealready) {
				console.log('ssss '+(mouseX-width/2)+' '+(mouseY-height/2)+' '+useri.x+' '+distance);
                useri.color = '#f00';
                
                document.getElementById('infoh').innerHTML = '<a href="https://github.com/'+useri.user+'">@'+useri.user+'</a><br/>'
                document.getElementById('infop').innerHTML = 'Separation: '+useri.intermediate.length;
                donealready=true;
            } else {
				
                useri.color = '#fff';
                useri.intermediate.forEach(user => {
                    user.color='#fff';
                });
			}
		}
	
  // Prevent default functionality.
  return false;
}

function mouseDragged() {
	
    tx += mouseX-pmouseX;
    ty += mouseY-pmouseY;
				

  return false;
}