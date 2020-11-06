//variables universales
let pokemons = [];

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

    $(btnOrdenar).css('display','flex');

    $(btnBuscar).css('display','none');
});


//boton de buscar
$(".btn-buscar").click(function(){

    $(btnBuscar).css('display','flex');

    $(btnOrdenar).css('display','none');

});


//boton ordenar 
$("#button-addon1").click(function(){

    let inputOrdenar = document.querySelector(".input-ordenar").value;

    if (inputOrdenar.length === 0) {
        
        alert("el campo no debe estar vacio");
    }else{

        if(inputOrdenar !== "asc" && inputOrdenar !== "desc"){
        
            alert("el campo debe tener la palabra 'asc' o 'desc'");
        }

    }

    if (inputOrdenar === "desc") {

        creacionSpiner();

        pokemons.reverse();

        llenarPokemons(pokemons);
    }

    if (inputOrdenar === "asc") {
        
        creacionSpiner();

        pokemons.reverse().sort();

        llenarPokemons(pokemons);
    }

});


// boton buscar
$("#button-addon2").click(function(){

    let inputBuscar = document.querySelector(".input-buscar").value;

    //alert(pokemons.name.substr(0,1));

    if (inputBuscar.length === 0 || inputBuscar.length > 1) {

        alert("solo debe introducir un caracter");
    }

    let arrayFiltrado = pokemons.filter(valor => valor.name.substr(0,1) == inputBuscar.toUpperCase());

    creacionSpiner();
    
    llenarPokemons(arrayFiltrado);

});

