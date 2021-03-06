const data = `Phasianus colchicus;9442;Fuscia
Pedetes capensis;2869;Puce
Recurvirostra avosetta;4285;Fuscia
Kobus defassa;4726;Red
Anser anser;8163;Violet
Callipepla gambelii;4422;Fuscia
Ara ararauna;7935;Aquamarine
Ara ararauna;3081;Crimson
Pelecanus conspicillatus;9831;Mauv
Cynictis penicillata;839;Puce
Graspus graspus;9814;Indigo
Vicugna vicugna;6439;Violet
Lemur catta;2023;Pink
Tragelaphus scriptus;986;Aquamarine
Corythornis cristata;4995;Red
Sitta canadensis;6786;Puce
Sus scrofa;9338;Goldenrod
Psophia viridis;8881;Yellow
Gabianus pacificus;7714;Aquamarine
Sus scrofa;6449;Orange
Pteropus rufus;5816;Yellow
Macropus agilis;1241;Teal
Pavo cristatus;5860;Violet
Corythornis cristata;5358;Khaki
Loris tardigratus;725;Orange`;

// Convert the above string (which is in CSV format) to an array of objects
// Columns should map to the following object:
//  { name: "Macropus agilis", id: 1241, color_code: "Teal" }
var lines = data.split('\n');
function seperate(line){
  var seperated = line.split(';');
  return seperated;
}
function objectCreate(raw){
  raw = {'name': raw[0],
         'id': raw[1],
         'color_code': raw[2]};
  return raw;
}
var pieces = lines.map(seperate);
var obj = pieces.map(objectCreate);
console.log(obj.length);
var resArr = [];
obj.filter(function(item){
  var i = resArr.findIndex(x => x.name == item.name);
  if(i === -1){
        resArr.push({name: item.name, id: item.id, color_code: item.color_code});
  }
  return null;
});
console.log(resArr.length);


// Remove all duplicates based on their name, always keep the first one
// Don't use for or forEach