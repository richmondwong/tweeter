$(document).ready(function() {
  $('textarea#userInput').on("keypress", function(){
    var $textarea = $(this)
    var characterCount = $textarea.val().length
    var $counter = $textarea.siblings(".counter").text(140 - characterCount)

    if (characterCount > 140){
      $textarea.siblings(".counter").css("color", "red")
      toggleOverCharLimitError()
      // alert("You've gone over 140 characters!")
    }
  })

 function toggleOverCharLimitError(){
  var getElement = document.getElementById("over-char-limit-error");
  if (getElement.style.display === "none"){
    getElement.style.display = "contents";
  }
  else {
    getElement.style.display = "none";
  }
}

});

