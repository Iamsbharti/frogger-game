document.addEventListener('DOMContentLoaded',()=>{
   //get elements
    const squares = document.querySelectorAll('.grid div')
    const timeLeft = document.querySelector('#time-left')
    const resultDisplay = document.querySelector('#result')
    const startBtn = document.querySelector('#button')
    const carsLeft = document.querySelectorAll('.car-left')
    const carsRight = document.querySelectorAll('.car-right')
    const logsLeft = document.querySelectorAll('.log-left')
    const logsRight = document.querySelectorAll('.log-right')

   //initialize game
    let width = 9
    let currentIndex = 76
    let timerId
    let currentTime = 20
   //render frong on starting block
   // squares[currentIndex].classList.add('frog')

   //write function to move the frog based on arrow keys
    function moveFrog(e){
      //remove frong class from existing block
        squares[currentIndex].classList.remove('frog')

        switch(e.keyCode){
            case 37:
                if(currentIndex % width !==0) currentIndex -=1
                break;
            case 38:
                if(currentIndex - width >= 0) currentIndex -= width
                break;
            case 39:
                if(currentIndex % width < width -1) currentIndex +=1
                break;
            case 40:
                if(currentIndex + width < width * width) currentIndex += width
                break;
        }

     //add frong class to new frog's index
        squares[currentIndex].classList.add('frog')
     //check if frog movement has led to win/loose
        win()
        loose()
    }

   //move cars
    function autoMoveCars(){
        carsLeft.forEach(carLeft => moveCarsLeft(carLeft))
        carsRight.forEach(carRight => moveCarsRight(carRight))
    }
   //move the car left on a time loop
    function moveCarsLeft(carLeft){
        switch(true){
            case carLeft.classList.contains('c1'):
                carLeft.classList.remove('c1')
                carLeft.classList.add('c2')
                break;
            case carLeft.classList.contains('c2'):
                carLeft.classList.remove('c2')
                carLeft.classList.add('c3')
                break;
            case carLeft.classList.contains('c3'):
                carLeft.classList.remove('c3')
                carLeft.classList.add('c1')
                break;
        }
    }
  //move the car right on a time loop
    function moveCarsRight(carRight){
        switch(true){
            case carRight.classList.contains('c1'):
                carRight.classList.remove('c1')
                carRight.classList.add('c3')
            break;
            case carRight.classList.contains('c2'):
                carRight.classList.remove('c2')
                carRight.classList.add('c1')
            break;
            case carRight.classList.contains('c3'):
                carRight.classList.remove('c3')
                carRight.classList.add('c2')
            break;
        }
    }

  //move logs
    function autoMoveLogs(){
        logsLeft.forEach(logLeft => moveLogsLeft(logLeft))
        logsRight.forEach(logRight => moveLogsRight(logRight))
    }
  //move logs Left
    function moveLogsLeft(logLeft){
        switch(true){
            case logLeft.classList.contains('l1'):
                logLeft.classList.remove('l1')
                logLeft.classList.add('l2')
                break;
            case logLeft.classList.contains('l2'):
                logLeft.classList.remove('l2')
                logLeft.classList.add('l3')
                break;
            case logLeft.classList.contains('l3'):
                logLeft.classList.remove('l3')
                logLeft.classList.add('l4')
                break;
            case logLeft.classList.contains('l4'):
                logLeft.classList.remove('l4')
                logLeft.classList.add('l5')
                break;
            case logLeft.classList.contains('l5'):
                logLeft.classList.remove('l5')
                logLeft.classList.add('l1')
                break;
        }       
    }
  //move logs right
    function moveLogsRight(logRight){
        switch(true){
            case logRight.classList.contains('l1'):
                logRight.classList.remove('l1')
                logRight.classList.add('l5')
                break;
            case logRight.classList.contains('l2'):
                logRight.classList.remove('l2')
                logRight.classList.add('l1')
                break;
            case logRight.classList.contains('l3'):
                logRight.classList.remove('l3')
                logRight.classList.add('l2')
                break;
            case logRight.classList.contains('l4'):
                logRight.classList.remove('l4')
                logRight.classList.add('l3')
                break;
            case logRight.classList.contains('l5'):
                logRight.classList.remove('l5')
                logRight.classList.add('l4')
            
        }
    }
     
   //Rules to win 
    function win(){
        if(squares[4].classList.contains('frog')){
            resultDisplay.innerHTML='YOU WON!!'
            squares[currentIndex].classList.remove('frog')
            clearInterval(timerId)
            document.removeEventListener('keyup',moveFrog)
        }
    }
   //Rules to loose
    function loose(){
        if((currentTime === 0) || (squares[currentIndex].classList.contains('c1'))
          || (squares[currentIndex].classList.contains('l5'))  
          ||(squares[currentIndex].classList.contains('l4'))){
              resultDisplay.innerHTML='YOU LOOSE'
              resultDisplay.style.color = "red"
              squares[currentIndex].classList.remove('frog')
              clearInterval(timerId)
              document.removeEventListener('keyup',moveFrog)
        }
    }
   
  //move the frog when its on the log moving left
    function moveWithLogLeft(){
        //we got the index of log from the html's hardcoded divs
        if(currentIndex >=27 && currentIndex <35){
            squares[currentIndex].classList.remove('frog') 
            currentIndex +=1
            squares[currentIndex].classList.add('frog')
        }
    }
  //move the frog when its on the log movinf right
    function moveWithLogRight(){
        if(currentIndex > 18 && currentIndex <= 26){
            squares[currentIndex].classList.remove('frog')
            currentIndex -=1
            squares[currentIndex].classList.add('frog')
        }
    }
  //generate random HexColor
    const generateRandomColor = () =>{
        let hex = (Math.random() * 0xfffff * 1000000).toString(16)
        return '#' + hex.slice(0,6)
    }
  //a collective function which handles all the moving pieces
    function movePieces(){
        console.log('peices moved')
        currentTime--
        timeLeft.textContent = currentTime
        timeLeft.style.color = generateRandomColor()
        autoMoveCars()
        autoMoveLogs()
        moveWithLogLeft()
        moveWithLogRight()
        loose()
    }
  //start/pause the game
    startBtn.addEventListener('click',()=>{
        console.log('start clicked')
        if(timerId){
            clearInterval(timerId)
        }else{
            timerId = setInterval(movePieces,1000)
            document.addEventListener('keyup',moveFrog)
        }
    })

})