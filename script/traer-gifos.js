let gifosVacio= document.getElementById('principal_sin_contenido');
let misGifosSection= document.getElementById('misgifos_section');
let botonesPagina= document.getElementById('botones-pagina');

function cargarPaginaGifos() { 
    if (!localStorage.getItem('gifCreados') || localStorage.getItem('gifCreados')== "[]") {
        //Decir que no agregaste ningun favorito
        gifosVacio.style.display= 'flex';
        botonesPagina.style.display= "none";
        botonesPagina.classList.remove('active');
    } else {
        gifosVacio.style.display= 'none';
        misGifosSection.innerHTML= "";
        let gifosLleno= localStorage.getItem('gifCreados');
        let gifosArrayLleno= gifosLleno.split(','); //El localStorage te devuelve un string por eso lo paso a array
        let myRegex= /[a-z0-9]/gi; 
        var filtradoGifos= [];
        gifosArrayLleno.filter((x) => {
            filtradoGifos.push(x.match(myRegex).join(''));
        });
        console.log(filtradoGifos);
        mostrarGifos(0, 12);
    }

}

function mostrarGifos (offset, limit) { 
    let gifosLleno= localStorage.getItem('gifCreados');
    let gifosArrayLleno= gifosLleno.split(','); //El localStorage te devuelve un string por eso lo paso a array
    let myRegex= /[a-z0-9]/gi; 
    var filtradoGifos= [];
    gifosArrayLleno.filter((x) => {
        filtradoGifos.push(x.match(myRegex).join(''));
    });
        let src;
        let names;
        let id_gif;

    if (!botonesPagina.classList.contains('active')) {  
        botonesPagina.classList.add('active');
        botonesPagina.style.display= "flex";
        let offsetOriginal= 0;
        let cantidadDePag= filtradoGifos.length/12;
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
            if (filtradoGifos.length < limit) {
                limite= filtradoGifos.length;
            } else {
                limite= limit;
            }

            for (let x=offset; x<limite; x++) {               
            let url_id= `https://api.giphy.com/v1/gifs/${filtradoGifos[x]}?api_key=${api_key}`;
            fetch(url_id)
            .then(r=> r.json())
            .then(j=> {
                console.log(j.data);
                names= j.data.title;
                id_gif= filtradoGifos[x];
                src= j.data.images.original.url;
                let gifoContainer= document.createElement('div');
                gifoContainer.classList.add('gifoContainer');
                let giph= document.createElement('img');
                giph.classList.add('foto-s2');
                giph.setAttribute('src', src);
                misGifosSection.appendChild(gifoContainer);
                gifoContainer.appendChild(giph);   

                //AGREGAR HOVER
                let divHover= document.createElement('div');
                let txt="<div class='icons-hover'><img class='icons-gifos' onclick='eliminarGifo("+ 'event,"' + id_gif + '"' +")' src='img/desktop/DAY/icons/icon-trash-normal.svg' alt='Icon Fav'/>" + 
                                "<img class='icons-gifos' onclick='downloadGif("+ 'event,"' + src + '"' +")' src='img/desktop/DAY/icons/icon-download.svg' alt='Icon Fav'/>" +
                                "<img class='icons-gifos' onclick='expandir("+ 'event,"' + id_gif + '"' +")' src='img/desktop/DAY/icons/icon-max-normal.svg' alt='Icon Fav'/></div>" +
                                "<div class='text-hover'> <h3>User</h3>" +
                                "<h2>"+names+"</h2></div>";
                divHover.innerHTML= txt;
                divHover.classList.add("hoverContent");
                gifoContainer.appendChild(divHover);   
                })
            .catch(err=> console.log(err));
        }  
                
    
}

function eliminarGifo (evento, id) {
    let gifosLleno= localStorage.getItem('gifCreados');
    let gifosArrayLleno= gifosLleno.split(','); //El localStorage te devuelve un string por eso lo paso a array
    let myRegex= /[a-z0-9]/gi; 
    var filtradoGifos= [];
    gifosArrayLleno.filter((x) => {
            filtradoGifos.push(x.match(myRegex).join(''));
        });
        let gifSinRepetidos= [...new Set(filtradoGifos)]; //Saco los repetidos del array 
        let localNuevo= gifSinRepetidos.filter((x)=> x !=id); //Saco del array en localStorage
        //el elemento que coincida con el id seleccionado
        localStorage.setItem('gifCreados', JSON.stringify(localNuevo)); //Nuevo array en localStorage 
        //con el id seleccionado eliminado
        misGifosSection.innerHTML= "";

        if (!localStorage.getItem('gifCreados') || localStorage.getItem('gifCreados') == '[]') {
            botonesPagina.style.display= "none";
            botonesPagina.classList.remove('active');
        }    
        cargarPaginaGifos();
}