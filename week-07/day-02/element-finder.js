'use strict';

// Check if the array contains "7" if it contains print "Hoorray" otherwise print "Noooooo"

var numbers = [1,2,3,4,5,6,8];

if(7 in numbers){
  console.log('Hooray');
}else{
  console.log('Noooo')
}