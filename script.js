let player1=prompt("ENTER NAME OF PLAYER 1");
let player2=prompt("ENTER NAME OF PALYER 2");

let nameplayer1 =document.querySelector(".text1");
let nameplayer2 =document.querySelector(".text2");

let box1 = document.querySelector(".player1");
let box2 = document.querySelector(".player2");

let winsound = document.querySelector("#winsound");
let drawsound = document.querySelector("#drawsound");

let container =document.querySelector(".container");
let restart = document.querySelector(".restart");

nameplayer1.innerText = nameplayer1.innerText + player1;
console.log(nameplayer1);
nameplayer2.innerText = nameplayer2.innerText + player2;
console.log(nameplayer2);


let winx=0;
let wino=0;
let drawxy=0;



let boxes=document.querySelectorAll(".box");
let rebtn=document.querySelector("#reset");
let nwbtn=document.querySelector("#newgame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let straw=false;
let turno=true; // true = O trun : false = X turn
box1.classList.add("turns");

let scoreplayer1 = document.querySelector(".score1");
let scoreplayer2 = document.querySelector(".score2");

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        box.innerText=turno ? "O" : "X";
        turno=!turno;
        count++;
        box.disabled = true ;
        if(turno){
            box1.classList.add("turns");
            box2.classList.remove("turns");
        }
        else{
            box2.classList.add("turns");
            box1.classList.remove("turns");
        }
        checkwinner();
        if (count===9 && straw===false) {
            draw()
        }
    })
})

const restartgame = () =>{
    turno=true;
    enableboxes();
    count=0;
    msgcontainer.classList.add("hide");
    straw=false;
    box1.classList.add("turns");
    box2.classList.remove("turns");
    winsound.pause();
    winsound.load();
    drawsound.pause();
    drawsound.load();
    container.classList.remove("hide");
    restart.classList.remove("hide");
}

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const dissableboxes = () => {
    for (let box of boxes) {
        box.disabled=true;
    }
}
const draw =() => {
    drawxy++;
    drawsound.play();
    msg.innerText = `Alas! No one won the game`;
    msgcontainer.classList.remove("hide");
    dissableboxes()
    container.classList.add("hide");
    restart.classList.add("hide");
}
const showwinner =(winner) => {
    winsound.play();
    if(winner==="O"){
        wino++;
        scoreplayer1.innerText = "SCORE : " + wino;
        console.log(`${wino} ${player1}`)
        msg.innerText = `Congaralutations ${player1} won the game`;
        msgcontainer.classList.remove("hide");
        dissableboxes()
        straw=true;
        container.classList.add("hide");
        restart.classList.add("hide");
}
    if(winner==="X"){
        winx++;
        scoreplayer2.innerText = " SCORE : " + winx;
        console.log(`${winx} ${player2}`)
        msg.innerText = `Congaralutations ${player2} won the game`;
        msgcontainer.classList.remove("hide");
        dissableboxes()
        straw=true;
        container.classList.add("hide");
        restart.classList.add("hide");
    }
}

const checkwinner = () => {
    for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    
    if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
        if (pos1 === pos2 && pos2 === pos3) {
           showwinner(pos1);
        }
    }
}
}

nwbtn.addEventListener("click",restartgame);
rebtn.addEventListener("click",restartgame);
