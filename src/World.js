TANK.registerComponent("World")

.interfaces("Drawable")

.construct(function()
{
  // Cell Definitions
  // 0 - Floor
  // 1 - Wall
  // 2 - Door

  this.cellColors =
  [
    "#111",
    "#aaa",
    "#555"
  ];

  this.directions =
  [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  this.zdepth = 0;
  this.worldWidth = 100;
  this.worldHeight = 100;
  this.cellSize = 50;
  this.cells = [];
  this.traversed = {};
  this.x = this.worldWidth / 2;
  this.y = this.worldHeight / 2;
  this.spawnPos = [0, 0];

  for (var i = 0; i < this.worldWidth; ++i)
  {
    this.cells[i] = [];
    for (var j = 0; j < this.worldHeight; ++j)
    {
      this.cells[i][j] = 1;
    }
  }
})

.initialize(function()
{
  this.step = function()
  {

    var pos = [this.x, this.y];
    var leastTraversed = Infinity;
    var dir = 0;
    var rnd = Math.random();
    if (rnd < 0.25)
      dir = 0;
    else if (rnd < 0.5)
      dir = 1;
    else if (rnd < 0.75)
      dir = 2;
    else if (rnd <= 1)
      dir = 3;
    if (this.traversed[this.x + 1, this.y] <= leastTraversed)
      leastTraversed = 0;
    if (this.traversed[this.x - 1, this.y] <= leastTraversed)
      leastTraversed = 1;
    if (this.traversed[this.x, this.y + 1] <= leastTraversed)
      leastTraversed = 2;
    if (this.traversed[this.x, this.y - 1] <= leastTraversed)
      leastTraversed = 3;

    if (this.traversed[this.x + this.directions[dir][0] + "," + this.y + this.directions[dir][1]])
    {
      this.x += this.directions[this.leastTraversed][0];
      this.y += this.directions[this.leastTraversed][1];
    }
    else
    {
      this.x += this.directions[dir][0];
      this.y += this.directions[dir][1];
    }

    if (this.x < 0)
      this.x = 0;
    if (this.y < 0)
      this.y = 0;
    if (this.x >= this.worldWidth)
      this.x = this.worldWidth - 1;
    if (this.y >= this.worldWidth)
      this.y = this.worldWidth - 1;

    this.cells[this.x][this.y] = 0;
    if (!this.traversed[this.x + "," + this.y])
      this.traversed[this.x + "," + this.y] = 0;
    else
      this.traversed[this.x + "," + this.y] += 1;
  };

  this.generateNewWorld = function()
  {
    for (var i = 0; i < 10000; ++i)
      this.step()

    for (var i = 1; i < this.worldWidth - 1; ++i)
    {
      for (var j = 1; j < this.worldHeight - 1; ++j)
      {
        var cell = this.cells[i][j];
        if (cell === 1 && (this.cells[i + 1][j] === 0 || this.cells[i - 1][j] === 0 ||
        this.cells[i][j + 1] === 0 || this.cells[i][j - 1] === 0))
        {
          if (Math.random() < 0.01)
          {
            this.cells[i][j] = 2;
          }
        }
      }
    }

    for (var i = 0; i < this.worldWidth; ++i)
    {
      for (var j = 0; j < this.worldHeight; ++j)
      {
        if (this.cells[i][j] === 0)
        {
          this.spawnPos = [i, j];
          i = this.worldWidth;
          j = this.worldHeight;
        }
      }
    }
  };

  this.generateNewWorld();

  this.getCellAt = function(x, y)
  {
    if (x < 0 || y < 0 || x >= this.worldWidth || y >= this.worldHeight)
      return 1;

    return this.cells[x][y];
  };

  this.draw = function(ctx, camera, dt)
  {
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    for (var i = 0; i < this.worldWidth; ++i)
    {
      for (var j = 0; j < this.worldHeight; ++j)
      {
        var cell = this.cells[i][j];
        var color = this.cellColors[cell];
        ctx.fillStyle = color;
        ctx.fillRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
      }
    }
    ctx.restore();
  };
});