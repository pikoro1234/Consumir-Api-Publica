//variables universales
let pokemons = [];

let cadenaTabla ="";

$("#lista-pokemon").click(function(){

    let tablaPokemons = document.querySelector(".contenido-lista");

    $(tablaPokemons).css('display','block');

    let cardPokemons = document.querySelector(".contenido-datos");

    $(cardPokemons).css('display','none');

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


const llenarPokemons = (datos) =>{

    pokemons = datos.pokemon;

    for(let poke of pokemons){

        console.log(poke.name)
    }
}

