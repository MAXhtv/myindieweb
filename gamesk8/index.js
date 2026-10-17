const sprites=new Image()
sprites.src='./sprite/gptsprites.png'

const playerSprite=new Image()
playerSprite.src='./sprite/ska82.png'

const floorSprite=new Image()
floorSprite.src='./sprite/floor.png'

const boxSprite=new Image()
boxSprite.src='./sprite/caixa.png'

const canvas=document.querySelector('canvas')
//contexto
const ctx=canvas.getContext('2d')

ctx.imageSmoothingEnabled=false

function randomize(){
    return parseInt(Math.random())
}

function collide(a,b){
    const aY=a.y+a.height
    const bY=b.y
    if (aY>=bY){
        return true
    }
    return false
}

const player={
    //spriteX: 40,
    //spriteY: 445,
    larg: 50,
    height: 120,
    x: 10,
    y: canvas.height -50 -110,
    velocity: 0,
    gravity:0.35,
    pulo:7,
    quantPulos:0,
    jump(){
        console.log('pulo')
        if (player.quantPulos<2){
            player.velocity=-player.pulo
            player.quantPulos++
        }
    },
    atualiza(){
        player.velocity=player.velocity+player.gravity
        player.y=player.y+player.velocity
        if (collide(player, floor)){
            console.log('true')
            player.y=floor.y-player.height
            player.velocity=0
            player.quantPulos=0
        }
    },
    draw(){
        ctx.drawImage(
        playerSprite,
        //player.spriteX, player.spriteY, //sprite x and sprite y
        //player.larg, player.height, // recorte da imagem
        player.x, player.y,
        player.larg, player.height , //tamanho da imagem
        )
    }
}

let frameCount=0

const boxOBJ={
    larg: 40,
    height: 40,
    x: 50,
    y: 510,
    velocity:2,
    pares:[],

    //move o obstaculo para a esquerda e dps realoca ele
    atualiza(){
        frameCount++
        //boxOBJ.x-=boxOBJ.velocity
        const foreachFPS=frameCount%100===0

        if (foreachFPS){
            boxOBJ.pares.push({
                x: canvas.width,
                r: 50+Math.random()*300,
                distance:200+Math.random()*10,
            },)
        }

        boxOBJ.pares.forEach(function(par){
            par.x-=boxOBJ.velocity
        })
        boxOBJ.pares.forEach(function(par){
            if (par.x+boxOBJ.larg<-700){
                boxOBJ.pares.shift()
            }
        })
    },
    draw(){
        boxOBJ.pares.forEach(function(par){
            const xrandom=par.r+par.distance
            const box1x=par.x+xrandom
            //primeira caixa
            ctx.drawImage(
                boxSprite,
                box1x, boxOBJ.y,
                40, 40
            )
            //segunda caixa
           //const box2x=box1x+xrandom
            //ctx.drawImage(
                //boxSprite,
                //box2x, boxOBJ.y,
                //40, 40
            //)
        })

    }
}

const floor={
    x: 0,
    y: canvas.height-50,
    height:50,
    velocity:2, // canvas.height-112 553
    atualiza(){
        floor.x-=floor.velocity
        if (floor.x<=-100){
            floor.x=0
        }
    },
    draw(){
        for (let x=floor.x; x<canvas.width; x+=100){
            ctx.drawImage(
                floorSprite,
                x,
                floor.y,
                100,
                50
            )
        } for (let x=floor.x-100; x>=0; x-=100){
           ctx.drawImage(
            floorSprite,
            x,
            floor.y,
            100,
            50
            ) 
        }
    }
}

let telaAtiva={}

function mudarTela(novatela){
    telaAtiva=novatela
}
const Telas={
    JOGO:{
        draw(){
            boxOBJ.draw()
            floor.draw()
            player.draw()
        },
        press(){
            player.jump()
        },
        atualiza(){
            player.atualiza()
            floor.atualiza()
            boxOBJ.atualiza()
        }
    }
}

function listenKeys(){
    document.addEventListener('keydown', pegaTecla)
}

function pegaTecla(event){
    var tecla=event.keyCode
    if (tecla==32){
        player.jump()
    }
}

function mainloop(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    telaAtiva.atualiza()
    telaAtiva.draw()
    //boxOBJ.draw()
    //floor.draw()
    //player.draw()

    //player.atualiza()
    requestAnimationFrame(mainloop)
}

listenKeys()
mudarTela(Telas.JOGO)
mainloop()