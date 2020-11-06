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


const creacionSpiner = () =>{
    /*spiner*/
    let spiner = document.querySelector(".spiner-load");

    let backgroundSpiner = document.querySelector(".backgroud-spiner"); 

    $(spiner).css('visibility','visible');

    $(backgroundSpiner).css('visibility','visible');

    setTimeout(function(){ 

        $(spiner).css('visibility','hidden');        

        $(backgroundSpiner).css('visibility','hidden');
        
    }, 4000);
    /*spiner*/
}

//boton de pokemon para listarlos
$("#lista-pokemon").click(function(){ 
    
    creacionSpiner();

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
        
        llenarPokemons(data);
    });//fin ajax
    
});//fin click lista pokemon

//funcion llenar pokemons a la tabla
const llenarPokemons = (datos) =>{

    pokemons = datos.pokemon;

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

//funcion datos para detalle de cada pokemon
const modalPokemon = (idPokemon) =>{

    modalContenedor.innerHTML = "";

    for(let poked of pokemons){

        if (poked.id === idPokemon) {

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
                            <li><p class="card-title">${poked.candy}</p></li>
                            <li><p class="card-title">${poked.height}</p></li>
                            <li><p class="card-title">${poked.weight}</p></li>
                            <li><p class="card-title">${poked.type[0]}</p></li>
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


/*
"num": "001",
    "name": "Bulbasaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 25,
    "egg": "2 km",
    "spawn_chance": 0.69,
    "avg_spawns": 69,
    "spawn_time": "20:00",
    "multipliers": [1.58],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "next_evolution": [{
      "num": "002",
      "name": "Ivysaur"
    }, {
      "num": "003",
      "name": "Venusaur"
    }]
*/





















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
