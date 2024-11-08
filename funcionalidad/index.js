jQuery(document).ready(function()
{
    var seccionHome = $('#seccionHome');
    var seccionBuscar = $('#seccionBuscar');
    var resultadoWeather = $('#resultadoWeather');
    seccionBuscar.hide();
    resultadoWeather.hide();
    $('#btnDesplegarColumna').on('click', function () {
        $('#columnaDesplegable').toggleClass('d-none');
    });
    $('#irHome').on('click', function () {
        seccionHome.show();
        seccionBuscar.hide();
        resultadoWeather.hide();
    });
    $('#irBuscar').on('click', function () {
        
    });
    $('#irLocalizacion').on('click', function () {
        
    });
});