//variables universales
let pokemons = [];

let arrayFiltrado = [];

let arrayBidimensional = [];

let arrayTemporalBidimensional = [];

let arrayModificadoArray = [];

let arrayTemporalModificado = [];

let cadenaTabla ="";

let btnOrdenar = document.querySelector(".ordenar");

let btnBuscar = document.querySelector(".buscar");

let tablaPokemons = document.querySelector(".contenido-lista");

let cardPokemons = document.querySelector(".contenido-datos");

let cabeceraTabla = document.querySelector(".cabecera-pokemon");

let cuerpoTabla = document.querySelector(".cuerpo-pokemon");

let modalContenedor = document.querySelector(".modalPokemos");

//creacion de spiner
const creacionSpiner = () =>{
    
    let spiner = document.querySelector(".spiner-load");

    let backgroundSpiner = document.querySelector(".backgroud-spiner"); 

    $(spiner).css('visibility','visible');

    $(backgroundSpiner).css('visibility','visible');

    setTimeout(function(){ 

        $(spiner).css('visibility','hidden');        

        $(backgroundSpiner).css('visibility','hidden');
        
    }, 4000);
}

//funcion traer pokemons del json
const traerPokemons = () =>{

    $(tablaPokemons).css('display','block');

    $(cardPokemons).css('display','none');

    $(btnBuscar).css('display','none');

    $(btnOrdenar).css('display','none');

    //ajaxPokemon
    let urlPokemons = "js/data/pokemon.json";
    
	$.ajax({	

        async: false,        
		url: urlPokemons
	})
	.done(function(data){
        
        llenarPokemons(data.pokemon);
    });//fin ajax
}

//funcion llenar pokemons a la tabla
const llenarPokemons = (datos) =>{

    pokemons = datos;

    cabeceraTabla.innerHTML = "";

    cabeceraTabla.innerHTML += `
    <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center">Foto</th>
        <th scope="col">Nombre</th>
        <th scope="col">Peso</th>
        <th scope="col">Detalles</th>
    </tr>`;
    cuerpoTabla.innerHTML = "";

    for(let poke of pokemons){

        cuerpoTabla.innerHTML += `
        <tr>
            <th scope="row" class="text-center">${poke.id}</th>
            
            <td><div class="text-center" style="position: relative;">
                    <span class="badge badge-pill badge-danger" style="position: absolute;right: 56px;">${poke.type[0]}</span>
                    <a onclick="modalPokemon(${poke.id});" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal"><img src="${poke.img}" class="rounded" alt="..."></div></a>
                </td>
            <td>${poke.name}</td>
            <td>${poke.weight}</td>
            <td>
                <button type="button" class="btn btn-light btn-modal" data-toggle="modal" data-target="#exampleModal" onclick="modalPokemon(${poke.id});">Detalles</button>
            </td>
        </tr>`;

    }//fin for llenado lista pokemons

}//fin function llenarPokemons


//boton de pokemon para listarlos
$("#lista-pokemon").click(function(){ 

    creacionSpiner();

    traerPokemons();

});//fin click lista pokemon


//funcion datos para detalle de cada pokemon
const modalPokemon = (idPokemon) =>{

    modalContenedor.innerHTML = "";

    let evolucion = "";

    let debilidades = ""; 

    for(let poked of pokemons){

        if (poked.id === idPokemon) {

            if(poked.weaknesses){

                poked.weaknesses.forEach(value =>{

                    debilidades+= "  |  " + value;

                });

            }else{

                debilidades = "sin debilidades";
            }

            if (poked.next_evolution) {

                poked.next_evolution.forEach(value =>{

                  evolucion += "  |  " + value["name"];

                }); 

            }else{

                evolucion = "sin evoluciones";
            }

            modalContenedor.innerHTML +=`
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Pokemon</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <span class="badge badge-pill badge-success" style="position: absolute;left: 294px;">
                    ${poked.name}
                    </span>
                    <img src="${poked.img}" class="rounded mx-auto d-block" alt="...">
                    <div class="pokemon-modal-cuerpo">
                        <ul>
                            <li><h3 class="card-title">${poked.name}</h3></li>                            
                            <li><p class="card-title">${poked.height}</p></li>
                            <li><p class="card-title">${poked.weight}</p></li>
                            <li><p class="card-title">Tiempo regeneración -> ${poked.spawn_time}</p></li>                            
                            <li><p class="card-title">Evoluciones -> ${evolucion}</p></li>
                            <li><p class="card-title">Debilidades -> ${debilidades}</p></li>
                        </ul>
                    </div>                         
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>				
                </div>
            </div>`;
            
        }

    }

}//fin function modalPokemon


//boton de ordenar
$(".btn-ordenar").click(function(){

    if (pokemons.length ===0) {

        alert("primero ejecuta 'LISTA POKEMON' para obtener datos");

    }else{

        $(btnOrdenar).css('display','flex');

        $(btnBuscar).css('display','none');

        $(".calculo").css('display','none');

    }
    
});


//boton de buscar
$(".btn-buscar").click(function(){

    if (pokemons.length ===0) {

        alert("primero ejecuta 'LISTA POKEMON' para obtener datos");

    }else{

        $(btnBuscar).css('display','flex');

        $(btnOrdenar).css('display','none');

        $(".calculo").css('display','none');

    }    

});


//boton ordenar 
$("#button-addon1").click(function(){

    let inputOrdenar = document.querySelector(".input-ordenar").value;

    const ordenarPokemos = (arrayPokemons,caracterBuscar) =>{    

        if (caracterBuscar.length === 0) {
            
            alert("el campo no debe estar vacio");
        }else{

            if(caracterBuscar !== "asc" && caracterBuscar !== "desc"){
            
                alert("el campo debe tener la palabra 'asc' o 'desc'");
            }

        }

        if (caracterBuscar === "desc") {

            creacionSpiner();

            arrayPokemons.reverse();

            llenarPokemons(arrayPokemons);
        }

        if (caracterBuscar === "asc") {
            
            creacionSpiner();

            arrayPokemons.sort((a, b) => a - b);

            llenarPokemons(arrayPokemons);
        }

    }

    ordenarPokemos(pokemons,inputOrdenar);

});


// boton buscar
$("#button-addon2").click(function(){

    let validador = false;

    const buscarPokemons = (datoPokemon) =>{

        let inputBuscar = document.querySelector(".input-buscar").value;

        //alert(pokemons.name.substr(0,1));

        if (inputBuscar.length === 0 || inputBuscar.length > 1) {

            alert("solo debe introducir un caracter");
        }else{
            validador = true;
        }

        arrayFiltrado = datoPokemon.filter(valor => valor.name.substr(0,1) == inputBuscar.toUpperCase());

    }

    buscarPokemons(pokemons);

    if (validador) {
        
        creacionSpiner();
    
        llenarPokemons(arrayFiltrado);

    }

});//fin boton filtrar



//funcion para obtener la posicion del pokemon pasado por parametro
const posicionPokemon = (arrayPokemones) =>{

    //cpopiamos el array solo para guardar los nombres de los pokemons
    let arrayTemporal = [];

    for(let nuevos of arrayPokemones){

        arrayTemporal.push(nuevos.name);
    }

    let pokemonBuscar = prompt("ingresa el nombre del pokemon a buscar: ");

    let elementoPokemon = arrayTemporal.indexOf(pokemonBuscar);

    if (elementoPokemon === -1) {
        
        alert("primero ejecuta 'LISTA POKEMON' para obtener datos");

    }else{

        alert(`la posicion del pokemon es ${elementoPokemon}`);
    }
    
}


//boton buscar posicion de pokemon enviado por parametro
$(".btn-posicion").click(function(){
    
    posicionPokemon(pokemons);
});



//funcion llenar datos arrayBidimensional
const creacionArrayBidimensional = (datosPokemonesArray) =>{

    if (datosPokemonesArray.length === 0) {

        alert("primero ejecuta 'LISTA POKEMON' para obtener datos");

    }else{

        for(let valores of datosPokemonesArray){

            arrayTemporalBidimensional = new Array(valores.name,valores.img);
    
            arrayBidimensional.push(arrayTemporalBidimensional);
    
        }
    
        escrituraNuevaTabla(arrayBidimensional);

    }
}


//funcion crea tabla de array de arrays de dos elementos 
const escrituraNuevaTabla = (arrayBidimensional) =>{

    let contador = 0;

    document.write("<table class='table table-striped'>");

    document.write("<thead>");

    document.write("<tr>");

    document.write("<th scope='col'>nombre</th>");

    document.write("<th scope='col'>imagen</th>");

    document.write("</tr>");

    document.write("</thead>");

    document.write("<tbody>");

    for(let pokedex of arrayBidimensional){

        contador++;
        document.write("<tr>");

        document.write("<td>"+contador+".- "+pokedex[0]+"</td>");

        document.write("<td><img src='"+pokedex[1]+"' class='rounded float-right' alt='...'></img></td>");

        document.write("</tr>");

    }
    document.write("</tbody>");

    document.write("</table>");

}


//boton para arrayBidimensional
$(".btn-arrayBidimensional").click(function(){

    creacionArrayBidimensional(pokemons);

});


//metodo arrayModificado

const arrayModificado = (arrayModificar) =>{

   if (arrayModificar.length === 0) {

        alert("primero ejecuta 'LISTA POKEMON' para obtener datos");

    }else{

        for(let elem of arrayModificar){

            let peso = elem.weight.split(" ",1).toString();

            let pesoConvert = parseFloat(peso,10);

            arrayTemporalModificado = new Array(elem.name,elem.img,pesoConvert);

            arrayModificadoArray.push(arrayTemporalModificado);
            
        }

        creacionSpiner();

        pintadoTablaModificada(arrayModificadoArray);
    }
    
}


//metodo nueva tabla para pintar datos modificados del array
pintadoTablaModificada = (datos) =>{

    cabeceraTabla.innerHTML = "";

    cabeceraTabla.innerHTML += `
    <tr>
        <th scope="col">Foto</th>
        <th scope="col">Nombre</th>
        <th scope="col">Peso</th>
    </tr>`;

    cuerpoTabla.innerHTML = "";

    for(let pokecito of datos){

        cuerpoTabla.innerHTML += `
        <tr>        
            <td><img src='${pokecito[1]}' class='rounded' alt='...'></img></td>
            <td>${pokecito[0]}</td>
            <td>${pokecito[2]}</td>
        </tr>`;

    }
}

//boton arrayModificado 
$(".btn-arrayModificado").click(function(){

    arrayModificado(pokemons);
});


//boton calculo media 
$(".btn-calculo-media").click(function(){

    if (arrayModificadoArray.length === 0) {
        
        alert("primero ejecuta 'ARRAY MODIFICADO' para obtener datos")
    }else{

        $(btnOrdenar).css('display','none');

        $(btnBuscar).css('display','none');

        $(".calculo").css('display','flex');
    }
    
})