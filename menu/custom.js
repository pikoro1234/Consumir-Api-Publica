/*para crear el nav mostrable y escondible*/
let ubicacionPrincipal = window.pageYOffset;

window.onscroll = function(){

    let desplazamiento_actual = window.pageYOffset;

    if (ubicacionPrincipal >= desplazamiento_actual) {

        $("#header").slideDown(300);

        //document.getElementById("header").style.top = '0';

    } else {
        
        $("#header").slideUp(300);
       
        //document.getElementById("header").style.top = '-100px';
    }

    ubicacionPrincipal = desplazamiento_actual; 
}
/*para crear el nav mostrable y escondible*/