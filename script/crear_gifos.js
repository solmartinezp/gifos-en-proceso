let video= document.getElementById('video');

//Pedir permiso para acceder a la cámara

var constraints = { audio: false, video: { height: {max: 480} } }; 

async function getMedia(constraints) {
    let stream;
    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        //Si la respuesta es positiva, entonces voy a tener que cambiar el 
        //div 'empezandoAGrabar' para que muestre el video o sea esto de abajo:
        // ----Es como si pasara a la página 2-----

        // video.srcObject = stream;
        // video.play();

      } catch(err) {
          console.log('bueno pasó algo: '+ err);
      }

}

// getMedia(constraints); //Función que se va a disparar cuando apriete COMENZAR

//Capturar la grabación

// Para comenzar a interactuar con la librería, debes crear un objeto recorder. 
// Este objeto recibirá opciones y cuenta con varios métodos que puedes utilizar para grabar:

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

// Cuando el usuario aprieta el botón ‘grabar’, debes permitirle crear un nuevo recorder 
// (o sea que le dices que inicie la grabación con startRecording);
// Cuando apriete el botón 'grabar' hay que agregar un contador de segundos



// cuando aprieta el botón ‘stop’, debes llamar a stopRecording 
// pasándole como callback tu función anteriormente definida.
// Cuando se apriete el botón 'finalizar' el contador de segundos tiene que cambiar
// a un 'titulo' (mismo formato que <li> en menú) que diga "REPETIR CAPTURA" y asumo que
//habrá que llamar de nuevo a la función startRecording y no hacer nada con lo que capturó

//Cuando se apriete el botón 'finalizar' cambia y dice 'subir gifo' y se pasa a la pag 3

