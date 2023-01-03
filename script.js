const box = document.querySelector('#Box');
const ctx = box.getContext('2d');
const boxArray = new Array(100).fill(0).map(() => new Array(100).fill(0));

function createLife (boxArray, ctx) {
    let isBlack = true;
    for(let y = 0; y < boxArray.length; y++){
        for(let x = 0; x < boxArray.length; x++){
            if(isBlack){
                boxArray[x][y] = 0;
                ctx.fillStyle = 'white';
                isBlack = false;
            }else{
                boxArray[x][y] = 1;
                ctx.fillStyle = 'black';
                isBlack = true;
            }
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function countNeighbors (x, y, boxArray) {
    let cNeighbors = 0;
    if(x === 0 || y === 0 || x === 99 || y === 99) return null;

    if(boxArray[x - 1][y] === 1) cNeighbors++;
    if(boxArray[x + 1][y] === 1) cNeighbors++;
    if(boxArray[x][y - 1] === 1) cNeighbors++;
    if(boxArray[x][y + 1] === 1) cNeighbors++;
    if(boxArray[x - 1][y - 1] === 1) cNeighbors++;
    if(boxArray[x + 1][y + 1] === 1) cNeighbors++;
    if(boxArray[x + 1][y - 1] === 1) cNeighbors++;
    if(boxArray[x - 1][y + 1] === 1) cNeighbors++;

    return cNeighbors;
}

function rules (boxArray, ctx) {
    for(let y = 0; y < boxArray.length; y++){
        for(let x = 0; x < boxArray.length; x++){
            let Neighbors = countNeighbors(x, y, boxArray);
            if(Neighbors === null) {
                ctx.fillStyle = 'white'
                ctx.fillRect(x, y, 1, 1); 
                boxArray[x][y] = 0;
            }
            if((Neighbors === 2 || Neighbors === 3) && boxArray[x][y] === 1){
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, 1, 1); 
                boxArray[x][y] = 1;
            }
            else if(Neighbors === 3 && boxArray[x][y] === 0){
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, 1, 1); 
                boxArray[x][y] = 1;
            }
            else if((Neighbors < 2 || Neighbors > 3) && boxArray[x][y] === 1){
                ctx.fillStyle = 'white';
                ctx.fillRect(x, y, 1, 1); 
                boxArray[x][y] = 0;
            }
        }
    }
}

createLife(boxArray, ctx);
setInterval(() => rules(boxArray, ctx), 1000);