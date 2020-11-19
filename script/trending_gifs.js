const api_key= 'tYfyavSpnKco2La9SHFSM4tERSdov3EK';

let slider1= document.getElementById('slider1');
let slider2= document.getElementById('slider2');
let trending_gif= document.getElementById('trending-gif');

function getTrendings(limit, offset) { 
let url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}&offset=${offset}`; 
fetch (url_trending)
    .then ( r => {
        return r.json();
    })
    .then ( g => {
        for (let x= 0; x<g.data.length; x++) {
            let containerImg= document.createElement('div');
            containerImg.classList.add('containerImg');
            let giph= document.createElement('img');
            giph.classList.add('foto-s2');
            giph.setAttribute('src', g.data[x].images.original.url);
            trending_gif.appendChild(containerImg);
            containerImg.appendChild(giph);
            
            //Agregar hover
            let divHover= document.createElement('div');
            let txt="<div class='icons-hover'><img id='imagen"+[x]+"' class='icons-gif' onclick='agregando("+ 'event,"' + g.data[x].id + '"' +")' src='img/desktop/DAY/icons/icon-fav.svg' alt='Icon Fav'/>" + 
                                "<img class='icons-gif' src='img/desktop/DAY/icons/icon-download.svg' alt='Icon Fav'/>" +
                                "<img class='icons-gif' onclick='expandir("+ 'event,"' + g.data[x].id + '"' +")' src='img/desktop/DAY/icons/icon-max-normal.svg' alt='Icon Fav'/></div>" +
                                "<div class='text-hover'> <h3>User</h3>" +
                                "<h2>"+g.data[x].title+"</h2></div>";
                divHover.innerHTML= txt;
                divHover.classList.add("hoverContent");
                containerImg.appendChild(divHover);
        }
        if (!localStorage.getItem('idImagenes') || localStorage.getItem('idImagenes') == '[]') {
            console.log('no hay corazones violetas');
            mostrarFav(0, 12);
            } else {
                console.log('si hay corazones violetas');    
                gifFaveados();
            }
    })
    .catch ( e => {
        console.log(e);
    });
}

if (window.screen.width < 900) {
    getTrendings(12, 0);
} else { 
    getTrendings(3,0);
}

var index = 0;

function moverSlides(num){
    var cantidad=index+=num;
    if (cantidad>=0){
        trending_gif.innerHTML= "";
        console.log(cantidad);
        getTrendings(3, cantidad);
   }  
}

function gifFaveados() { 
    console.log('intento acceder al coso');
    let arrayDeId= localStorage.getItem('idImagenes');
    if (!arrayDeId || arrayDeId != '[]') {
       let newArr= arrayDeId.replace(/[\[\]"]+/g, "");
       let arrId= newArr.split(',');
       for(let i=0; i<arrId.length; i++) {
           let elementFaveado= document.getElementById(arrId[i]);
           elementFaveado.setAttribute('src', 'img/desktop/DAY/icons/icon-fav-active.svg');
           elementFaveado.classList.add('elementoActivo');
       }
    }
    mostrarFav(0, 12);
}