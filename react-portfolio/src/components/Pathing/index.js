import Menubar from '../Menubar';
import BottomLinks from '../BottomLinks';
import './index.scss';
import React, { useEffect } from 'react';
//import useScript from '../../hooks/useScript.js';

let board = [];
let selected = "";
let visitedSet = new Set(); //Set to track which cells were visited during algorithms to prevent overlap
let searchCache = []; //algorithm searched path from start to goal
let found = false; //Track if path was found, used to determine if path should be played back
let pathCache = []; //Direct playback path from start to goal
let lockout = false; //Disable all buttons and user input during this state, causes issues if during visualization something like reset is pressed
let speed; //Speed selected in selection box, affects visualize speed of algorithm. Used in setTimeout call so higher value = slower speed.
let speed2; //Speed for the playback path. Both speeds adjusted in solve()
//let pathBFS = []; //Path for BFS, I think just have an arr of objects with ref to current cell value and prev cell value



const Pathing = () => {
    useEffect(() =>{//Reset state of component
        board = [];
        visitedSet.clear();
        selected = "";
        searchCache = [];
        found = false;
        pathCache = [];
        lockout = false;
    },[])

    function validate(e){
        if(e.target.value.toString().length > 0){
            e.target.value = e.target.value.substr(1,2);
            return;
        }
    }

    function colorChanger(e){
        //alert(1);
        //alert(selected);
        if(selected === "default"){//white
            e.target.style.backgroundColor = 'white';
        }
        else if(selected === "wall"){//black
            e.target.style.backgroundColor = 'black';
        }
        else if(selected === "start"){//green
            e.target.style.backgroundColor = 'green';
        }
        else if(selected === "goal"){//red
            e.target.style.backgroundColor = 'red';
        }
        
        
    }

    function btnSelect(e){
        if(lockout){
            return;
        }
        selected = e.target.id;
        document.getElementById("default").style.backgroundColor = "white";
        document.getElementById("wall").style.backgroundColor = "white";
        document.getElementById("start").style.backgroundColor = "white";
        document.getElementById("goal").style.backgroundColor = "white";
        
        e.target.style.backgroundColor = "grey";
    }

    function reset(){
        if(lockout){
            return;
        }
        //alert(lockout);
        for(let i = 0; i < 9; i++){
            board[i] = [];
            for(let j = 0; j < 21; j++){
                document.getElementById(String(i)+"x"+String(j)).style.backgroundColor = 'white';
            }
        }
    }

    function redo(){//Reset board except walls
        if(lockout){
            return;
        }
        //alert(lockout);
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 21; j++){
                if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor !== "black"){
                    document.getElementById(String(i)+"x"+String(j)).style.backgroundColor = 'white';
                }
            }
        }
    }

    function solve(){
        //populate board array with the proper values
        //Determine the selected algo
        if(lockout){
            return;
        }
        speed = 100;
        speed = speed/document.getElementById("speed").value;
        speed2 = 50;
        speed2 = speed2/document.getElementById("speed").value;
        lockout = true;
        let y = 0;
        let x = 0;
        let goalY = 0;
        let goalX = 0;
        let start = 0;
        let end = 0;
        for(let i = 0; i < 9; i++){
            board[i] = [];
            for(let j = 0; j < 21; j++){
                if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor === 'white'){
                    board[i][j] = 0; 
                }
                else if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor === 'black'){
                    board[i][j] = 1;
                }
                else if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor === 'green'){
                    board[i][j] = 2;
                    y = i;
                    x = j;
                    start++;
                }
                else if(document.getElementById(String(i)+"x"+String(j)).style.backgroundColor === 'red'){
                    board[i][j] = 3;
                    goalY = i;
                    goalX = j;
                    end++;
                }
                
            }
        }
        if(start === 0){
            alert("No start");
            lockout = false;
            return;
        }
        if(start > 1){
            alert("Too many starts");
            lockout = false;
            return;
        }
        if(end === 0){
            alert("No goal");
            lockout = false;
            return;
        }
        if(end > 1){
            alert("Too many goals");
            lockout = false;
            return;
        }
        //Reset for next search
        visitedSet.clear();
        clearArr(searchCache);
        clearArr(pathCache);
        found = false;
        if(document.getElementById("algo").value === "DFS"){
            DFS(y, x);
        }
        else if(document.getElementById("algo").value === "BFS"){
            BFS(y, x);
        }
        else if(document.getElementById("algo").value === "A*"){
            A(y, x, goalY, goalX);
        }
        else if(document.getElementById("algo").value === "WFS"){
            WFS(y, x, goalY, goalX);
        }
        else if(document.getElementById("algo").value === "RFS"){
            RFS(y, x);
        }

        if(found){//playback visualization
            visualize(0);
        }
        else{
            alert("No valid path");
        }
        
    }

    function clearArr(arr){
        while(arr.length > 0){
            arr.pop();
        }
    }
    function copyArr(arr1, arr2){
        for(let i = 0; i < arr2.length; i++){
            arr1.push(arr2[i]);
        }
    }
    function visualize(index){//Show path traversed by the algorithm
        if(index >= searchCache.length){
            setTimeout(() => showPath(pathCache.length-1), speed);
            lockout = false;
            return;
        }
        setTimeout(() => visualize(index+1), speed);
        document.getElementById(searchCache[index]).style.backgroundColor = "DodgerBlue";
    }

    function showPath(index){ //Show path from start to goal without branches
        if(index < 0){
            lockout = false;
            return;
        }
        setTimeout(() => showPath(index-1), speed2);
        document.getElementById(pathCache[index]).style.backgroundColor = "MediumSeaGreen";
    }
    //Issue because I am adding to the array randomly so i var will not always point to right index
    function RFS(y, x){
        alert("broken");
    }


    //Joke algorithm, opposite of A* to take the worst possible search 
    function WFS(y, x, goalY, goalX){
        let possible = []; 
        let obj = {
            path: [y.toString()+"x"+x.toString()],
            cost: 0,
            curr: y.toString()+"x"+x.toString(),
            y: y,
            x: x
        }

        possible.push(obj);
        visitedSet.add(possible[0].curr);
        while(possible.length > 0){
            searchCache.push(possible[0].curr);
            if(board[possible[0].y][possible[0].x] === 3){
                found = true;
                pathCache = possible[0].path;
                return;
            }
            //get the neighbor with highest heuristic cost, if i keep path sorted then possible[i].curr will be the next
            let prevPath = possible[0].path;
            let prevY = possible[0].y;
            let prevX = possible[0].x;

            //evaluate heuristic cost of adjacent cells
            let temp = prevX;
            temp += 1;
            possible = possible.slice(1);
            if(prevX <= 19 && !visitedSet.has(prevY.toString()+"x"+temp.toString()) && board[prevY][temp] !== 1){//right
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-prevY)+Math.abs(goalX-temp),
                    curr: prevY.toString()+"x"+temp.toString(),
                    y: prevY,
                    x: temp
                }
                tempObj.path.push(tempObj.curr);
                insertWFS(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            temp = prevY;
            temp += 1;
            if(prevY <= 7 && !visitedSet.has(temp.toString()+"x"+prevX.toString()) && board[temp][prevX] !== 1){//down
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-temp)+Math.abs(goalX-prevX),
                    curr: temp.toString()+"x"+prevX.toString(),
                    y: temp,
                    x: prevX
                }
                tempObj.path.push(tempObj.curr);
                insertWFS(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            temp = prevX;
            temp -= 1;
            if(prevX >= 1 && !visitedSet.has(prevY.toString()+"x"+temp.toString()) && board[prevY][temp] !== 1){//left
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-prevY)+Math.abs(goalX-temp),
                    curr: prevY.toString()+"x"+temp.toString(),
                    y: prevY,
                    x: temp
                }
                tempObj.path.push(tempObj.curr);
                insertWFS(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            temp = prevY;
            temp -= 1;
            if(prevY >= 1 && !visitedSet.has(temp.toString()+"x"+prevX.toString()) && board[temp][prevX] !== 1){//up
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-temp)+Math.abs(goalX-prevX),
                    curr: temp.toString()+"x"+prevX.toString(),
                    y: temp,
                    x: prevX
                }
                tempObj.path.push(tempObj.curr);
                insertWFS(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            
        }
        
    }

    function insertWFS(arr, obj){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].cost <= obj.cost){
                arr.splice(i, 0, obj);
                return;
            }
        }
        arr.push(obj);
    }

    //I think for my arr of cells i can visit, I can maybe have them sorted since i will be checking through that list many times it may be beneficial
    function A(y, x, goalY, goalX){
        let possible = []; //arr of possible cells to visit, maybe have sorted in asc order
        let obj = {
            path: [y.toString()+"x"+x.toString()],
            cost: 0,
            curr: y.toString()+"x"+x.toString(),
            y: y,
            x: x
        }

        possible.push(obj);
        visitedSet.add(possible[0].curr);
        while(possible.length > 0){
            searchCache.push(possible[0].curr);
            if(board[possible[0].y][possible[0].x] === 3){
                found = true;
                pathCache = possible[0].path;
                return;
            }
            //get the neighbor with lowest heuristic cost, if i keep path sorted then possible[i].curr will be the next
            let prevPath = possible[0].path;
            let prevY = possible[0].y;
            let prevX = possible[0].x;

            //evaluate heuristic cost of adjacent cells
            let temp = prevX;
            temp += 1;
            possible = possible.slice(1);
            //alert(possible.length);
            if(prevX <= 19 && !visitedSet.has(prevY.toString()+"x"+temp.toString()) && board[prevY][temp] !== 1){//right
                //let hc = Math.abs(goalY-y)+Math.abs(goalX-temp);
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-prevY)+Math.abs(goalX-temp),
                    curr: prevY.toString()+"x"+temp.toString(),
                    y: prevY,
                    x: temp
                }
                tempObj.path.push(tempObj.curr);
                insert(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            temp = prevY;
            temp += 1;
            if(prevY <= 7 && !visitedSet.has(temp.toString()+"x"+prevX.toString()) && board[temp][prevX] !== 1){//down
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-temp)+Math.abs(goalX-prevX),
                    curr: temp.toString()+"x"+prevX.toString(),
                    y: temp,
                    x: prevX
                }
                tempObj.path.push(tempObj.curr);
                insert(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            temp = prevX;
            temp -= 1;
            if(prevX >= 1 && !visitedSet.has(prevY.toString()+"x"+temp.toString()) && board[prevY][temp] !== 1){//left
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-prevY)+Math.abs(goalX-temp),
                    curr: prevY.toString()+"x"+temp.toString(),
                    y: prevY,
                    x: temp
                }
                tempObj.path.push(tempObj.curr);
                insert(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            temp = prevY;
            temp -= 1;
            if(prevY >= 1 && !visitedSet.has(temp.toString()+"x"+prevX.toString()) && board[temp][prevX] !== 1){//up
                let tempPath = [];
                copyArr(tempPath, prevPath);
                let tempObj = {
                    path: tempPath,
                    cost: Math.abs(goalY-temp)+Math.abs(goalX-prevX),
                    curr: temp.toString()+"x"+prevX.toString(),
                    y: temp,
                    x: prevX
                }
                tempObj.path.push(tempObj.curr);
                insert(possible, tempObj);
                visitedSet.add(tempObj.curr);
            }
            
        }
        
    }

    function insert(arr, obj){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].cost >= obj.cost){
                arr.splice(i, 0, obj);
                return;
            }
        }
        arr.push(obj);
    }




    //Maybe objects into queue that hold ref to parent cord
    function BFS(y, x){
        //alert(1);
        let que = [];
        let obj = {
            path: [y.toString()+"x"+x.toString()],
            curr: y.toString()+"x"+x.toString(),
            y: y,
            x: x
        }
        //visitedSet.add()
        que.push(obj);
        while(que.length > 0){
            let qSize = que.length;
            for(let i = 0; i < qSize; i++){
                //visitedSet.add(que[i].curr);
                searchCache.push(que[i].curr);
                if(board[que[i].y][que[i].x] === 3){
                    found = true;
                    pathCache = que[i].path;
                    //Append to playback arr, i think that que[i].path should have an arr of the path
                    return;
                }
                //Kind of choppy way to do things below but I will fix later
                let temp = que[i].x;
                temp += 1;
                let tempPath = [];
                copyArr(tempPath, que[i].path);
                //Search adjacent cells
                if(que[i].x <= 19 && !visitedSet.has(que[i].y.toString()+"x"+temp.toString()) && board[que[i].y][temp] !== 1){//right
                    let tempPath = [];
                    copyArr(tempPath, que[i].path);
                    let tempObj = {
                        path: tempPath,
                        curr: que[i].y.toString()+"x"+temp.toString(),
                        y: que[i].y,
                        x: temp
                    }
                    visitedSet.add(tempObj.curr);
                    tempObj.path.push(tempObj.curr);
                    que.push(tempObj);
                }
                temp = que[i].y;
                temp += 1;
                if(que[i].y <= 7 && !visitedSet.has(temp.toString()+"x"+que[i].x.toString()) && board[temp][que[i].x] !== 1){//down
                    let tempPath = [];
                    copyArr(tempPath, que[i].path);
                    let tempObj = {
                        path: tempPath,
                        curr: temp.toString()+"x"+que[i].x.toString(),
                        y: temp,
                        x: que[i].x
                    }
                    visitedSet.add(tempObj.curr);
                    tempObj.path.push(tempObj.curr);
                    que.push(tempObj);
                }
                temp = que[i].x;
                temp -= 1;
                if(que[i].x >= 1 && !visitedSet.has(que[i].y.toString()+"x"+temp.toString()) && board[que[i].y][temp] !== 1){//left
                    let tempPath = [];
                    copyArr(tempPath, que[i].path);
                    let tempObj = {
                        path: tempPath,
                        curr: que[i].y.toString()+"x"+temp.toString(),
                        y: que[i].y,
                        x: temp
                    }
                    visitedSet.add(tempObj.curr);
                    tempObj.path.push(tempObj.curr);
                    que.push(tempObj);
                }
                temp = que[i].y;
                temp -= 1;
                if(que[i].y >= 1 && !visitedSet.has(temp.toString()+"x"+que[i].x.toString()) && board[temp][que[i].x] !== 1){//up
                    let tempPath = [];
                    copyArr(tempPath, que[i].path);
                    let tempObj = {
                        path: tempPath,
                        curr: temp.toString()+"x"+que[i].x.toString(),
                        y: temp,
                        x: que[i].x
                    }
                    visitedSet.add(tempObj.curr);
                    tempObj.path.push(tempObj.curr);
                    que.push(tempObj);
                }
            }
            que = que.slice(qSize);
        }
    }



    function DFS(y, x){
        let cord = y.toString()+"x"+x.toString();
        if(y < 0 || x < 0 || y >= 9 || x >= 21 || visitedSet.has(cord) || board[y][x] === 1 || found){//Boundary check
            return;
        }
        pathCache.push(cord);
        searchCache.push(cord);
        if(board[y][x] === 3){//solved
            found = true;
            return;
        }
        visitedSet.add(cord);
        DFS(y, x+1);
        DFS(y+1, x);
        DFS(y, x-1);
        DFS(y-1, x);
        if(!found){//If reached here and not found goal then branch leads nowhere
            pathCache.pop();
        }
        

    }
    
    return (
        <div>
            <Menubar />
            <div className="Pathing-page">
                <table id="board">
                        <tbody>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x0"/></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="0x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="1x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="2x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="3x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="4x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="5x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="6x20" /></td>
                </tr>
                <tr>
   
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="7x20" /></td>
                </tr>
                <tr>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x0" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x1" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x2" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x3" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x4" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x5" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x6" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x7" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x8" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x9" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x10" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x11" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x12" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x13" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x14" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x15" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x16" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x17" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x18" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x19" /></td>
                        <td><input onClick={colorChanger} onKeyDown={validate} onKeyUp={validate}
                                        id="8x20" /></td>
                    </tr>
                    </tbody>
        </table>
        <br></br>
        <br></br>

        <div className="options">
                <button type="button" onClick={btnSelect} id="default">Passable</button>
                <button type="button" onClick={btnSelect} id="wall">Wall</button>
                <button type="button" onClick={btnSelect} id="start">Start</button>
                <button type="button" onClick={btnSelect} id="goal">Goal</button>

                <button type="button" onClick={solve}>Search</button>
                <button type="button" onClick={reset}>Reset</button>
                <button type="button" onClick={redo}>Redo</button>
        </div>
        <br></br>
        <select id="algo" className="selection">
                <option value="DFS">DFS(Depth first search)</option>
                <option value="BFS">BFS(Breadth first search)</option>
                <option value="A*">A*</option>
                <option value="RFS">Random search</option>
        </select>
        <select id="speed" className="selection">
                <option value="1">1x</option>
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
        </select>
        <script src = './pathingAlgo.js' async = "True"></script>
            </div>
            <BottomLinks />
        </div>
        
    );
};

export default Pathing;