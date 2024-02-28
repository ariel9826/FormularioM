// Obtener el canvas y el contexto
var canvas = document.getElementById('firmaCanvas');
var ctx = canvas.getContext('2d');

// Variables para guardar las coordenadas del punto anterior
var lastX, lastY;

// Evento de inicio de dibujo
canvas.addEventListener('mousedown', function(e) {
    // Guardar las coordenadas del punto inicial
    lastX = e.clientX - canvas.offsetLeft;
    lastY = e.clientY - canvas.offsetTop;
    
    // Iniciar el trazado de la línea
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    
    // Evento de dibujo
    canvas.addEventListener('mousemove', dibujar);
});

// Evento de fin de dibujo
canvas.addEventListener('mouseup', function() {
    // Detener el trazado de la línea
    canvas.removeEventListener('mousemove', dibujar);
});

// Función para dibujar la línea
function dibujar(e) {
    // Obtener las coordenadas del punto actual
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    
    // Dibujar una línea desde el punto anterior al punto actual
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Actualizar las coordenadas del punto anterior
    lastX = x;
    lastY = y;
}

// Función para limpiar la firma
function limpiarFirma() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para guardar la firma
function guardarFirma() {
    // Convertir el contenido del canvas a una imagen base64
    var dataURL = canvas.toDataURL();
    
    // Crear un elemento de imagen con la firma
    var img = new Image();
    img.src = dataURL;
    
    // Agregar la imagen al formulario
    document.getElementById('formulario').appendChild(img);
}
