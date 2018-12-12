/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = {
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
}



function createTweetElement(input){
var appendedHTML =
 ` <article class="fresh-tweet-box">
    <header class="fresh-tweet-header">
      <img src="" class="tweet-photos">
      <div class="enclose-name-handle">
        <span class="tweet-owner-box">${input["user"]["name"]}</span>
        <span class="handle-name-box">${input["user"]["handle"]}</span>
    </div>
    </header>
      <span class="actual-tweet"> ${input["content"]["text"]}</span>
    <footer class="fresh-tweet-footer">
      <span class="tweet-days"> ${input["created_at"]} </span>
  <span class="icons-box">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </span>
    </footer>
  </article>`
return appendedHTML
}

$(document).ready(function() {

var $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.overall-tweets-box').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})