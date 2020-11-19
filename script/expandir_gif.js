let divModal= document.getElementById('modal');
let closeBtn= document.getElementById('close-btn');
let gifExpandido= document.getElementsByClassName('gifExpandido')[0];
let tituloGif= document.getElementsByClassName('nombreGif')[0];
let iconsGif= document.getElementsByClassName('masExpandido-icons');

async function expandir(event, id) {
    divModal.style.display="flex";
    let url_id= `https://api.giphy.com/v1/gifs/${id}?api_key=${api_key}`;
    gifExpandido.style.display= "none";
    let resp= await fetch(url_id);
    let json= await resp.json();
    let nombre= json.data.title;
    let idParaFav= id;
    let sourceGif= json.data.images.original.url;
    gifExpandido.setAttribute('src', sourceGif);
    gifExpandido.style.display= "inline-block";
    tituloGif.innerHTML= nombre;
    let favA= iconsGif[0].firstElementChild;
    favA.addEventListener('click', (e) => {
        let eventoFav= e.target;
        agregando(eventoFav, idParaFav);
    });
}

/*Cerrar modal*/
closeBtn.addEventListener('click', ()=> {
    divModal.style.display="none";
})

/*Cerrar modal cuando clickeo afuera */
window.addEventListener('click', (event) => {
    if (event.target == modal) {
      divModal.style.display = "none";
    }
  });

