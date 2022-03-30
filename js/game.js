var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png"
bg.src = "img/bg.png"
fg.src = "img/fg.png"
pipeBottom.src = "img/pipeBottom.png"
pipeUp.src = "img/pipeUp.png";

//gap - space between tubes
var gap = 100;

//position bird
var xPos = 10;
var yPos = 150;
var grav = 1.5; //step bird, gravitation
var score = 0; //очки


//звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var game_over = new Audio();
var music_bird = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
game_over.src = "audio/game_over.mp3";
music_bird.src = "audio/music_bird.mp3"

music_bird.play();


//create blocks
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0 
}

//При нажатии на какую-либо кнопку - птица будет подыматься
document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 25;
    fly.play();
}

function draw(){
    
    ctx.drawImage(bg, 0, 0);

    //tubes move
    for(var i =0; i< pipe.length; i++){

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap );

        pipe[i].x--; //движение труб влево

        //новая рандомная труба
        createNewPipe(i);

        //проверка столкновения птицы и блоков 
        gameOver(i);

        //проверка очков
        checkScore(i);
    }

    ctx.drawImage(fg, 0, cvs.height- fg.height + 5);
    ctx.drawImage(bird, xPos, yPos );

    //прорисовка счета
    drawScore();
    
    yPos += grav; // при прибавлении шага, высота будет увеличиваться и птица будет падать под действием гравитации
    
    requestAnimationFrame(draw);
}

//проверка очков
function checkScore(i){
    if(pipe[i].x == 5){
        score++;
        score_audio.play();
    }
}

function createNewPipe(i){
    if (pipe[i].x==125){
        pipe.push({
            x: cvs.width, 
            y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height 
        });
    }
}

//прорисовка счета
function drawScore(){
    ctx.fillStyle = "#000";
    ctx.font = "23px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
}

function gameOver(i){
    if (xPos + bird.width >= pipe[i].x 
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height +
            gap) || yPos + bird.height >= cvs.height- fg.height) {
                //перезапуск страницы
                yPos = 150;
                location.reload();
            }
}

pipeBottom.onload = draw;
