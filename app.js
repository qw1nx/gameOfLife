let rows;
let cols;
let started;
let timer;
let evolutionSpeed=1000;// Time between generations
let currGen =[rows];
let nextGen =[rows];

function onSubmitGrid(){
    document.getElementById('world').innerHTML = '';
    let buttonStartStop=document.querySelector('#btnstartstop');
    started = false;
    buttonStartStop.value='Start Reproducing';
    buttonStartStop.setAttribute('class', 'btn-success')
    const colsInput = document.getElementById('cols');
    const rowsInput = document.getElementById('rows');

    cols = Number(colsInput.value);
    rows = Number(rowsInput.value);

    console.log(cols,rows);

    colsInput.value = '';
    rowsInput.value = '';

    createWorld();
    createGenArrays();
    initGenArrays();
}


function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);

    }
}
function initGenArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function createWorld() {
    let world = document.querySelector('#world');

    let tbl = document.createElement('table');
    tbl.setAttribute('id','worldgrid');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click',cellClick);
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
    if (this.className==='alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    }else{
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}


function createNextGen() {
    for (let row in currGen) {
        for (let col in currGen[row]) {

            let neighbors = getNeighborCount(row, col);

            if (currGen[row][col] === 1) {

                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors === 2 || neighbors === 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] === 0) {

                if (neighbors === 3) {
                    nextGen[row][col] = 1;// Birth?
                }
            }
        }
    }
}

function getNeighborCount(row, col) {
    let count = 0;
    let nRow = Number(row);
    let nCol = Number(col);

    if (nRow - 1 >= 0) {
        if (currGen[nRow - 1][nCol] === 1)
            count++;
    }
    if (nRow - 1 >= 0 && nCol - 1 >= 0) {
        if (currGen[nRow - 1][nCol - 1] === 1)
            count++;
    }
    if (nRow - 1 >= 0 && nCol + 1 < cols) {
        if (currGen[nRow - 1][nCol + 1] === 1)
            count++;
    }
    if (nCol - 1 >= 0) {
        if (currGen[nRow][nCol - 1] === 1)
            count++;
    }
    if (nCol + 1 < cols) {
        if (currGen[nRow][nCol + 1] === 1)
            count++;
    }
    if (nRow + 1 < rows && nCol - 1 >= 0) {
        if (currGen[nRow + 1][nCol - 1] === 1)
            count++;
    }
    if (nRow + 1 < rows && nCol + 1 < cols) {
        if (currGen[nRow + 1][nCol + 1] === 1)
            count++;
    }

    if (nRow + 1 < rows) {
        if (currGen[nRow + 1][nCol] === 1)
            count++;
    }

    return count;
}

function updateCurrGen() {

    for (let row in currGen) {
        for (let col in currGen[row]) {
            currGen[row][col] = nextGen[row][col];
            nextGen[row][col] = 0;
        }
    }
}

function updateWorld() {
    let cell='';
    for (let row in currGen) {
        for (let col in currGen[row]) {
            cell = document.getElementById(row + '_' + col);
            if (currGen[row][col] === 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
}

function evolve(){
    createNextGen();
    updateCurrGen();
    updateWorld();
    if (started) {
        timer = setTimeout(evolve, evolutionSpeed);
    }
}

function updateButtonState(){
    let startStopBtn = document.querySelector('#btnstartstop');

    if (!started) {
        started = true;
        startStopBtn.value='Stop Reproducing';
        evolve();
        startStopBtn.setAttribute('class', 'btn-danger');
    } else {
        started = false;
        startStopBtn.value='Start Reproducing';
        clearTimeout(timer);
        startStopBtn.setAttribute('class', 'btn-success');
    }
}

function resetWorld() {
    location.reload();
}

module.exports = {
    getNeighborCount
}