let arrayPokemons = [];

//obtenemos los pokemons con axios
let obtenerDatosAxios = () =>{

    axios.get('./js/data/pokemon.json',{

        responseType: 'json'

    }).then(function(res){

        if (res.status === 200) {

            creacionPokemons(res.data.pokemon);
        }
    })
    .catch(function(err){

        console.log(err);
    })
}

class Pokemon {

    constructor(id, nombre, peso, imagen) {

        this.id = id;

        this.nombre = nombre;

        this.peso = peso;

        this.imagen = imagen;
    }
}

let creacionPokemons = (datos) =>{

    for(let data of datos){

        arrayPokemons.push(new Pokemon(data.id,data.name,data.weight,data.img));
    }

    console.log(arrayPokemons);

}


$(".btn-pokemon-object").click(function(){

    obtenerDatosAxios();

});

