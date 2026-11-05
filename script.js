let boxes=document.querySelectorAll(".box");
let rebtn=document.querySelector("#reset");
let nwbtn=document.querySelector("#newgame");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let straw=false;
let turno=true; // true = O trun : false = X turn

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
}

const enableboxes = () => {
    for (box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const dissableboxes = () => {
    for (box of boxes) {
        box.disabled=true;
    }
}
const draw =() => {
    msg.innerText = `Alas! No one won the game`;
    msgcontainer.classList.remove("hide");
    dissableboxes()
}
const showwinner =(winner) => {
    msg.innerText = `Congaralutations ${winner} won the game`;
    msgcontainer.classList.remove("hide");
    dissableboxes()
    straw=true;
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