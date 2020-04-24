document.addEventListener('DOMContentLoaded',()=>{
   //get elements
    const squares = document.querySelectorAll('.grid div')
    const timeLeft = document.querySelector('#time-left')
    const resultDisplay = document.querySelector('#result')

   //initialize game
    let width = 9
    let currentIndex=76
    let timeId

   //render frong on starting block
    squares[currentIndex].classList.add('frog')

   //write function to move the frog based on arrow keys
    function moveFrog(e){
      //remove frong class from existing block
        squares[currentIndex].classList.remove('frog')

        switch(e.keyCode){
            case 37:
                if(currentIndex % width !==0) currentIndex -=1
                break;
            case 38:
                if(currentIndex - width >= 0) currentIndex-= width
                break;
            case 39:
                if(currentIndex % width < width -1) currentIndex +=1
                break;
            case 40:
                if(currentIndex + width < width * width) currentIndex +=width
                break;
        }

     //add frong class to new frog's index
        squares[currentIndex].classList.add('frog')

    }


})