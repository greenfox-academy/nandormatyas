'use strict';

var fruits = [
  'melon',
  'apple',
  'strawberry',
  'blueberry',
  'pear',
  'banana'
];

// Create a new array of consists numbers that shows how many times the 'e' letter
// occurs in the word stored under the same index at the fruits array!
// Please use the map method.
function eCounter(e){
  var count = 0;
  for(var i = 0; i < e.length;i++){
    if(e[i] === 'e'){
      count++;
    }
  }
  return count;

}
var eNums = fruits.map(eCounter);
console.log(eNums);
