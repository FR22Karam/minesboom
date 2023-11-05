const row_num=10;
const col_num=8;
const totalMinesNumber=10;
var numOfReveals=0;
var minesLeftToGuess=0;
var moves=0;
var board=[];

createBoard();
console.log(board);
setMinesGlobalLimit();
showBoard();
showMinesLeft();

function gameFinishedWithWIN(){
    document.getElementById("WIN").style.display="block";
    showBoard(true);
}
function gameFinishedWithLost(){
    document.getElementById("LOST").style.display="block";
    showBoard(true,true);
}
function showBoard(isGameFinished=false,showMines=false){
    console.log(`showBoard: isGameFinished=${isGameFinished}`);
    var str="";
    str += "<table>";
    for(let row=0;row<row_num;row++){
        str += "<tr>";
        for(let col=0;col<col_num;col++){
            let cls="";
            if(showMines){
                if(board[row][col].mine){
                    cls="class='mine'";
                }
            }
            if(board[row][col].isSuspected){
                cls="class='suspected'";
            }
            str += `<td`;
            str += ` id='d_${row}_${col}' `;
            str += ` ${cls}`;
            if(!isGameFinished){
                str += ` onclick=pressCell(${row},${col})`;
                str += ` oncontextmenu='return suspectCell(${row},${col});'`;
                // str += ` oncontextmenu='suspectCell(${row},${col});return false;'`;
            }
            str += `>`;
            if(board[row][col].pressed){
                str+= board[row][col].nbr;//calcNbr(row,col);
            }
            str += "</td>";
        }
        str += "</tr>";
    }
    str += "</table>";
    document.getElementById("mainBoard").innerHTML=str;     
}
function addMove(){
    moves++;
    showMovesCount();
}
function showMovesCount(){
    document.getElementById("currMoves").innerHTML = "Moves: "+moves;     
}
function aMineWasGuessed(){
    minesLeftToGuess--;
    showMinesLeft();
}
function aMineWasUnGuessed(){
    minesLeftToGuess++;
    showMinesLeft();
}
function showMinesLeft(){
    document.getElementById("MinesLeft").innerHTML = "Left: "+minesLeftToGuess;     
}
/*
קליק ימני מסמן דגל בתא המוקלק
*/
 function suspectCell(r,c){
    if(!board[r][c].pressed){
        addMove();
        // board[r][c].isSuspected=!board[r][c].isSuspected;
        if(!board[r][c].isSuspected){
            board[r][c].isSuspected=true;
            aMineWasGuessed();
        } else {
            board[r][c].isSuspected=false;
            aMineWasUnGuessed();
        }
    }
    showBoard();
    return false;
 }
function didIwon(){
    let tot=12;//row_num*col_num;
    if(numOfReveals + totalMinesNumber == tot){
        return true;
    }
    return false;
}
 /*
 הצג את כמות המוקשים מסביב לתא רק אחרי שלחצת על התא
 */
 function pressCell(r,c,countMove=true){
    if(board[r][c].mine){
        gameFinishedWithLost();
    } else {
        board[r][c].nbr=calcNbr(r,c);
        board[r][c].pressed=true;
        board[r][c].isSuspected=false;
        if(board[r][c].nbr=0){
            revealNegihbros(r,c)
        }
        numOfReveals++;
        if(countMove){
         addMove();   
        }
        
        if(didIwon()){
            gameFinishedWithWIN();
        } else {
            showBoard();
        }
    }
 }
 function revealNegihbros(r,c){
    var cnt=0;
    var min_r=Math.max(0,r-1);          //(r==0)?0:r-1;
    var max_r=Math.min(r+1,row_num-1);  // (r==row_num-1)?row_num-1:r+1;
    var min_c=Math.max(0,c-1);          //(c==0)?0:c-1;
    var max_c=Math.min(c+1,col_num-1);  // (c==col_num-1)?col_num-1:c+1;

    for(let rr=min_r;rr<=max_r;rr++){
        for(let cc=min_c;cc<=max_c;cc++){
            if(!( board[rr][cc].pressed)){
            pressCell(rr,cc,false)

        }
    }
    }
function calcNbr(r,c){
console.log("calcNbr");
    var cnt=0;
    var min_r=Math.max(0,r-1);          //(r==0)?0:r-1;
    var max_r=Math.min(r+1,row_num-1);  // (r==row_num-1)?row_num-1:r+1;
    var min_c=Math.max(0,c-1);          //(c==0)?0:c-1;
    var max_c=Math.min(c+1,col_num-1);  // (c==col_num-1)?col_num-1:c+1;

    for(let rr=min_r;rr<=max_r;rr++){
        for(let cc=min_c;cc<=max_c;cc++){
            if(board[rr][cc].mine){
                cnt++;
            }
        }
    }
    if(board[r][c].mine){
        cnt--;
    }
    return cnt;
}
function createBoard(){
    for(let row=0;row<row_num;row++){
        board[row]=[];
        for(let col=0;col<col_num;col++){
            board[row][col]={   "mine":false,
                                "pressed":false,
                                "nbr":0,
                                "isSuspected":false};
        }
    }
}
function setMinesGlobalLimit(){
    var row,col;
    for(let k=0;k<totalMinesNumber;k++){
        do{
            row=Math.floor(Math.random() * row_num);
            col=Math.floor(Math.random() * col_num);
        }while(board[row][col].mine);
        board[row][col].mine=true;
        minesLeftToGuess++;
    }
}
function setMines(){
    for(let row=0;row<row_num;row++){
        for(let col=0;col<col_num;col++){
           let isMine = false;
           if(Math.floor(Math.random() * 100) < 10){
                isMine=true;
           }
           if(isMine){
                document.getElementById(`d_${row}_${col}`).classList.add("mine");
           }
        }
    }
}
 }
