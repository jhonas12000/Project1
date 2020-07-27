(function(doc){

    //set the global variable so we can use them with in the function                    
    let start = function(){
        finished = false
        currentPlayer()
    }
    //a new game message pops up when you start the game
    // when it is confirmed by the player the game starts  		
    startGame = function(message){
        if (confirm(message)){
            start()
            boardCells(clearBoard)
        }
    }        
    element = function(id){ //select elements from the html
        return doc.getElementById(id)
    }
    //value between the html tags displayed in the game board
    input = function(el){ 
        return element(el).innerHTML
    } 
    //row and column of each cell in the board                       
    eachCell = function(i,j){
        return element("c-"+i+"-"+j)
    } 
    //access each cell of the board
    //2D iterate of each cell of the board
    boardCells = function(action){
        for (let t = 1;t<7;t++){
            for (let counter2 = 1;counter2<8;counter2++){
                action(t,counter2)
            }
        }
    }                     
    sameColor = function(i,j){
        return testClass(i,j,players[current])
    }                        
    currentPlayer = function(){
        element("c").innerHTML = players[current = (current + 1) % 2];
    } 
    
    //check if there is a winner
    //if there is no winner the function loops again
    //check four possible wins: vertical, horizontal, and diagonal
    //there could be two diagonal wins: left to right and right to left
    horizontalWinner = function(i,j){
        for( min=j-1;min>0;min--) { // checks same color right to left
            if(!sameColor(i,min))
            break
        }					
        for( max=j+1;max<8;max++) { // checks same color left to right 
            if(!sameColor(i,max))
            break
        }
        return max-min>4;
    }
      //set up vertical winner

    verticalWinner = function(i,j){
        for( max=i+1;max<7;max++) {  // checks same color bottom up
            if(!sameColor(max,j))
            break
        
        }
        return max-i>3
    } 
    //set up winner diagonal left to right                      
    diagonalLeftToright = function(i,j){
        for( min=i-1,t=j-1;min>0;min--,t--) {
            if(t<1||!sameColor(min,t))
            break
        }
        
        for( max=i+1,t=j+1;max<7;max++,t++) {
            if(t>7||!sameColor(max,t))
            break
        }
        
        return max-min>4
    } 
    
    // set up winner of diagonal right to left
    diagonalRightToLeft = function(i,j){
        for(let min=i-1,t=j+1;min>0;min--,t++) {
            if(t>7||!sameColor(min,t))
            break
        }
        
        for(let max=i+1,t=j-1;max<7;max++,t--) {
            if(t<1||!sameColor(max,t))
            break
        }
        
        return max-min>4
    }      
    activePlayer = function(i,j,color){
        eachCell(i,j).className = color
    }                      
    clearBoard = function(i,j){
        activePlayer(i,j,'')
    }
    testClass = function(i,j,value){
        return eachCell(i,j).className == value
    }
//when the board is active
//one player color drops to the bottom of the board
    activeBoard = function(i,j){
        eachCell(i,j).onclick = function(j){
            return function(){
                if(!finished){
                    for (let t = 6;t>0;t--){ //fills bottom to top in a clicked column
                        if(testClass(t,j,'')){
                            activePlayer(t,j,players[current])
                            //the game board is no active anymore if any of the winnning condition has been met
                            //the board pops up the color of the winner
                            //otherwise the condition loops again
                            if(horizontalWinner(t,j) || verticalWinner(t,j) || diagonalLeftToright(t,j) || diagonalRightToLeft(t,j)){
                                finished = true
                                startGame(winner.replace("%s",players[current]));
                            } else {
                                currentPlayer()
                            }
                            break
                        }
                    }
                }
            }
        }(j)
    }
    players = [input("player1"),input("player2")],         
    current = 0,
    popUpStart = input("new-game"),
    winner = input("winner"),
    //finished;
    start()
    boardCells(activeBoard);
    element("start").onclick = function(){
        startGame(popUpStart)
    }
}) (document)