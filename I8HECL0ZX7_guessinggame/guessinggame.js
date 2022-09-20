let $ = function (id) {
    return document.getElementById(id)
  }
  
  //global variable
  const words = ["array", "boolean", "number", "string", "bigint", "undefined", "null"];
  // const images = ["https://m.media-amazon.com/images/I/81QNFsN73xL._AC_SL1500_.jpg", "https://m.media-amazon.com/images/I/715-EXqiokL._AC_SL1500_.jpg", "https://ak.picdn.net/shutterstock/videos/1036938524/thumb/1.jpg", "https://m.media-amazon.com/images/I/71PcRwi5gcS._AC_SL1500_.jpg"];
  let word;
  // const img = document.createElement("img")
  // const parent = $("img")
  let answerArray = [];
  let userGuess;
  let rightGuess = false;
  let userRightGuess = 0;
  let left = 9;
  let wins = 0;
  let losses = 0;
  
  
  //random word
  function random() {
    let random = Math.floor(Math.random() * words.length);
    word = words[random]
    // img.src = images[random]
  }
  
  //show blank start
  function showBlank() {
    for (i = 0; i < word.length; i++) {
        answerArray[i] = "_"
    }
    $("guess").innerHTML = answerArray.join(" ")
  }
  
  //guesses left
  function guessesLeft() {
    $("left").innerHTML = left
  }
  
  //wins
  function winsScore() {
    $("wins").innerHTML = wins
  }
  
  //losses
  function lossesScore() {
    $("losses").innerHTML = losses
  }
  
  //show wrong guess
  function wrongGuess(char) {
    $("wrong").innerHTML += char + ", "
  }
  
  // resent function
  function initialGame() {
    if ($("winImage")) {
        $("winImage").remove()
    }
  
    left = 9;
    answerArray = [];
    $("wrong").innerHTML = "";
    userRightGuess = 0
    rightGuess = false;
    guessesLeft()
    random()
    showBlank()
  }
  
  // call initial function
  initialGame()
  winsScore()
  lossesScore()
  
  //check letter
  function showLetter(char, str) {
    for (let j = 0; j < str.length; j++) {
        if (char === str[j]) {
            rightGuess = true
            answerArray.splice(j,1,char)
            userRightGuess++
        }
    }
    $("guess").innerHTML = answerArray.join(" ")
  }
  
  //check length
  let matchLength = function() {
    if (word.length === userRightGuess) return true
    else return false
  }
  
  //user guess
  document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();
  
    showLetter(userGuess, word)
    
    if (rightGuess) {
        rightGuess = false
        if (matchLength()) {
            let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/win.mp3');
            audio.play()
            // img.setAttribute("id","winImage")
            // parent.appendChild(img)
            wins++
            winsScore()
            setTimeout(initialGame, 2000)
        } else {
            let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3');
            audio.play()
        }
    } else {
        left--
        if (left < 1) {
            let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/lose.mp3');
            audio.play()
            initialGame()
            losses++
            lossesScore()
        } else {
            let audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3');
            audio.play()
            wrongGuess(userGuess)
            guessesLeft()
        }
  
    }
  }
  