jQuery(document).ready(function () {
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
        seccionHome.hide();
        seccionBuscar.show();
        resultadoWeather.hide();
    });
    
    function buscarTiempo(ciudad) {
        var apiKey = '1b73694ea1887ac95e48b4b93ec87213';
        var url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&lang=es&units=metric`;

        $.ajax({
            url: url,
            method: 'GET',
            success: function (data) {
                var descripcion = data.list[0].weather[0].description;
                var icono = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
                
                var dias = {};
                data.list.forEach(function (item) {
                    var fecha = new Date(item.dt * 1000);
                    var dia = fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
                    if (!dias[dia]) {
                        dias[dia] = item.weather[0].description;
                    }
                });
                
                resultadoWeather.html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-4">
                                <img src="${icono}" alt="Tiempo" class="img-fluid">
                            </div>
                            <div class="col-8">
                                <p>Clima actual de ${ciudad}: ${descripcion}</p>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid mt-3">
                        <div class="row">
                            <div class="col-12">
                                <p>Predicción para los próximos 4 días:</p>
                                <ul>
                                    ${Object.keys(dias).slice(0, 4).map(function (dia) {
                                        return `<li>${dia}: ${dias[dia]}</li>`;
                                    }).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
                resultadoWeather.show();
            },
            error: function (xhr) {
                alert('No se pudo obtener la información del clima: ' + xhr.responseText);
            }
        });
    }
    
    $('#btnBuscar').on('click', function () {
        buscarTiempo($('#inputCiudad').val());
    });

    $('#irLocalizacion').on('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                
                var apiKey = '1b73694ea1887ac95e48b4b93ec87213';
                var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=es`;

                $.ajax({
                    url: url,
                    method: 'GET',
                    success: function (data) {
                        var ciudad = data.name;
                        seccionHome.hide();
                        seccionBuscar.hide();
                        buscarTiempo(ciudad);
                    },
                    error: function (xhr) {
                        alert('No se pudo obtener la ubicación o el clima: ' + xhr.responseText);
                    }
                });
            }, function (error) {
                alert('No se pudo obtener la ubicación: ' + error.message);
            });
        } else {
            alert('La geolocalización no está soportada en este navegador.');
        }
    });
});
