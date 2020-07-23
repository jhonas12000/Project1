(function(doc){

                         
    let start = function(){
        finished = false;
        changePlayer();
    }  		
    newGame = function(message){
        if (confirm(message)){
            start();
            forAllCells(emptyField);
        }
    }        
    element = function(id){
        return doc.getElementById(id);
    }
    value = function(el){
        return element(el).innerHTML;
    }                        
    cell = function(i,j){
        return element("c-"+i+"-"+j);
    }       
    forAllCells = function(action){
        for (let t = 1;t<7;t++){
            for (let counter2 = 1;counter2<8;counter2++){
                action(t,counter2);
            }
        }
    }                     
    sameColor = function(i,j){
        return testClass(i,j,players[current]);
    }                        
    changePlayer = function(){
        element("c").innerHTML = players[current = (current + 1) % 2];
    }                           
    horizontalWon = function(i,j){
        for(let min=j-1;min>0;min--) {
            if(!sameColor(i,min))
            break;
        }					
        for(let max=j+1;max<8;max++) {
            if(!sameColor(i,max))
            break;
        }
        return max-min>4;
    }
                                
    verticalWon = function(i,j){
        for(let max=i+1;max<7;max++) {
            if(!sameColor(max,j))break;
        
        }
        return max-i>3;
    }                        
    diagonalLtrWon = function(i,j){
        for(let min=i-1,t=j-1;min>0;min--,t--) {
            if(t<1||!sameColor(min,t))break;
        }
        
        for(let max=i+1,t=j+1;max<7;max++,t++) {
            if(t>7||!sameColor(max,t))break;
        }
        
        return max-min>4;
    }                      
    diagonalRtlWon = function(i,j){
        for(let min=i-1,t=j+1;min>0;min--,t++) {
            if(t>7||!sameColor(min,t))
            break;
        }
        
        for(let max=i+1,t=j-1;max<7;max++,t--) {
            if(t<1||!sameColor(max,t))
            break;
        }
        
        return max-min>4;
    }        
    colorField = function(i,j,color){
        cell(i,j).className = color;
    }                      
    emptyField = function(i,j){
        colorField(i,j,'');
    }
    testClass = function(i,j,value){
        return cell(i,j).className == value;
    }
    addCellBehavior = function(i,j){
        cell(i,j).onclick = function(j){
            return function(){
                if(!finished){
                    for (let t = 6;t>0;t--){
                        if(testClass(t,j,'')){
                            colorField(t,j,players[current]);
                            
                            break;
                        }
                    }
                }
            }
        }(j);
    }
    players = [value("a"),value("b")],         
    current = 0,
    newGameMessage = value("n"),
    wonMessage = value("w"),
    //finished;
    start();
    forAllCells(addCellBehavior);
    element("start").onclick = function(){
        newGame(newGameMessage)
    };
}) (document)