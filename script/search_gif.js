let searchBar= document.getElementById('search-bar');
let searchBoton= document.getElementById('search-button');
let deleteBoton= document.getElementById('delete-button');
let containerSearch= document.getElementById('container-search');
let resultContainer= document.getElementById('result-container');
let botonesPagina= document.getElementById('botones-pagina');
let searchSinContenido= document.getElementById('search-sin-contenido');
let logo= document.getElementsByClassName('logo')[0];

//BORRAR TODO EL CONTENIDO DE BUSQUEDA CUANDO SE APRIETA EL LOGO
logo.addEventListener('click', ()=> {
    document.location.reload();
}); 

// BORRAR EL INPUT CUANDO SE APRIETA EL BOTON CLOSE
deleteBoton.addEventListener('click', () => {
    searchBar.value= "";
    containerSearch.innerHTML= "";
    deleteBoton.style.display= "none"; 
    searchBoton.style.display="inline-block";
})

//BUSCAR CUANDO APRIETO EL BOTON BUSCAR
searchBoton.addEventListener('click', () => {
    mostrarResultados(0);
})

// BUSCAR CUANDO APRIETO ENTER 
searchBar.addEventListener('keydown', (e)=> {
    if(e.keyCode == 13) {
        containerSearch.innerHTML= "";
        mostrarResultados(0);
    }
});

//SE MUESTRA EL BOTON DELETE PARA BORRAR EL INPUT
searchBar.addEventListener('keydown', () => {
    searchBoton.style.display= "none";
    deleteBoton.style.display="inline-block";
});

//SI HAGO CLICK EN CUALQUIER LUGAR DE LA VENTANA QUE NO SEA EL SEARCHBAR, 
// EL CONTAINER SEARCH O EL LOGO, ENTONCES VOY A VACIAR EL CONTAINER SEARCH, Y
// MUESTRO EL BOTON BUSCAR
window.addEventListener('click', (e) => {
    if(e.target != containerSearch || e.target != searchBar || e.target != logo) {
        containerSearch.innerHTML= "";
        searchBoton.style.display= "inline-block";
        deleteBoton.style.display="none";
    }
})


searchBar.addEventListener('keyup', traerSugerencias); 

function traerSugerencias() {
    let searchValue= searchBar.value.trim().toLowerCase();
        if (searchValue != '' || searchValue > 1) { 
            let url_sug= `https://api.giphy.com/v1/tags/related/${searchValue}?api_key=${api_key}`;
            fetch(url_sug) 
            .then(resp=> {
                return resp.json()})
            .then(j=> {
                let data= j.data;
                let ul= document.createElement('ul');
                ul.classList.add('ulSearch');
                let item= [];
                for (let x= 0; x<4; x++) {
                    let names= data[x].name;
                    item.push(names);
                };
                for (let i= 0; i< item.length; i++) {
                    containerSearch.innerHTML= ""; 
                    var li= document.createElement('li');
                    var icon= document.createElement('div');
                    icon.classList.add('icon-div');
                    icon.innerHTML= '<i class="fas fa-search"></i>';
                    li.classList.add('searchSug');
                    li.innerHTML = item[i];
                    icon.appendChild(li);
                    ul.appendChild(icon);
                    }
                containerSearch.appendChild(ul);
                //ESTO ESCRIBE EN EL INPUT LA PALABRA SELECCIONADA
                let lista= document.getElementsByClassName('searchSug');
                for (let x=0; x<lista.length; x++) { 
                    lista[x].addEventListener('click', () => {
                        searchBar.value = lista[x].innerHTML;
                        containerSearch.innerHTML= "";
                        deleteBoton.style.display= "none";
                        searchBoton.style.display= "inline-block";
                        }); 
                }
        })
            .catch(err=> console.log(err));
            } else{
                containerSearch.innerHTML = "";
            }
};


function mostrarResultados(offset) {
    trendingOne.style.display= "none";
    var inputValue= searchBar.value.trim().toLowerCase();
    try {
        if(inputValue.length>1) {
            if (resultContainer.classList.contains('resultadosActivos')) {
                    resultContainer.innerHTML= "";
                    containerSearch.innerHTML= "";
            } else { 
                resultContainer.classList.add('resultadosActivos');
                let tituloSearch= document.createElement('h1');
                tituloSearch.classList.add('title');
                tituloSearch.setAttribute('id', 'tituloSearch');
                tituloSearch.innerHTML= inputValue.toUpperCase();
                resultContainer.appendChild(tituloSearch);
                searchSinContenido.style.display= "none";
            }
        let url_search= `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${inputValue}&offset=${offset}`;
            fetch(url_search)
                .then(resp=> resp.json())
                .then(j=> {
                    let cantidadDePag= parseInt(j.data.length/12);
                    let divPorPag= 12;
                    for (let x= 0; x<divPorPag; x++) {
                        let containerImg= document.createElement('div');
                        containerImg.classList.add('containerImg');
                        let giph= document.createElement('img');
                        giph.classList.add('foto-s2');
                        giph.setAttribute('src', j.data[x].images.original.url);
                        resultContainer.appendChild(containerImg);
                        containerImg.appendChild(giph);
                        //Agregar hover
                        let divHover= document.createElement('div');
                            let txt="<div class='icons-hover'><img id='imagen"+[x]+"' class='icons-gif' onclick='agregandoSearch("+ 'event,"' + j.data[x].id + '"' +")' src='img/desktop/DAY/icons/icon-fav.svg' alt='Icon Fav'/>" + 
                                            "<img class='icons-gif' src='img/desktop/DAY/icons/icon-download.svg' alt='Icon Fav'/>" +
                                            "<img class='icons-gif' onclick='expandir("+ 'event,"' + j.data[x].id + '"' +")' src='img/desktop/DAY/icons/icon-max-normal.svg' alt='Icon Fav'/></div>" +
                                            "<div class='text-hover'> <h3>User</h3>" +
                                            "<h2>"+j.data[x].title+"</h2></div>";
                            divHover.innerHTML= txt;
                            divHover.classList.add("hoverContent");
                            containerImg.appendChild(divHover);
                            console.log('creo el coso');
                    }
                    
                    if (!botonesPagina.classList.contains('active')) {
                        botonesPagina.classList.add('active');
                        let offsetOriginal= 0;
                        for(let y=1; y<cantidadDePag; y++) {
                            offsetOriginal += 13;
                            let boton= document.createElement('button');
                            boton.setAttribute('id', 'pagina'+(y+1));
                            boton.classList.add('boton');
                            boton.setAttribute('onclick', 'mostrarMas('+offsetOriginal+')');
                            boton.innerHTML= (y+1);
                            botonesPagina.appendChild(boton);             
                            botonesPagina.style.display= "flex";          
                    }        
                    }
                }
                )
                .catch(e=> {
                    console.log(e);
                    resultContainer.innerHTML= "";
                    console.log('no encuentro nada');
                    searchSinContenido.style.display= "flex";
                    resultContainer.classList.remove('resultadosActivos');
                    containerSearch.innerHTML= "";
                    botonesPagina.style.display="none";
                });
        } else {
            throw new Error ('No ingresó un input válido');
        }
    }
    catch(err) {
        alert(err);
    }
    
}

function mostrarMas(offset) {
    resultContainer.innerHTML= "";
    mostrarResultados(offset);
}

function agregandoSearch(event, id) {
    console.log('agregando gif');
    //CAMBIAR EL ICON CUANDO ESTA FAVEADO
    let elementFav= event.target; 
    let idImagen= elementFav.getAttribute('id'); 
    let idImagenes= localStorage.getItem('idImagenes');
       if (idImagenes == null) {
           idImagenes= [];
       } else {
           idImagenes= JSON.parse(idImagenes);
       }
       let repetidoId= idImagenes.includes(idImagen);
       if (repetidoId) {
        console.log('ya ta');
       } else {
        idImagenes.push(idImagen); //Previene la repetición de IDs en el array
       }
        
       localStorage.setItem('idImagenes', JSON.stringify(idImagenes));    

    //GUARDAR EL ID DE LOS GIFS FAVEADOS
    favArray= localStorage.getItem('favArray');
    if (!favArray || favArray == "[]") {
        favArray= [];
    } else {
        favArray= JSON.parse(favArray);
    }
    let repetidoIdFav= favArray.includes(id);
       if (repetidoIdFav) {
        console.log('ya ta');
       } else {
        favArray.push(id);
       }

    localStorage.setItem('favArray', JSON.stringify(favArray));

    if (!localStorage.getItem('idImagenes') || (localStorage.getItem('idImagenes') != '[]')) { 
        if (elementFav.classList.contains('elementoActivo')) {
            elementFav.classList.remove('elementoActivo');
            elementFav.setAttribute('src', 'img/desktop/DAY/icons/icon-fav.svg');
            let idActualizados= idImagenes.filter((x)=> {
                return x != idImagen;
            });
            localStorage.setItem('idImagenes', JSON.stringify(idActualizados));

            let localNuevo= favArray.filter((x)=> x !=id); //Saco del array en localStorage
            //el elemento que coincida con el id seleccionado
            localStorage.setItem('favArray', JSON.stringify(localNuevo)); //Nuevo array en localStorage 
            //con el id seleccionado eliminado
            
        } else {
            elementFav.classList.add('elementoActivo');
            elementFav.setAttribute('src', 'img/desktop/DAY/icons/icon-fav-active.svg');
        }
    }
   
}