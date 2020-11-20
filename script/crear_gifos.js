let video= document.getElementById('video');
let botonComenzar= document.getElementById('botonParaComenzar');
let botonGrabar= document.getElementById('botonParaGrabar');
let botonFinalizar= document.getElementById('botonParaFinalizar');
let botonSubir= document.getElementById('botonParaSubir');
let divVideo= document.getElementById('empezando-a-grabar');
let divSinVideo= document.getElementById('sin-grabar');
let pasoUno= document.getElementById('paso-1');
let pasoDos= document.getElementById('paso-2');
let pasoTres= document.getElementById('paso-3');
var constraints = { audio: false, video: { height: {max: 480} } }; 
let recorder;

botonComenzar.addEventListener('click', () => {
  botonComenzar.style.display= "none";
  //Cambio texto
  let txt=  "<h1 class='title'> ¿Nos das acceso <br/> a tu cámara? </h1>" + 
  "<h3> El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.</h3>";
  divSinVideo.innerHTML= txt;
  divSinVideo.style.width= '300px';

  //Cambio botones
  pasoUno.style.color= "white";
  pasoUno.style.background= "#572EE5";
  getMedia(constraints);
});

botonGrabar.addEventListener('click', ()=> {
  botonGrabar.style.display="none";
  botonFinalizar.style.display="inline-block";
  //algo 
  recorder.startRecording();
  console.log('empezamos');
});

botonFinalizar.addEventListener('click', () => {
  botonFinalizar.style.display="none";
  botonSubir.style.display="inline-block";
  recorder.stopRecording(()=> {
    //mostrar boton de repetir captura
    console.log('paramos');
  })
})


//Pedir permiso para acceder a la cámara
async function getMedia(constraints) {
    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        divSinVideo.style.display= "none";
        divVideo.style.display= "inline-block";
        video.srcObject = stream;
        video.play();

        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function() {
           console.log('started')
         },
        });

        botonGrabar.style.display= "inline-block";
        pasoDos.style.color= "white";
        pasoDos.style.background= "#572EE5";

        pasoUno.style.color= "#572EE5";
        pasoUno.style.background= "white";

      } catch(err) {
          console.log('bueno pasó algo: '+ err);
      }

}
//Capturar la grabación

// Para comenzar a interactuar con la librería, debes crear un objeto recorder. 
// Este objeto recibirá opciones y cuenta con varios métodos que puedes utilizar para grabar:



// Cuando el usuario aprieta el botón ‘grabar’, debes permitirle crear un nuevo recorder 
// (o sea que le dices que inicie la grabación con startRecording);
// Cuando apriete el botón 'grabar' hay que agregar un contador de segundos



// cuando aprieta el botón ‘stop’, debes llamar a stopRecording 
// pasándole como callback tu función anteriormente definida.
// Cuando se apriete el botón 'finalizar' el contador de segundos tiene que cambiar
// a un 'titulo' (mismo formato que <li> en menú) que diga "REPETIR CAPTURA" y asumo que
//habrá que llamar de nuevo a la función startRecording y no hacer nada con lo que capturó

//Cuando se apriete el botón 'finalizar' cambia y dice 'subir gifo' y se pasa a la pag 3

