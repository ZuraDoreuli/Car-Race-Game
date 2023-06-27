const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let lifes = 5
let left = false
let right = false
let speed = 4
setInterval(function () {
  speed ++
}, 3000);

const line = new Image()
line.src = './line.png'
line.X = 180
line.Y = -140

const line2 = new Image()
line2.src = './line.png'
line2.X = 180
line2.Y = 160

const myCar = new Image()
myCar.src = './car-1.png'
myCar.X = 160
myCar.Y = 395

const enemyCar1 = new Image()
enemyCar1.src = './car-2.png'
enemyCar1.X = 50
enemyCar1.Y = -150

const enemyCar2 = new Image()
enemyCar2.src = './car-3.png'
enemyCar2.X = 250
enemyCar2.Y = -450

function coloringRectangle() {
  ctx.fillStyle = 'Gray'
  ctx.fillRect(0, 0, 400, 500)
}

function drawLifes() {
  ctx.font = '30px Serif'
  ctx.fillStyle = 'White'
  ctx.fillText('Lifes : ' + lifes, 275, 40)
}

function drawLines() {
  ctx.drawImage(line, line.X, line.Y)
  line.Y += 3
  if(line.Y > 500) {
    line.Y = -140
  }
  ctx.drawImage(line2, line2.X, line2.Y)
  line2.Y += 3
  if(line2.Y > 500) {
    line2.Y = -140
  }
}

function stop() {
  cancelAnimationFrame(myReq)
  ctx.font = '60px Serif'
  ctx.fillStyle = 'Red'
  ctx.fillText('Game Over', 60, 200)
  ctx.font = '40px Serif'
  ctx.fillStyle = 'Blue'
  ctx.fillText(`Your speed was: ${speed}`, 50, 300)
  stop = true
}

function drawMyCar() {
  if (left === true && myCar.X > 0) {
    myCar.X -= 7
  }
  if (right === true && myCar.X < 335) {
    myCar.X += 7
  }
  ctx.drawImage(myCar, myCar.X, myCar.Y)
}

function drawEnemyCar1() {
  if (enemyCar1.Y + 100 > myCar.Y && enemyCar1.X + 65 > myCar.X && enemyCar1.X < myCar.X + 65 ) {
    crash = true
    enemyCar1.Y = enemyCar2.Y - 300
    lifes --
    if (lifes < 1) {
      stop()
    }
  } else {
    crash = false
  }
  if (!crash) {
    ctx.drawImage(enemyCar1, enemyCar1.X, enemyCar1.Y)
    enemyCar1.Y += speed
    if (enemyCar1.Y > 500) {
      enemyCar1.Y = -100
      enemyCar1.X = Math.floor(Math.random() * 335)
    }
  }
}

function drawEnemyCar2() {
  if (enemyCar2.Y + 100 > myCar.Y && enemyCar2.X + 65 > myCar.X && enemyCar2.X < myCar.X + 65 ) {
    crash = true
    enemyCar2.Y = enemyCar1.Y - 300
    lifes --
    if (lifes < 1) {
      stop()
    }
  } else {
    crash = false
  }
  if (!crash) {
    ctx.drawImage(enemyCar2, enemyCar2.X, enemyCar2.Y)
    enemyCar2.Y += speed
    if (enemyCar2.Y > 500) {
      enemyCar2.Y = -100
      enemyCar2.X = Math.floor(Math.random() * 335)
    }
  }
}

function render() {
  if (stop === true) {
    return
  }
  coloringRectangle()
  drawLifes()
  drawLines()
  drawMyCar()
  drawEnemyCar1()
  drawEnemyCar2()
  myReq = requestAnimationFrame(render)
}
render()

addEventListener('keydown', function(event) {
  const newDirect = event.keyCode
  if (newDirect === 37) {
    left = true
  }
  if (newDirect === 39) {
    right = true
  }
})
addEventListener('keyup', function(event) {
  const newDirect = event.keyCode
  if (newDirect === 37) {
    left = false
  }
  if (newDirect === 39) {
    right = false
  }
})