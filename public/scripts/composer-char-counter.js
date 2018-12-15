$(document).ready(function() {
  $('textarea#userInput').on("keyup", function(){
    var $textarea = $(this)
    var characterCount = $textarea.val().length
    var $counter = $textarea.siblings(".counter").text(140 - characterCount)
    var getElementOverCharLimit = document.getElementById("over-char-limit-error");
    var getElementNoChars = document.getElementById("no-chars-error");

    if (characterCount > 140){
      $textarea.siblings(".counter").css("color", "red")
      getElementNoChars.style.display = "none";
      getElementOverCharLimit.style.display = "contents";
    }
    else if (characterCount > 0){
      getElementNoChars.style.display = "none";
    }
    else {
      $textarea.siblings(".counter").css("color", "#244751")
      getElementOverCharLimit.style.display = "none";
    }
  })
});
