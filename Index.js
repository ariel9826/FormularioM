const canvas = document.getElementById('firmaCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let prevX = 0;
let prevY = 0;

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    prevX = event.clientX - canvas.offsetLeft;
    prevY = event.clientY - canvas.offsetTop;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
        prevX = x;
        prevY = y;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

function limpiarFirma() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardarFirma() {
    // Aquí puedes guardar la firma en algún lugar, como un campo oculto en el formulario.
}
