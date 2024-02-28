function mostrarVistaPrevia(input, idVistaPrevia) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(idVistaPrevia).src = e.target.result;
            document.getElementById(idVistaPrevia).style.display = 'block';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('imagenFrente').addEventListener('change', function () {
    mostrarVistaPrevia(this, 'vistaPreviaFrente');
});

document.getElementById('imagenAtras').addEventListener('change', function () {
    mostrarVistaPrevia(this, 'vistaPreviaAtras');
});
