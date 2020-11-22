let favoritoSection= document.getElementById('favoritos-section');
let favVacio= document.getElementById('principal_sin_contenido');
let botonesPagina= document.getElementById('botones-pagina');

//Aca tendría que estar la funcion agregando en el caso de que magicamente
//me deje de funcionar todo

function cargarPagina() { 
if (!localStorage.getItem('favArray') || localStorage.getItem('favArray')== "[]") {
    //Decir que no agregaste ningun favorito
    favVacio.style.display= 'flex';
    botonesPagina.style.display= "none";
    botonesPagina.classList.remove('active');
} else {
    favVacio.style.display= 'none';
    favoritoSection.innerHTML= "";
    let favALleno= localStorage.getItem('favArray');
    let favArrayLleno= favALleno.split(','); //El localStorage te devuelve un string por eso lo paso a array
    let myRegex= /[a-z0-9]/gi; 
    var filtrado= [];
    favArrayLleno.filter((x) => {
        filtrado.push(x.match(myRegex).join(''));
    });
    mostrarFav(0, 12);
}

}

function mostrarFav (offset, limit) { 
    let favALleno= localStorage.getItem('favArray');
    let favArrayLleno= favALleno.split(','); //El localStorage te devuelve un string por eso lo paso a array
    let myRegex= /[a-z0-9]/gi; 
    var filtrado= [];
    favArrayLleno.filter((x) => {
        filtrado.push(x.match(myRegex).join(''));
    });
        let src;
        let names;
        let id_gif;

        if (!botonesPagina.classList.contains('active')) {  
            botonesPagina.classList.add('active');
            botonesPagina.style.display= "flex";
            let offsetOriginal= 0;
            let cantidadDePag= filtrado.length/12;
            if (cantidadDePag<1) {
                console.log('solo 1 pagina, mostrá solo 12 gifs');
            } else {
                for(let y=1; y<cantidadDePag; y++) {
                    offsetOriginal += 12;
                    let boton= document.createElement('button');
                    boton.setAttribute('id', 'pagina'+(y+1));
                    boton.classList.add('boton');
                    boton.setAttribute('onclick', 'mostrarFav('+offsetOriginal+', 24)');
                    boton.innerHTML= (y+1);
                    botonesPagina.appendChild(boton);             
                 }       
            }
        }
            let limite;
            if (filtrado.length < limit) {
                limite= filtrado.length;
            } else {
                limite= limit;
            }

            for (let x=offset; x<limite; x++) {               
            let url_id= `https://api.giphy.com/v1/gifs/${filtrado[x]}?api_key=${api_key}`;
            fetch(url_id)
            .then(r=> r.json())
            .then(j=> {
                names= j.data.title;
                id_gif= filtrado[x];
                src= j.data.images.original.url;
                let favContainer= document.createElement('div');
                favContainer.classList.add('favContainer');
                let giph= document.createElement('img');
                giph.classList.add('foto-s2');
                giph.setAttribute('src', src);
                favoritoSection.appendChild(favContainer);
                favContainer.appendChild(giph);

                if (window.screen.width < 900) {
                    favContainer.setAttribute('onclick', 'expandir(event,"' + id_gif + '")');
                } else { 
                     //AGREGAR HOVER
                let divHover= document.createElement('div');
                let txt="<div class='icons-hover'><img class='icons-gif active' onclick='eliminarFav("+ 'event,"' + id_gif + '"' +")' src='img/desktop/DAY/icons/icon-fav-active.svg' alt='Icon Fav'/>" + 
                                "<img class='icons-gif' onclick='downloadGif("+ '"' + src + '"' +")' src='img/desktop/DAY/icons/icon-download.svg' alt='Icon Fav'/>" +
                                "<img class='icons-gif' onclick='expandir("+ 'event,"' + id_gif + '"' +")' src='img/desktop/DAY/icons/icon-max-normal.svg' alt='Icon Fav'/></div>" +
                                "<div class='text-hover'> <h3>User</h3>" +
                                "<h2>"+names+"</h2></div>";
                divHover.innerHTML= txt;
                divHover.classList.add("hoverContentF");
                favContainer.appendChild(divHover);
                }
                   
                })
            .catch(err=> console.log(err));
        }  
                
    
}

function eliminarFav(event, id) {
    let localActual= localStorage.getItem('favArray');
    let imagenA= event.target; //Accedo a la etiqueta que contiene la función elimnarFav

    if (imagenA.classList.contains('active')) { //Chequeo si la etiqueta contiene la clase 'active'
        imagenA.classList.remove('active');
        let favArrayLleno= localActual.split(','); //El localStorage te devuelve un string
        let myRegex= /[a-z0-9]/gi; //Por eso lo paso a array
        let filtrado= [];
        favArrayLleno.filter((x) => {
            filtrado.push(x.match(myRegex).join(''));
        });
        let favsSinRepetidos= [...new Set(filtrado)]; //Saco los repetidos del array 
        let localNuevo= favsSinRepetidos.filter((x)=> x !=id); //Saco del array en localStorage
        //el elemento que coincida con el id seleccionado
        localStorage.setItem('favArray', JSON.stringify(localNuevo)); //Nuevo array en localStorage 
        //con el id seleccionado eliminado
        favoritoSection.innerHTML= "";
        
        getTrendings(0, 3);

        if (!localStorage.getItem('favArray') || localStorage.getItem('favArray') == '[]') {
            botonesPagina.style.display= "none";
            botonesPagina.classList.remove('active');
        }
        
        
        cargarPagina();
    }

}