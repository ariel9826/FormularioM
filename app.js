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

    // Se obtiene el formulario y se añade un evento para cuando se envíe.
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Se obtienen los valores de los campos del formulario.
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

        // Se llama a la función para generar el PDF con los datos obtenidos del formulario.
        generatePDF(nombres, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, colonia, delegacionMunicipio, codigoPostal, telefonoFijo, telefonoMovil, correoElectronico, claveElector, municipio, distritoElectoral2, seccion);
    })

});

// Esta función genera un PDF con los datos del formulario y lo guarda.
async function generatePDF(nombres, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, colonia, delegacionMunicipio, codigoPostal, telefonoFijo, telefonoMovil, correoElectronico, claveElector, municipio, distritoElectoral2, seccion) {
    // Se carga la imagen de fondo del PDF.
    const image = await loadImage("formulario.jpg");
    // Se obtiene la firma capturada como una imagen.
    const signatureImage = signaturePad.toDataURL();

    // Se crea un objeto jsPDF para generar el PDF.
    const pdf = new jsPDF('p', 'pt', 'letter');

    // Se añade la imagen de fondo al PDF.
    pdf.addImage(image, 'PNG', 0, 0, 565, 792);
    // Se añade la firma al PDF.
    pdf.addImage(signatureImage, 'PNG', 200, 605, 300, 60);

    // Se añaden los datos del formulario al PDF.
    pdf.setFontSize(10);
    pdf.text(nombres, 22, 190);
    pdf.text(apellidoPaterno, 225, 190);
    pdf.text(apellidoMaterno, 390, 190);
    pdf.text(calle, 22, 220);
    pdf.text(numeroExterior, 270, 220);
    pdf.text(numeroInterior, 460, 220);
    pdf.text(colonia, 58, 220);
    pdf.text(delegacionMunicipio, 58, 240);
    pdf.text(codigoPostal, 58, 260);
    pdf.text(telefonoFijo, 58, 280);
    pdf.text(telefonoMovil, 58, 300);
    pdf.text(correoElectronico, 58, 320);
    pdf.text(claveElector, 58, 340);
    pdf.text(municipio, 58, 360);
    pdf.text(distritoElectoral2, 58, 380);
    pdf.text(seccion, 58, 400);
    

    pdf.setFillColor(0,0,0);

    // Se guarda el PDF.
    pdf.save("example.pdf");
}
