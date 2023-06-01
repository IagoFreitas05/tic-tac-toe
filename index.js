let actualSide = 0;
const circleImage = "./assets/available.png";
const cancelImage = "./assets/cancel.png";
let plays = [];
let alreadyClicked = [];
let matriceGame = [
    [0, 0, 0], 
    [0, 0, 0],
    [0, 0, 0]
    ];
const allEqual = arr => arr.every(val => val === arr[0]);

function clickThebox(event){
    if(!alreadyClicked.includes(event.id)){
        alreadyClicked.push(event.id)
        if(actualSide % 2 == 0){
            const circleComponent = document.createElement("img");
            circleComponent.src = circleImage;
            document.getElementById(event.id).appendChild(circleComponent);
            plays.push({id:event.id, player: "circle"});
            let matriceCoordinate = handleCoordinates(event.id);
            setValueToCoordinate("O", matriceCoordinate);
        }else{
            const cancelComponent = document.createElement("img");
            document.getElementById(event.id).appendChild(cancelComponent);
            cancelComponent.src = cancelImage;
            plays.push({id:event.id, player: "cancel"});
            let matriceCoordinate = handleCoordinates(event.id);
            setValueToCoordinate("X", matriceCoordinate);
        }
        verifyWinner();
        console.table(matriceGame);
        actualSide += 1;
    }
    
}

function verifyWinner(){
    for(indexLine = 0; indexLine <= 2; indexLine++){
        if(matriceGame[indexLine][0] !== 0 && matriceGame[indexLine][1] !==0 && matriceGame[indexLine][2] !==0){
            if(matriceGame[indexLine][0] === matriceGame[indexLine][1] && matriceGame[indexLine][1] === matriceGame[indexLine][2]){
                callWinner(matriceGame[indexLine][0]);
            }
        }
    }

    for(indexColumn = 0; indexColumn <= 2; indexColumn++){
        if(matriceGame[0][indexColumn] !== 0 && matriceGame[1][indexColumn] !==0 && matriceGame[2][indexColumn] !==0){
            if(matriceGame[0][indexColumn] === matriceGame[1][indexColumn] && matriceGame[1][indexColumn] === matriceGame[2][indexColumn]){
                callWinner(matriceGame[0][indexColumn]);
            }
        }
    }

    if(matriceGame[0][0] !== 0 && matriceGame[1][1] !==0 && matriceGame[2][2] !==0){
        if(matriceGame[0][0] === matriceGame[1][1] && matriceGame[2][2] === matriceGame[2][2]){
            callWinner(matriceGame[0][0]);
        }
    }

    if(matriceGame[2][0] !== 0 && matriceGame[1][1] !==0 && matriceGame[0][2] !==0){
        if(matriceGame[2][0] === matriceGame[1][1] && matriceGame[2][0] === matriceGame[0][2]){
            callWinner(matriceGame[2][0]);
        }
    }

    
}

function resetRound(){
    actualSide = 0;
    alreadyClicked = [];

    for(indexLine = 0; indexLine <= 2; indexLine++){
        for(indexColumn = 0; indexColumn <= 2; indexColumn++){
            let parentElement = document.getElementById(`${indexLine}-${indexColumn}`);
            let childElement = parentElement.querySelector("img");
            if (childElement) {
                 parentElement.removeChild(childElement);
           }
        }
    }

    matriceGame = [
        [0, 0, 0], 
        [0, 0, 0],
        [0, 0, 0]
        ];
}

function handleCoordinates(eventId){
    let matriceCoordinateString = eventId.split("-");
    let matriceCoordinate =  matriceCoordinateString.map(str => {
        return parseInt(str, 10);
    });

    return matriceCoordinate;
}

function setValueToCoordinate(value, matriceCoordinate){
    matriceGame[ matriceCoordinate[0] ][ matriceCoordinate[1] ] = value;
}

function callWinner(winner){
    alert(`we have a winner, congratulations ${winner}`);
    resetRound();
}


function plusScore(){

}