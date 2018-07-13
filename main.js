let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let canvasColor = "#2a2e33";
let pointColor = "#ffffff";

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);
canvas.setAttribute("style", "position: absolute; x:0; y:0;");

ctx.fillStyle = canvasColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function point(x, y, radius, mass, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = mass;
    this.color = color;

    this.update = function() {
        this.x += .5;
        this.y += .5;
    };

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2));
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
}

let points = [];

for(var i = 0; i < 300; i++) {
    var x = Math.floor(canvas.width * Math.random());
    var y = Math.floor(canvas.height * Math.random());
    var p = new point(x, y, 1.5, 3, pointColor);
    points.push(p);
}

function loop() {
    ctx.fillStyle = canvasColor;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < points.length; i++) {
        points[i].update();
        points[i].draw(ctx);
    }
    requestAnimationFrame(loop);
}
