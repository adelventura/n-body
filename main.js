let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let canvasColor = "#2a2e33";
let pointColor = "#ffffff";

function resize() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
}

window.addEventListener("resize", resize);
resize();
canvas.setAttribute("style", "position: absolute; x:0; y:0;");

ctx.fillStyle = canvasColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function point(x, y, radius, mass, color) {
    this.x = x;
    this.y = y;
    this.vx = 2 * Math.random() - 1;
    this.vy = 2 * Math.random() - 1;
    this.radius = radius;
    this.mass = mass;
    this.color = color;

    this.update = function(points) {
        let ax = 0;
        let ay = 0;

        for (var i = 0; i < points.length; i++) {
            let other = points[i];
            if (other === this) {
                continue;
            }
            let sx = this.x - other.x;
            let sy = this.y - other.y;
            let distance = Math.sqrt(sx * sx + sy * sy);
            let distanceSquared = Math.pow(distance, 2);

            ax -= sx / distanceSquared * other.mass;
            ay -= sy / distanceSquared * other.mass;
        }

        this.vx += ax;
        this.vy += ay;
        this.x += this.vx;
        this.y += this.vy;
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

for(let i = 0; i < 300; i++) {
    let x = Math.floor(canvas.width * Math.random());
    let y = Math.floor(canvas.height * Math.random());
    let p = new point(x, y, 1.5, 0.5, pointColor);
    points.push(p);
}

function loop() {
    ctx.fillStyle = canvasColor;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < points.length; i++) {
        points[i].update(points);
        points[i].draw(ctx);
    }
    requestAnimationFrame(loop);
}

