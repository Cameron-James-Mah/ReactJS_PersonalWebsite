import Menubar from '../Menubar';
import BottomLinks from '../BottomLinks';
import './index.scss';
import React, { useEffect } from 'react';
let sudoku = [];
    

let changeCache = [];
let solved = false;
let lockout = false;
let original = [];

const Sudoku = () => {
    useEffect(() =>{//Reset state of component
        changeCache = [];
        sudoku = [];
        solved = false;
        lockout = false;
        original = [];
        for(let i = 0; i < 9; i++){
            sudoku[i] = [];
            for(let j = 0; j < 9; j++){
                sudoku[i][j] = 0;
            }
        }
        for(let i = 0; i < 9; i++){
            original[i] = [];
            for(let j = 0; j < 9; j++){
                original[i][j] = 1;
            }
        }
    },[])

    function testFunc(){
    if(lockout){
        return;
    }
    lockout = true;
    sudoku[0][0] = document.getElementById("00").value;
    sudoku[0][1] = document.getElementById("01").value;
    sudoku[0][2] = document.getElementById("02").value;
    sudoku[0][3] = document.getElementById("03").value;
    sudoku[0][4] = document.getElementById("04").value;
    sudoku[0][5] = document.getElementById("05").value;
    sudoku[0][6] = document.getElementById("06").value;
    sudoku[0][7] = document.getElementById("07").value;
    sudoku[0][8] = document.getElementById("08").value;

    sudoku[1][0] = document.getElementById("10").value;
    sudoku[1][1] = document.getElementById("11").value;
    sudoku[1][2] = document.getElementById("12").value;
    sudoku[1][3] = document.getElementById("13").value;
    sudoku[1][4] = document.getElementById("14").value;
    sudoku[1][5] = document.getElementById("15").value;
    sudoku[1][6] = document.getElementById("16").value;
    sudoku[1][7] = document.getElementById("17").value;
    sudoku[1][8] = document.getElementById("18").value;

    sudoku[2][0] = document.getElementById("20").value;
    sudoku[2][1] = document.getElementById("21").value;
    sudoku[2][2] = document.getElementById("22").value;
    sudoku[2][3] = document.getElementById("23").value;
    sudoku[2][4] = document.getElementById("24").value;
    sudoku[2][5] = document.getElementById("25").value;
    sudoku[2][6] = document.getElementById("26").value;
    sudoku[2][7] = document.getElementById("27").value;
    sudoku[2][8] = document.getElementById("28").value;

    sudoku[3][0] = document.getElementById("30").value;
    sudoku[3][1] = document.getElementById("31").value;
    sudoku[3][2] = document.getElementById("32").value;
    sudoku[3][3] = document.getElementById("33").value;
    sudoku[3][4] = document.getElementById("34").value;
    sudoku[3][5] = document.getElementById("35").value;
    sudoku[3][6] = document.getElementById("36").value;
    sudoku[3][7] = document.getElementById("37").value;
    sudoku[3][8] = document.getElementById("38").value;

    sudoku[4][0] = document.getElementById("40").value;
    sudoku[4][1] = document.getElementById("41").value;
    sudoku[4][2] = document.getElementById("42").value;
    sudoku[4][3] = document.getElementById("43").value;
    sudoku[4][4] = document.getElementById("44").value;
    sudoku[4][5] = document.getElementById("45").value;
    sudoku[4][6] = document.getElementById("46").value;
    sudoku[4][7] = document.getElementById("47").value;
    sudoku[4][8] = document.getElementById("48").value;

    sudoku[5][0] = document.getElementById("50").value;
    sudoku[5][1] = document.getElementById("51").value;
    sudoku[5][2] = document.getElementById("52").value;
    sudoku[5][3] = document.getElementById("53").value;
    sudoku[5][4] = document.getElementById("54").value;
    sudoku[5][5] = document.getElementById("55").value;
    sudoku[5][6] = document.getElementById("56").value;
    sudoku[5][7] = document.getElementById("57").value;
    sudoku[5][8] = document.getElementById("58").value;

    sudoku[6][0] = document.getElementById("60").value;
    sudoku[6][1] = document.getElementById("61").value;
    sudoku[6][2] = document.getElementById("62").value;
    sudoku[6][3] = document.getElementById("63").value;
    sudoku[6][4] = document.getElementById("64").value;
    sudoku[6][5] = document.getElementById("65").value;
    sudoku[6][6] = document.getElementById("66").value;
    sudoku[6][7] = document.getElementById("67").value;
    sudoku[6][8] = document.getElementById("68").value;

    sudoku[7][0] = document.getElementById("70").value;
    sudoku[7][1] = document.getElementById("71").value;
    sudoku[7][2] = document.getElementById("72").value;
    sudoku[7][3] = document.getElementById("73").value;
    sudoku[7][4] = document.getElementById("74").value;
    sudoku[7][5] = document.getElementById("75").value;
    sudoku[7][6] = document.getElementById("76").value;
    sudoku[7][7] = document.getElementById("77").value;
    sudoku[7][8] = document.getElementById("78").value;

    sudoku[8][0] = document.getElementById("80").value;
    sudoku[8][1] = document.getElementById("81").value;
    sudoku[8][2] = document.getElementById("82").value;
    sudoku[8][3] = document.getElementById("83").value;
    sudoku[8][4] = document.getElementById("84").value;
    sudoku[8][5] = document.getElementById("85").value;
    sudoku[8][6] = document.getElementById("86").value;
    sudoku[8][7] = document.getElementById("87").value;
    sudoku[8][8] = document.getElementById("88").value;
    
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            original[i][j] = sudoku[i][j];
        }
    }
    
    clearArr(changeCache);
    solved = false;
    if(validate(sudoku) == true){
        solve(0, 0);
        if(solved == false){
            alert("No solutions");
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    if(isNaN(original[i][j] == true || typeof sudoku[i][j] != 'number')){
                        alert("Invalid Sudoku. Contains non numeric characters.");
                        break;
                    }
                    if(original[i][j] == 0){
                        document.getElementById(String(i)+String(j)).value = "";
                    }
                    else{
                        document.getElementById(String(i)+String(j)).value = original[i][j];
                    }
                }
            }
        }
        else{
            resetToOriginal();//Toggle for visualization
            visualize(0);
            //console.log(changeCache[changeCache.length-1].cord);
        }
        
    }
    else{
        alert("Invalid Sudoku");
        lockout = false;
    }
    

    
}

function clearArr(arr){
    while(arr.length > 0){
        arr.pop();
    }
}

//Make sure cell is length of 1
function checkLength(val){
    if(val.value.toString().length > 1){
        val.value = val.value.substr(1,2);
    }
}


//Clear the board
function reset(){
    if(lockout){
        return;
    }
    for(let i = 0; i < 9; i++){
        sudoku[i] = [];
        for(let j = 0; j < 9; j++){
            sudoku[i][j] = 0;
            document.getElementById(String(i)+String(j)).value = "";
        }
    }
}

//Clear the board
function resetToOriginal(){
    //alert(original);
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            document.getElementById(String(i)+String(j)).value = original[i][j];
        }
    }
}

//Validate the board
function validate(board){
    let squareSet = new Set();
    let rowSet = new Set();
    let columnSet = new Set();
    //First row
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                if(squareSet.has(board[i][j]) == true){
                    return false;
                }
                squareSet.add(board[i][j]);
                }
            }
        }
        
        squareSet.clear();
        for(let i = 0; i < 3; i++){
            for(let j = 3; j < 6; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        for(let i = 0; i < 3; i++){
            for(let j = 6; j < 9; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        
        
        //SECOND ROW OF SQUARES
        for(let i = 3; i < 6; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        for(let i = 3; i < 6; i++){
            for(let j = 3; j < 6; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        for(let i = 3; i < 6; i++){
            for(let j = 6; j < 9; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        
        
        //THIRD ROW OF SQUARES
        for(let i = 6; i < 9; i++){
            for(let j = 0; j < 3; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        for(let i = 6; i < 9; i++){
            for(let j = 3; j < 6; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        //97 11 26
        squareSet.clear();
        for(let i = 6; i < 9; i++){
            for(let j = 6; j < 9; j++){
                if(board[i][j] != 0){//If overlaps with other cell value in 3by3
                    if(squareSet.has(board[i][j]) == true){
                        return false;
                    }
                    squareSet.add(board[i][j]);
                }
            }
        }
        squareSet.clear();
        
       //CHECKING ROWS AND COLUMNS
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(board[i][j] != 0){
                    if(rowSet.has(board[i][j]) == true){
                        return false;
                    }
                    rowSet.add(board[i][j]);
                }
                if(board[j][i] != 0){
                    if(columnSet.has(board[j][i]) == true){
                        return false;
                    }
                    columnSet.add(board[j][i]);
                }
            }
            rowSet.clear();
            columnSet.clear();
        }
        
        return true;
}



function cache(tempString, val){
    var obj = {
        "cord": tempString,
        "val": val
    }
    changeCache.push(obj);
}

function solve(y, x){
    let possibleVect = [];
    let tempString = String(y)+String(x);
    if (x == 8 && y == 8 && sudoku[y][x] == 0) {
        possibleVect = getPossibilities(y, x);
        sudoku[y][x] = possibleVect[0];
        document.getElementById(tempString).value = sudoku[y][x];
        cache(tempString, possibleVect[0]);
        solved = true;
        return;
    }
    if (y == 8 && x == 8) {
        solved = true;
        return;
    }
    if (sudoku[y][x] != 0) { 
        if (x < 8) {
            solve(y, x + 1);
        }
        else if (x == 8) {
            solve(y + 1, 0);
        }
    }
    else {
        possibleVect = getPossibilities(y, x);
        if (possibleVect.length == 0) {
            return;
        }
        for (let i = 0; i < possibleVect.length; i++) {
            if (solved == true) {
                return;
            }
            sudoku[y][x] = possibleVect[i];
            document.getElementById(tempString).value = possibleVect[i];
            cache(tempString, possibleVect[i]);
            if (x < 8) {
                solve(y, x+1);
            }
            else if (x == 8) {
                solve(y + 1, 0);
            }
        }
        if (solved == false) {
            sudoku[y][x] = 0;
            cache(tempString, 0);
        }
        
        
        
    }
    
}

function getPossibilities(y, x){
    let possibleSet = new Set();
    let possibleArr = [1,2,3,4,5,6,7,8,9];
    if (y <= 2 && x <= 2) {
        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    else if (y <= 2 && x <= 5) {
        for (let i = 0; i <= 2; i++) {
            for (let j = 3; j <= 5; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    else if (y <= 2 && x <= 8) {
        for (let i = 0; i <= 2; i++) {
            for (let j = 6; j <= 8; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }


    //Middle row
    else if (y <= 5 && x <= 2) {
        for (let i = 3; i <= 5; i++) {
            for (let j = 0; j <= 2; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    else if (y <= 5 && x <= 5) {
        for (let i = 3; i <= 5; i++) {
            for (let j = 3; j <= 5; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    else if (y <= 5 && x <= 8) {
        for (let i = 3; i <= 5; i++) {
            for (let j = 6; j <= 8; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    //Bottom row
    else if (y <= 8 && x <= 2) {
        for (let i = 6; i <= 8; i++) {
            for (let j = 0; j <= 2; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    else if (y <= 8 && x <= 5) {
        for (let i = 6; i <= 8; i++) {
            for (let j = 3; j <= 5; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    else if (y <= 8 && x <= 8) {
        for (let i = 6; i <= 8; i++) {
            for (let j = 6; j <= 8; j++) {
                if (sudoku[i][j] != 0) {
                    possibleSet.add(sudoku[i][j]);
                }
            }
        }
    }

    //Get column
    for (let i = 0; i < 9; i++) {
        if (sudoku[i][x] != 0) {
            possibleSet.add(sudoku[i][x]);
        }
    }

    //Get row
    for (let i = 0; i < 9; i++) {
        if (sudoku[y][i] != 0) {
            possibleSet.add(sudoku[y][i]);
        }
    }
    possibleSet.forEach(num =>{
        let index = possibleArr.indexOf(parseInt(num, 10));
        if(index > -1){
            possibleArr.splice(index, 1);
        }
        
    });
    return possibleArr;
}


function visualize(index){
    if(index >= changeCache.length){
        lockout = false;
        return;
    }
    setTimeout(() => visualize(index+1), 50);
    if(changeCache[index].val == 0){
        document.getElementById(changeCache[index].cord).value = "";
    }
    else{
        document.getElementById(changeCache[index].cord).value = changeCache[index].val;
    }
    
}
  return (
    <div>
        <Menubar></Menubar>
        <div className="Sudoku-page">
            <table id="board">
        <colgroup>
            <col/>
            <col/>
            <col/>
        </colgroup>
        <colgroup>
            <col/>
            <col/>
            <col/>
        </colgroup>
        <colgroup>
            <col/>
            <col/>
            <col/>
        </colgroup>
        <tbody>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="00" min="1"
                        max="9" defaultValue="1" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="01" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="02" min="1"
                        max="9" defaultValue="6" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="03" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="04" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="05" min="1"
                        max="9" defaultValue="2" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="06" min="1"
                        max="9" defaultValue="3" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="07" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="08" min="1"
                        max="9" defaultValue="" /></td>
            </tr>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="10" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="11" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="12" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="13" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="14" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="15" min="1"
                        max="9" defaultValue="6" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="16" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="17" min="1"
                        max="9" defaultValue="9" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="18" min="1"
                        max="9" defaultValue="1" /></td>
            </tr>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="20" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="21" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="22" min="1"
                        max="9" defaultValue="9" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="23" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="24" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="25" min="1"
                        max="9" defaultValue="1" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="26" min="1"
                        max="9" defaultValue="4" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="27" min="1"
                        max="9" defaultValue="6" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="28" min="1"
                        max="9" defaultValue="2" /></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="30" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="31" min="1"
                        max="9" defaultValue="3" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="32" min="1"
                        max="9" defaultValue="7" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="33" min="1"
                        max="9" defaultValue="9" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="34" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="35" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="36" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="37" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="38" min="1"
                        max="9" defaultValue="" /></td>
            </tr>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="40" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="41" min="1"
                        max="9" defaultValue="8" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="42" min="1"
                        max="9" defaultValue="1" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="43" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="44" min="1"
                        max="9" defaultValue="2" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="45" min="1"
                        max="9" defaultValue="7" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="46" min="1"
                        max="9" defaultValue="9" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="47" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="48" min="1"
                        max="9" defaultValue="" /></td>
            </tr>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="50" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="51" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="52" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="53" min="1"
                        max="9" defaultValue="4" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="54" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="55" min="1"
                        max="9" defaultValue="8" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="56" min="1"
                        max="9" defaultValue="1" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="57" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="58" min="1"
                        max="9" defaultValue="7" /></td>
        </tr>
        </tbody>
        <tbody>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="60" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="61" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="62" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="63" min="1"
                        max="9" defaultValue="2" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="64" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="65" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="66" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="67" min="1"
                        max="9" defaultValue="4" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="68" min="1"
                        max="9" defaultValue="" /></td>
            </tr>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="70" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="71" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="72" min="1"
                        max="9" defaultValue="4" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="73" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="74" min="1"
                        max="9" defaultValue="5" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="75" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="76" min="1"
                        max="9" defaultValue="6" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="77" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="78" min="1"
                        max="9" defaultValue="9" /></td>
            </tr>
            <tr>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="80" min="1"
                        max="9" defaultValue="9" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="81" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="82" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="83" min="1"
                        max="9" defaultValue="8" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="84" min="1"
                        max="9" defaultValue="" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="85" min="1"
                        max="9" defaultValue="4" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="86" min="1"
                        max="9" defaultValue="2" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="87" min="1"
                        max="9" defaultValue="1" /></td>
                <td><input type="number" onKeyDown={checkLength} onKeyUp={checkLength} id="88" min="1"
                        max="9" defaultValue="" /></td>
            </tr>
            </tbody>
    </table>
    <br/>
    <br/>

    <div className="options">
        <button type="button" onClick={testFunc}>Solve</button>
        <button type="button" onClick={reset}>Reset</button>
    </div>

        </div>
        <BottomLinks></BottomLinks>
    </div>
  )
}

export default Sudoku