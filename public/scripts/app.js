$(document).ready(function() {

// Load existing tweets even upon page refresh
loadTweets();

// Hide Compose Tweet box upon page refresh
$('.new-tweet').hide();

// Toggle Compose Tweet box and autofocus cursor in textarea
$('.compose-button-box').on('click', function () {
  $(".new-tweet").slideToggle();
  $("#userInput").focus();
});

$("#userInput").focus();

// Functions for toggling error messages (Over Character Limit / No Text) on/off
function toggleNoTextError(){
  var getElementNoChars = document.getElementById("no-chars-error");
  getElementNoChars.style.display = "contents";
};

function toggleOverCharLimitError(){
  var getElementOverCharLimit = document.getElementById("no-chars-error");
  getElementOverCharLimit.style.display = "contents";
};

function toggleNoTextErrorOff(){
  var getElementOverCharLimit = document.getElementById("no-chars-error");
  getElementOverCharLimit.style.display = "none";
};

// Form submission AJAX call. Makes checks to toggle Over Character Limit and No Text Entered error messages.
var $form = $('#formSubmit');
$form.submit(function (event) {
  event.preventDefault();
  var formData = $(this).serialize();
  var inputValidation = $('#userInput').val();

  if (inputValidation.length === 0){
    toggleNoTextError();
  }
  else if (inputValidation.length > 140){
    toggleOverCharLimitError();
    toggleNoTextErrorOff();
  }
  else {
    $.ajax('/tweets', { method: 'POST', data: formData}).done(function(data) {
    toggleNoTextErrorOff();
    $('#userInput').val('').focus();
    $('.counter').text(140);
    loadTweets();
    })
  }
});

// Loads tweets from Mongo server
function loadTweets(){
  $.ajax('/tweets', { method: 'GET'}).done(function(incomingData){
    $('.overall-tweets-box').empty();
    var orderedTweets = incomingData;
    renderTweets(incomingData);
  })
};

// Render tweets onscreen
function renderTweets(input){
  input.forEach(function(individualUsers){
  var individualTweet = createTweetElement(individualUsers);
  $('.overall-tweets-box').prepend(individualTweet);
  })
};

// Escapes Cross Site Scripting vulnerabilities
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creates HTML for the new tweet that will be posted
function createTweetElement(input){
  var tweet =
  ` <article class="fresh-tweet-box">
        <header class="fresh-tweet-header">
          <img class="tweet-photos">
          <div class="enclose-name-handle">
            <span class="tweet-owner-box">${input["user"]["name"]}</span>
            <span class="handle-name-box">${input["user"]["handle"]}</span>
        </div>
        </header>
          <span class="actual-tweet"> ${escape(input["content"]["text"])}</span>
        <footer class="fresh-tweet-footer">
          <span class="tweet-days"> Sent ${escape(moment(input["created_at"]).fromNow())} </span>
      <span class="icons-box">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
        </footer>
      </article>`
 return tweet;
  }
});