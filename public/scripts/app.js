  // var moment = require('moment');

$(document).ready(function() {

  // var moment = require('moment');

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

$('.new-tweet').hide()

  $('.compose-button-box').on('click', function () {
    $(".new-tweet").slideToggle();
    $("#userInput").focus();
  });

  $("#userInput").focus()


function toggleNoTextError(){
  var getElementNoChars = document.getElementById("no-chars-error");
  getElementNoChars.style.display = "contents";
}

function toggleNoTextError(){
  var getElementNoChars = document.getElementById("no-chars-error");
  getElementOverCharLimit.style.display = "contents";
}


var $form = $('#formSubmit');

$form.submit(function (event) {
  console.log("This is event: ", event)
  event.preventDefault();
  console.log("This is $this: ", $(this))
  var formData = $(this).serialize();
  console.log("This is formData (this serialize): ", formData)
 var inputValidation = $('#userInput').val();

 if (inputValidation.length === 0){
  toggleNoTextError();
 }
 else if (inputValidation.length > 140){
  toggleOverCharLimitError();
 }
else {
  $.ajax('/tweets', { method: 'POST', data: formData}).done(function(data) {
  console.log('done')
  $('#userInput').val('').focus();
  $('.counter').text(140)
  // console.log(inputValidation.length = 140);
  loadTweets()
  })
}
})

  function loadTweets(){
    $.ajax('/tweets', { method: 'GET'}).done(function(incomingData){
      console.log(incomingData)
      $('.overall-tweets-box').empty()
      console.log("incoming data: ", incomingData);
      var orderedTweets = incomingData
      renderTweets(incomingData);
    })
  }

  function renderTweets(input){
    input.forEach(function(individualUsers){
      var individualTweet = createTweetElement(individualUsers);
      $('.overall-tweets-box').prepend(individualTweet)
    })
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

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

  renderTweets(data)
// loadTweets()

})
