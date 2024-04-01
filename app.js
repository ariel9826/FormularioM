// Esta función carga una imagen dada una URL y devuelve una promesa que se resuelve con la imagen cargada.
function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

// Esta función se ejecuta cuando la ventana ha terminado de cargar.
window.addEventListener('load', async () => {

    // Se obtiene el canvas del formulario y se ajusta su tamaño.
    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    // Se crea un SignaturePad con el canvas.
    signaturePad = new SignaturePad(canvas, {});

    // Agregar la funcionalidad para el botón "Borrar Firma"
    document.getElementById('borrarFirma').addEventListener('click', () => {
        signaturePad.clear();
    });

    // Agregar la funcionalidad para el botón "Reiniciar Firma"
    document.getElementById('reiniciarFirma').addEventListener('click', () => {
        signaturePad.clear();
    });

    // Se obtiene el formulario y se añade un evento para cuando se envíe.
    const form = document.querySelector('#form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Se obtienen los valores de los campos del formulario.
        let estado = document.getElementById('estado').value;
        let distritoElectoral1 = document.getElementById('distritoElectoral1').value;
        let nombres = document.getElementById('nombres').value;
        let apellidoPaterno = document.getElementById('apellidoPaterno').value;
        let apellidoMaterno = document.getElementById('apellidoMaterno').value;
        let calle = document.getElementById('calle').value;
        let numeroExterior = document.getElementById('numeroExterior').value;
        let numeroInterior = document.getElementById('numeroInterior').value;
        let colonia = document.getElementById('colonia').value;
        let delegacionMunicipio = document.getElementById('delegacionMunicipio').value;
        let codigoPostal = document.getElementById('codigoPostal').value;
        let telefonoFijo = document.getElementById('telefonoFijo').value;
        let telefonoMovil = document.getElementById('telefonoMovil').value;
        let correoElectronico = document.getElementById('correoElectronico').value;
        let claveElector = document.getElementById('claveElector').value;
        let municipio = document.getElementById('municipio').value;
        let distritoElectoral2 = document.getElementById('distritoElectoral2').value;
        let seccion = document.getElementById('seccion').value;

        // Se carga la imagen de fondo del PDF.
        const image = await loadImage("formulario.jpg");
        // Se obtiene la firma capturada como una imagen.
        const signatureImage = signaturePad.toDataURL();

        // Se obtienen las imágenes cargadas.
        const imagen1File = document.getElementById('imagen1').files[0];
        const imagen2File = document.getElementById('imagen2').files[0];

        // Se convierten las imágenes en formato base64.
        const imagen1DataURL = await fileToDataURL(imagen1File);
        const imagen2DataURL = await fileToDataURL(imagen2File);

        // Se crea un objeto jsPDF para generar el PDF.
        const pdf = new jsPDF('p', 'pt', 'letter');

        // Se añade la imagen de fondo al PDF.
        pdf.addImage(image, 'PNG', 0, 0, 565, 792);
        // Se añade la firma al PDF.
        pdf.addImage(signatureImage, 'PNG', 140, 480, 300, 60);

// Se añaden los datos del formulario al PDF.
pdf.setFontSize(10);
pdf.text(estado, 85, 148); // Ajusta la posición según sea necesario
pdf.text(distritoElectoral1, 430, 148); // Ajusta la posición según sea necesario
pdf.text(nombres, 22, 190);
pdf.text(apellidoPaterno, 225, 190);
pdf.text(apellidoMaterno, 390, 190);
pdf.text(calle, 22, 220);
pdf.text(numeroExterior, 270, 220);
pdf.text(numeroInterior, 460, 220);
pdf.text(colonia, 22, 255);
pdf.text(delegacionMunicipio, 255, 255);
pdf.text(codigoPostal, 465, 255);
pdf.text(correoElectronico, 22, 320);
pdf.text(municipio, 65, 400);
pdf.text(distritoElectoral2, 420, 400);


// Separación de caracteres para el teléfono fijo
let telefonoFijoSeparated = telefonoFijo.split('').join('      '); // Agrega más espacio entre los caracteres
pdf.text(telefonoFijoSeparated, 65, 285);

// Separación de caracteres para el teléfono móvil
let telefonoMovilSeparated = telefonoMovil.split('').join('      '); // Agrega más espacio entre los caracteres
pdf.text(telefonoMovilSeparated, 340, 285);

// Convertir la clave de elector a mayúsculas
claveElector = claveElector.toUpperCase();

// Separación de caracteres para la clave de elector
let claveElectorSeparated = claveElector.split('').join('   '); // Agrega más espacio entre los caracteres
pdf.text(claveElectorSeparated, 310, 318);


// Separación de caracteres para la sección
let seccionSeparated = seccion.split('').join('      '); // Agrega más espacio entre los caracteres
pdf.text(seccionSeparated, 64, 425);


        // Se añaden las imágenes al PDF.
        if (imagen1DataURL) {
            pdf.addImage(imagen1DataURL, 'JPEG', 26, 580, 224, 155);
        }
        if (imagen2DataURL) {
            pdf.addImage(imagen2DataURL, 'JPEG', 310, 580, 224, 155);
        }

        pdf.setFillColor(0,0,0);

        // Se guarda el PDF.
        pdf.save("example.pdf");
    });

});

// Función para convertir un archivo a formato base64.
function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        reader.onerror = (e) => {
            reject(e);
        };
        reader.readAsDataURL(file);
    });
}
