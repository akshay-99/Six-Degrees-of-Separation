var queue = [];
var visited = new Set([]);
var profilepics = {}
var degreesobj = {}
var bfs = async function(s)
{
        queue = []
        s = s+' 0'+' '+s;
        queue.push(s) 
        visited.add(s[0])
        
  
        while (queue.length > 0){
  
            
            s = queue.shift()
            splitted = s.split(' ')
            console.log (splitted[0]+'\t\t'+splitted[1]+'\t\t'+splitted[2]);
            imgurl = await fetch("https://api.github.com/users/"+splitted[0]+"/followers", {
                headers: {
                    Authorization: "Basic "+btoa('akshay-99:295b0e1bdd1e8b05619eee8a7a50d3fa7912f99c')
                }
            });
            imgurl = await imgurl.json().avatar_url;

            profilepics[splitted[0]] = imgurl;
            
            adduser(splitted[0], splitted[1], splitted[2])
            if(degreesobj[splitted[1]])
            {
                degreesobj[splitted[1]].push(splitted[0]);
            }else{
                degreesobj[splitted[1]]=[]
                degreesobj[splitted[1]].push(splitted[0]);
            }

            f = await fetch("https://api.github.com/users/"+splitted[0]+"/followers", {
                headers: {
                    Authorization: "Basic "+btoa('akshay-99:295b0e1bdd1e8b05619eee8a7a50d3fa7912f99c')
                }
            });
            f = await f.json()
            foll_list = []
            f.forEach(element => {
                foll_list.push(element.login);
            });
            
            // fli = list(folr)
            foll_list.forEach(element => {
                if(!visited.has(element)) {
                    queue.push(element+ ' '+(parseInt(splitted[1])+1)+' '+splitted[2]+'_'+element)
                    visited.add(element)
                }
            });
        }
}

