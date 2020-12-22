let contenedorSelect = document.querySelector(".form-select");

let separacionCoordenadas = "";

let latitud = 0;

let longitud = 0;

let nombre = "";

let telefono = "";

let email = "";

let url = "";

let imagen = "";

let nuevaLatitud = 0;

let nuevaLongitud = 0;

let nuevoNombre = "";

let nuevoTelefono = "";

let nuevoEmail = "";

let nuevoUrl = "";

let nuevoImagen = "";

const trearDatos = () =>{

    axios.get("../data/municipis.json",{

        responseType: 'json'
    })
    .then(function(res){

        if (res.status == 200) {

            crearSelect(res.data.elements);

        }

    })
    .catch(function(err) {

        console.log(err);
    })
}

const crearSelect = (datos) =>{

    for(let data of datos){

        console.log(data.municipi_escut);

        contenedorSelect.innerHTML +=`<option value="${data.centre_municipal},${data.municipi_nom},${data.grup_ajuntament['telefon_contacte']},${data.grup_ajuntament['email']},${data.grup_ajuntament['url_general']},${data.municipi_escut}">${data.municipi_nom}</option>`;
    }

    contenedorSelect.innerHTML +=` </select>`;
    
}

contenedorSelect.addEventListener('change', (event) =>{

    const obtenerImagen = () =>{
       
        separacionCoordenadas = event.target.value.split(",");

        imagen = separacionCoordenadas[6];

        return imagen;
    }

    obtenerImagen();

    const obtenerUrl = () =>{

        separacionCoordenadas = event.target.value.split(",");

        url = separacionCoordenadas[5];

        return url;

    }

    obtenerUrl();

    const obtenerEmail = () =>{

        separacionCoordenadas = event.target.value.split(",");

        email = separacionCoordenadas[4];

        return email;
    }

    obtenerEmail();

    const obtenerTelefono = () =>{

        separacionCoordenadas = event.target.value.split(",");

        telefono = separacionCoordenadas[3];

        return telefono;

    }
    
    obtenerTelefono();

    const obtenerNombre = () =>{

        separacionCoordenadas = event.target.value.split(",");

        nombre = separacionCoordenadas[2];

        return nombre;
        
    }

    obtenerNombre();

    const obtenerLatitud = () =>{

        separacionCoordenadas = event.target.value.split(",");

        latitud = separacionCoordenadas[0];

        return latitud;

    }

    obtenerLatitud();

    

    const obtenerLongitud = () =>{

        separacionCoordenadas = event.target.value.split(",");

        longitud = separacionCoordenadas[1];

        return longitud;
    }

    obtenerLongitud();

    nuevaLatitud = parseFloat(obtenerLatitud());

    nuevaLongitud = parseFloat (obtenerLongitud());

    nuevoNombre = obtenerNombre();

    nuevoTelefono = obtenerTelefono();

    nuevoEmail = obtenerEmail();

    nuevoUrl = obtenerUrl();

    nuevoImagen = obtenerImagen();
    
    initMap(nuevaLatitud,nuevaLongitud,nuevoNombre,nuevoTelefono,nuevoEmail,nuevoUrl,nuevoImagen)
    
})

function initMap(latitud,longitud,nombre,telefono,email,url,imagen) { 

const myLatLng = { lat: latitud /* 41.3747687 */, lng: longitud /* 2.1184912 */};

const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 19,
    center: myLatLng,
});

const marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: nombre,
});

const contentString =
    '<div class="card p-4">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">'+nombre+'</h1>' +
    '<div id="bodyContent">' +
    '<p><b>telefono:</b> '+telefono+'</p>' +
    '<p><b>email:</b> '+email+'</p>' +
    '<p class="mt-3 mb-3 text-center"><a href='+url+' class="btn btn-primary stretched-link">'+url+'</a></p>' +
    '<img src="'+imagen+'" class="rounded mx-auto d-block" alt="...">' +
    "</div>" +
    "</div>";
const infowindow = new google.maps.InfoWindow({
    content: contentString,
});

marker.addListener("click", () => {
    infowindow.open(map, marker);
});

}


