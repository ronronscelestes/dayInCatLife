//dealing with query params
const getUrlParams = () => {
    let params = {};
  
    if (window.location.search)
      for(let p of new URLSearchParams(window.location.search)) {
        params[p[0]] = p[1];
      }
    return params;
}
  
const setUrlParams = (url, params) => {
    if (params) {
        url += `?`
        let oneDone = false;

        Object.keys(params).forEach(element => {
        url += (oneDone ? '&' : '') + `${element}=${params[element]}`;
        oneDone = true;
        });
    }
    return url;
}

//------GAME CONSTRUCTION----//

//create gameArr
export let gridSize = 10;
export let gameArr = new Array(gridSize);
for(let i = 0; i < gameArr.length; i++) {
    gameArr[i] = new Array(gridSize);
    gameArr[i].fill('empty');
}

//create tile HTML elements according to gameArr
export let gameBoard = document.querySelector('#game-board');
gameArr.forEach((row, y) => {
    row.forEach((column, x) => {
        let div = document.createElement('div');
        div.classList.add('empty');
        div.id = `${y}${x}`;
        gameBoard.appendChild(div);
    });
});

//function to change y,x,classname of game-board depending on changes made on gameArr
const renderXY = (y, x, className) => {
    document.getElementById(`${y}${x}`)
    .setAttribute('class', `${className}`);
}

//function to iterate through gameArr and apply change to HTML elements
const renderGameArr = () => {
    for(let y = 0; y < gridSize; y++) {
        for(let x = 0; x < gridSize; x++) {
            renderXY(y, x, gameArr[y][x]);
        }
    }
}

const reloadOnRestartClick = () => {
    let restartBtns = [...document.querySelectorAll('.restart')]
    const reload = () => {
        document.location.reload();
    }
    restartBtns.forEach(restartBtn => {
        restartBtn.addEventListener('click', reload)
    });
}

//sparkle sound
export const sparkleSound = new Audio('./style/music/sparkle-sound.mp3');

export {setUrlParams, getUrlParams, renderGameArr, reloadOnRestartClick}