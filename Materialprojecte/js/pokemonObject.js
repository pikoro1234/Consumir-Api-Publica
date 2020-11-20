class Pokemon {

    constructor(id, nombre, peso, imagen) {

        this.id = id;

        this.nombre = nombre;

        this.peso = peso;

        this.imagen = imagen;
    }
}

let arrayPokemons = [];

$(".btn-pokemon-object").click(function(){

    for (let index = 0; index < 10; index++) {
    
        console.log(new Pokemon(index,"nombre"+index,10+1,"img.jpg"+index));
            
    }

    //console.log(arrayPokemons);

});

