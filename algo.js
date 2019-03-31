var queue = [];
var visited = new Set([]);
var profilepics = {}
var degreesobj = {}
var stop = false;

var bfs = async function(s)
{
        console.log('bfscalled');
        queue = []
        s = s+' 0'+' '+s;
        queue.push(s) 
        visited = new Set([]);
        visited.add(s.split(' ')[0])
        
  
        while (queue.length > 0 && !stop){
  
            
            s = queue.shift()
            splitted = s.split(' ')
            console.log (splitted[0]+'\t\t'+splitted[1]+'\t\t'+splitted[2]);
            
            
            adduser(splitted[0], splitted[1], splitted[2])
            foll_list = []
            try{
                f = await fetch("https://api.github.com/users/"+splitted[0]+"/followers?per_page=100", {
                    headers: {
                        Authorization: "Basic "+btoa('akshay-99:295b0e1bdd1e8b05619eee8a7a50d3fa7912f99c')
                    }
                });
                f = await f.json()
                f.forEach(element => {
                    foll_list.push(element.login);
                });
            }catch(error)
            {
                console.log(error);
                f = await fetch("https://api.github.com/users/"+splitted[0]+"/followers?per_page=100", {
                    headers: {
                        Authorization: "Basic "+btoa('akshay-99:295b0e1bdd1e8b05619eee8a7a50d3fa7912f99c')
                    }
                });
                f = await f.json()
                f.forEach(element => {
                    foll_list.push(element.login);
                });
            }
            
            // fli = list(folr)
            foll_list.forEach(element => {
                if(!visited.has(element)) {
                    queue.push(element+ ' '+(parseInt(splitted[1])+1)+' '+splitted[2]+'_'+element)
                    visited.add(element)
                }
            });

            await sleep(50);
        }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
