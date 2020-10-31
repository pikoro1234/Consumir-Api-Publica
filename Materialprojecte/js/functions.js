$( document ).ready(function() {
					
	// POKEMONS
	/* 
	var urlPokemon = "js/data/pokemon.json";	
	$.ajax({					
		async: false,
		url: urlPokemon
	})
	.done(function( data ) {
		var pokemons = data.pokemon;
		for(var i = 0; i< pokemons.length; i++){
			console.log(pokemons[i].name);
		}
	});
	*/
	
	// MUNICIPIS
	/*
	var urlMunicipisBcn = "js/data/municipis.json";
	$.ajax({					
		async: false,
		url: urlMunicipisBcn
	})
	.done(function( data ) {
		var municipis = data.elements;
		alert(data);
		for(var i = 0; i< municipis.length; i++){
			console.log(municipis[i].municipi_nom);
		}
	});
	*/
	
	// METEORITS
	/*
	var urlEarthMeteorite = "js/data/earthMeteorites.json";
	$.ajax({					
		async: false,
		url: urlEarthMeteorite
	})
	.done(function( data ) {
		var meteorits = data;
		for(var i = 0; i< meteorits.length; i++){
			console.log(meteorits[i].name);
		}
	});
	*/
	// MOVIES
	var urlMovies = "js/data/movies.json";
	$.ajax({					
		async: false,
		url: urlMovies
	})
	.done(function( data ) {
		var movies = data;
		alert(movies.length);
		for(var i = 0; i< movies.length; i++){
			console.log(movies[i].title);
		}
	});
	
});