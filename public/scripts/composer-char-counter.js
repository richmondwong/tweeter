$(document).ready(function() {
  $('textarea#userInput').on("keypress", function(){
    var $textarea = $(this)
    var characterCount = $textarea.val().length
    var $counter = $textarea.siblings(".counter").text(140 - characterCount)

    if (characterCount > 140){
      $textarea.siblings(".counter").css("color", "red")
      alert("You've gone over 140 characters!")
    }
    console.log("This is length:", 140 - tweetStr)
    console.log("charCount test", charCount)
  })
});

