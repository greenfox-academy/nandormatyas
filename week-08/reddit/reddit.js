'use strict';

//var link = 'https://time-radish.glitch.me/posts/';
var link = 'http://localhost:3000/posts/';

function connectAndGetDataBackParsed(){
  var http = new XMLHttpRequest();
  http.open('GET', link, true);
  http.setRequestHeader('Accept', 'application/json');
  http.onreadystatechange = function(){
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      console.log('ready state: done');
      console.log('http status: ok');
      var data = http.responseText;
      data = JSON.parse(data).posts;
      console.log(data);
      threadCreator(data);
    } else {
      console.log('There was a problem with the request.');
    };
  }
  http.send();
}
connectAndGetDataBackParsed()

function threadSetUp(index, data){
  var forum = document.querySelector('.forum');
  var thread = document.createElement('div');
  forum.appendChild(thread);
  thread.classList.add('thread', data[index].id);
  
}

function counterAndContentSetUp (index, data){
  
  var newThread = document.querySelectorAll('.thread');
  
  var counter = document.createElement('div');
  newThread[index].appendChild(counter);
  counter.setAttribute('class', 'counter');
  
  var content = document.createElement('div');
  newThread[index].appendChild(content);
  content.setAttribute('class', 'content');

  var deleteButton = document.createElement('div');
  newThread[index].appendChild(deleteButton);
  deleteButton.classList.add('delete_button', data[index].id);
  deleteButton.innerHTML = 'DEL';
  
  deleteButton.onclick = function() {
    var currentId = deleteButton.classList.item(1);
    var forum = document.querySelector('.forum');
    var thread = document.querySelectorAll('.thread');
    thread.forEach(function(e) {
      if(e.classList.item(1) === currentId){
        var toRemove = forum.querySelector('.' + CSS.escape(e.classList.item(1)));
        forum.removeChild(toRemove);
        deleteData(currentId)
      }
    }
  )}
}

function counterSetUp (index, data){
  
  var counter = document.querySelectorAll('.counter');
  
  var buttonUp = document.createElement('div');
  counter[index].appendChild(buttonUp);
  buttonUp.classList.add('button_up', 'index' + index, data[index].id);

  buttonUp.onclick = function() {
      var currentId = score.classList.item(2);
      score.innerHTML++;
      var postScore = {
        'id': currentId,
        'score': score.innerHTML,
      }
      postData(postScore, currentId, 'upvote');
  }


  var score = document.createElement('div');
  counter[index].appendChild(score);
  score.classList.add('score', 'index' + index, data[index].id);
  score.innerHTML = data[index].score;

  var buttonDown = document.createElement('div');
  counter[index].appendChild(buttonDown);
  buttonDown.classList.add('button_down', 'index' + index, data[index].id);

  buttonDown.onclick = function () {
        var currentId = score.classList.item(2);
        score.innerHTML--;
        var postScore =  {
          'id': currentId,
          'score': score.innerHTML,
        };
        postData(postScore, currentId, 'downvote');
    }
  }



function contentSetUp (index, data){
  
  var content = document.querySelectorAll('.content');

  var title = document.createElement('div');
  content[index].appendChild(title);
  title.setAttribute('class', 'title');
  title.innerHTML = data[index].title;

  var url = document.createElement('a');
  title.appendChild(url);
  url.setAttribute('href', data[index].url);
  url.innerHTML = data[index].url;

  var poster = document.createElement('div');
  content[index].appendChild(poster);
  poster.setAttribute('class', 'poster');
  if(data[index].owner === null){
    poster.innerHTML = 'anonymous'
  }else{
    poster.innerHTML = data[index].owner;
  }

  var timestamp = document.createElement('div');
  content[index].appendChild(timestamp);
  timestamp.setAttribute('class', 'timestamp');
  var inHours = data[index].timestamp;
  timestamp.innerHTML = inHours / 3600000;
}

function threadCreator (data){
  for(var i = 0; i < data.length;i++){
    threadSetUp(i, data);
    counterAndContentSetUp(i, data);
    counterSetUp(i, data);
    contentSetUp(i, data);
  }
}

function postData(data, id, vote){
  var http = new XMLHttpRequest();
  http.open('PUT',link + id + '/' + vote , true);
  http.setRequestHeader('Accept', 'application/json');
  http.setRequestHeader('Content-Type', 'application/json');
  http.onreadystatechange = function(){
    if (http.readyState === XMLHttpRequest.DONE) {
      console.log('ready state: done');
      if (http.status === 200) {
        console.log('http status: ok');
        var data = http.responseText;
      }
    }
  }
  data = JSON.stringify(data);
  http.send(data);
}

function deleteData(id) {
  var linkDel = link + id;
  var http = new XMLHttpRequest();
  http.open("DELETE", linkDel, true);
  http.setRequestHeader('Accept', 'application/json');
  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status == "200") {
      console.log('Delete done');
    } else {
      console.log('Error');
    }
  }
  http.send();
}