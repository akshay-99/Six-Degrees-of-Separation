var queue = [];
var visited = new Set([]);
var bfs = async function(s)
{
        queue = []
        s = s+' 0';
        queue.push(s) 
        visited.add(s[0])
  
        while (queue.length > 0){
  
            
            s = queue.shift()
            splitted = s.split(' ')
            console.log (splitted[0]+'\t\t'+splitted[1] ) 
            //folr = map(lambda x:x['login'], requests.get('https://api.github.com/users/'+s[0]+'/followers', auth=('akshay-99', '295b0e1bdd1e8b05619eee8a7a50d3fa7912f99c')).json())
            // # folg = map(lambda x:x['login'], requests.get('https://api.github.com/users/'+s+'/following', auth=('akshay-99', '295b0e1bdd1e8b05619eee8a7a50d3fa7912f99c')).json())
            // # fli = set(list(folr)).union(set(list(folg)))
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
                    queue.push(element+ ' '+(parseInt(splitted[1])+1))
                    visited.add(element)
                }
            });
        }
}

var runalgo = function()
{
    bfs(document.getElementById('username').value);
}