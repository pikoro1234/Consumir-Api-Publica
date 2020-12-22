let arrayDatos =[];

const traerPokemon = () =>{ 

  let tablaPokemons = document.querySelector(".contenido-lista");

  $(tablaPokemons).css('display','none');

  let cardPokemons = document.querySelector(".contenido-datos");

  $(cardPokemons).css('display','flex');


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

  fetch('js/data/pokemon.json')
  .then(response => response.json())
  .then(data => {
    llenarDatos(data.pokemon)
  })
}

const llenarDatos = (data) =>{

  arrayDatos = data;

  let elemento = document.querySelector(".contenido-datos");

  elemento.innerHTML = "";

  for(let items of arrayDatos){
    elemento.innerHTML +=`
    <div class="card tarjetas-pokemon">
      <div class="background-black">
        <div class="image">
          <a href=""><img src="${items.img}" class="card-img-top imagen" alt="..."></a>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${items.name}</h3>        
        <input type="hidden" name="idPokemon" id="idPokemon" class="form-control" value="${items.id}">       
      </div>					
      <div class="card-body">
        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal" onclick="detallesModal(${items.id});">Detalles</button>
      </div>
    </div>`;
  }
}

const detallesModal = (idPokemon) =>{

  let idPokemonModal = document.querySelector(".modalPokemos");

  let evolucion ="";

  idPokemonModal.innerHTML = "";

  for(let datos of arrayDatos){

    if (datos.id === idPokemon) {


      if (datos.next_evolution) {
        datos.next_evolution.forEach(value =>{
          evolucion +=" | "+value["name"]+" | ";
        }) 
      }else{
        evolucion = "sin evoluciones";
      }
  
      idPokemonModal.innerHTML +=`
   
			<div class="modal-header">
			  <h3 class="modal-title" id="exampleModalLabel">${datos.name}</h3>
				  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
				  </button>
			</div>
      <div class="modal-body">
        <div class="contenido-imagenes">
          <img src="${datos.img}" class="rounded-circle" alt="Cinque Terre">         
        </div>  
        <div class="contenido-detalles-pokemon">
          <ul>
            <li><h3>${datos.name}</h3></li>
            <li>Tipo: <span>${datos.type[0]}</span> | <span>${datos.type[1]}</span></li>
            <li>Altura: ${datos.height}</li>
            <li>Peso: ${datos.weight}</li>
            <li>Debilidades: ${datos.weaknesses[0]}| ${datos.weaknesses[1]} | ${datos.weaknesses[2]} | ${datos.weaknesses[3]}</li>
            <li>Evolución:${evolucion}</li>
          </ul>          
        </div>
			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			</div>
			</div>`;
      
    }
  }
}
