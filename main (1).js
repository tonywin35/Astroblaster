import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("bean", "sprites/bean.png")
loadSprite("ANC", "sprites/ally nexus core.png")
loadSprite("ANf", "sprites/ally outer nexus.png")
//loadSprite("ANb", "sprites/ally outer nexus back.png")
loadSprite("ANfl", "sprites/ally outer nexus front-left.png")
loadSprite("ANl", "sprites/ally outer nexus rotate left.png")
loadSprite("ANbl", "sprites/ally outer nexus back-left.png")
loadSprite("ANb", "sprites/ally outer nexus back.png")
loadSprite("ANbr", "sprites/ally outer nexus back-right.png")
loadSprite("ANr", "sprites/ally outer nexus right.png")
loadSprite("ANfr", "sprites/ally outer nexus front-right.png")
loadSprite("ctl", "sprites/corner topleft.png")
loadSprite("wt", "sprites/wall topp.png")
loadSprite("ctr", "sprites/corner topright.png")
loadSprite("wl", "sprites/wall left.png")
loadSprite("floor", "sprites/floor.png")
loadSprite("wr", "sprites/wall right.png")
loadSprite("cbr", "sprites/corner botright.png")
loadSprite("cbl", "sprites/corner botleft.png")
loadSprite("wb", "sprites/wall bot.png")
loadSprite("bround", "sprites/backround.png")
loadSprite("minion", "sprites/minion.png")
loadSprite("enemy2", "sprites/enemy2.png")
loadSprite("enemyspawn", "sprites/enemyspawn.png")

function spawnBullet(p) {
    add([
      rect(12, 12),
      area(),
      pos(p),
      origin("center"),
      color(127, 127, 255),
      outline(4),
      //layer("ui"),
      move(RIGHT, BULLET_SPEED),
      cleanup(),
      // strings here means a tag
      "bullet",
    ])
  }

// for(let i = 0; i < 10; i++){
//     spawnEnemy()
//     }

const BULLET_SPEED = 600

scene("main", ({levelIdx, score}) => {
  const SPEED = 320
  // const BULLET_SPEED = 600
  const ENEMY_SPEED = 60
  const ENEMY2_SPEED = 120
  const MAX_PLAYER_HP = 10
  score = 0
  const levels = [
    [
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
     "}<==================>}}}}}}}}}}}}}}}}}}}}}}",
     "}|999999999999999999:}}}}}}}}}}}}}}}}}}}}}}",
     "}|999999999999999999+===================>}}",
     "}|99999999999999999999999999999999999999:}}",
     "}|99999999999999999999999999999999999999:}}",
     "}|9999abc999999999999999999999999999yy99:}}",
     "}|9999efg999999999999999999999999999yy99:}}",
     "}|9999hij9999999999999999999999999999999:}}",
     "}|99999999999999999999999999999999999999:}}",
     "}|999999999999999999<___________________-}}",
     "}|999999999999999999:}}}}}}}}}}}}}}}}}}}}}}",
     "}+__________________-}}}}}}}}}}}}}}}}}}}}}}",
     "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
    ]
  ]

   layers([
  "game",
  "ui",
], "game")


  const level = addLevel(levels[levelIdx || 0], {
    width: 32,
    height: 32,
    pos: vec2(40, 40),

    "y" : () => [
      sprite("enemyspawn"),
      layer("ui"),
    ],

    "}" : () => [
      sprite("bround"),
      area(),
      layer("ui"),
      solid(),
    ],

    "<": () => [
      sprite("ctl"),
      area(),
    layer("ui"),
      solid(),
    ],

    "=": () => [
      sprite("wt"),
      area(),
    layer("ui"),
      solid(),
    ],

    ">": () => [
      sprite("ctr"),
      area(),
    layer("ui"),
      solid(),
    ],

    "|": () => [
      sprite("wl"),
      area(),
    layer("ui"),
      solid(),
    ],

    ":": () => [
      sprite("wr"),
      area(),
    layer("ui"),
      solid(),
    ],

    "+": () => [
      sprite("cbl"),
      area(),
    layer("ui"),
      solid(),
    ],

    "_": () => [
      sprite("wb"),
      area(),
    layer("ui"),
      solid(),
    ],

    "-": () => [
      sprite("cbr"),
      area(),
    layer("ui"),
      solid(),
    ],

    "9": () => [
      sprite("floor"),
      layer("game"),
    ],

    "a": () => [
      sprite("ANbl"),
      area(),
      solid(),
    ],

    "b": () => [
      sprite("ANb"),
      area(),
      solid(),
    ],

    "c": () => [
      sprite("ANbr"),
      area(),
      solid(),
    ],

    "e": () => [
      sprite("ANl"),
      area(),
      solid()
    ],

     "f": () => [
       sprite("ANC"),
       area(),
       solid(),
     ],

    "g": () => [
      sprite("ANr"),
      area(),
      solid(),
    ],

    "h": () => [
      sprite("ANfl"),
      area(),
      solid(),
    ], 

    "i": () => [
      sprite("ANf"),
      area(),
      solid(),
    ],

  "j": () => [
    sprite("ANfr"),
      area(),
      solid(),
    ], 

  "$": () => [
    sprite("bean"),
      area(),
      layer("ui"),
      solid(),
    "player",
    ],

  })
const player = add([
  sprite("bean"),
  pos(vec2(140, 260)),
  origin("center"),
  layer("ui"),
  area(),
  health(10),
  solid(),
  "player",
])



 //  const healthbar = add([
  // 	rect(24, 24),
  // 	pos(player, player + 300),
  // 	color(127, 255, 127),
 //    //layer("ui"),
  // 	{
  // 		max: 10,
  // 		set(hp) {
  // 			this.width = 24 * hp / this.max
  // 			this.flash = true
  // 		},
  // 	},
  // ])

 //  player.onHurt(() => {
  // 	healthbar.set(player.hp())
  // })


  player.onUpdate(() => {
  // Set the viewport center to player.pos
  camPos(player.pos)
})

  onClick(() => {
  // Use toWorld() to transform a screen-space coordinate (like mousePos()) to the world-space coordinate, which has the camera transform applied
  const worldMousePos = toWorld(mousePos())
  addKaboom(worldMousePos)
})

  onKeyPress("space", () => {
    // spawnBullet(player.pos.sub(16, 0))
    //spawnBullet(player.pos.add(16, 0))
    spawnBullet(player.pos.sub(14, 0))
  })

  const enemy = add([
  sprite("minion"),
  pos(vec2(1220,260)),
  origin("center"),
  area(),
  health(6),
  layer("ui"),
  state("move"),
    "minion"
  ])

   onCollide("bullet", "minion", (b,e) => {
    destroy(b)
    layer("ui")
    e.hurt(1) 
})

 //  player.onCollide("minion", (e) => {
  // 	destroy("minion")
  // 	destroy(player)
  // 	shake(120)
  // })

  player.onUpdate(() => {
    if (player.isColliding(enemy)) {
      enemy.hurt(1)
      destroy(player)
    } 
})

//     player.onUpdate(() => {
//     if (onCollide("bullet","minion")) {
//       enemy.hurt(1)
// 	    destroy("bullet")
//     }
// })
  const enemy2 = add([
  sprite("enemy2"),
  pos(vec2(1220,260)),
  origin("center"),
  area(),
  health(9),
  layer("ui"),
  state("move"),
    "boss"
    ])

  on("death", "minion", (e) => {
    destroy(e)
    shake(2)
    addKaboom(e.pos)
    score++
    scoreLabel.text = score

    enemy2.onStateUpdate("move", () => {
  if (!player.exists()) return
  const dir = player.pos.sub(enemy2.pos).unit()
  enemy2.move(dir.scale(ENEMY2_SPEED))
})

    player.onUpdate(() => {
    if (player.isColliding(enemy2)) {
      enemy2.hurt(1)
      destroy(player)
    } 
})

    onCollide("bullet", "boss", (b,e2) => {
    destroy(b)
    layer("ui")
    e2.hurt(1) 
})

     on("death", "boss", (e2) => {
    destroy(e2)
    shake(2)
    addKaboom(e2.pos)
    score++
    scoreLabel.text = score
     })


})

  // if(enemy.health() == 0){
  //   const enemy2
  // }

  const scoreLabel = add([
    text(score),
    layer("ui"),
    pos(500,12),
    fixed(),
  ])


  on("hurt", "minion", (e) => {
    shake(1)    
  })

  const timer = add([
    text(0),
    pos(12, 15),
    fixed(),
    layer("ui"),
    { time: 0, },
  ])

  timer.onUpdate(() => {
    timer.time += dt()
    timer.text = timer.time.toFixed(2)
  })

  enemy.onStateUpdate("move", () => {
  if (!player.exists()) return
  const dir = player.pos.sub(enemy.pos).unit()
  enemy.move(dir.scale(ENEMY_SPEED))
})


  const dirs = {
    "left": LEFT,
    "right": RIGHT,
    "up": UP,
    "down": DOWN,
  }

  for (const dir in dirs) {
    onKeyDown(dir, () => {
      player.move(dirs[dir].scale(SPEED))
    })
  }
})

go("main", 0)
