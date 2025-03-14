const soundMap = {};
 
function createSoundButton(name, filename, keyCombination = null) {
  const container = document.createElement('div');
  container.classList.add('sound-container');

  const button = document.createElement('button');
  button.textContent = name;
  button.classList.add('button');
  button.onclick = () => playSound(name);

  const volumeControl = document.createElement('input');
  volumeControl.type = 'range';
  volumeControl.min = 0;
  volumeControl.max = 1;
  volumeControl.step = 0.01;
  volumeControl.value = 1;
  volumeControl.classList.add('volume-control');
  volumeControl.oninput = (e) => setVolume(name, e.target.value);

  const pauseButton = document.createElement('button');
  pauseButton.textContent = 'Pausa';
  pauseButton.classList.add('pause-button');
  pauseButton.onclick = () => pauseSound(name);

  const progressBar = document.createElement('progress');
  progressBar.classList.add('progress-bar');
  progressBar.value = 0;
  progressBar.max = 1;

  container.appendChild(button);
  container.appendChild(pauseButton);
  container.appendChild(volumeControl);
  container.appendChild(progressBar);

  if (keyCombination) {
    const shortcutLabel = document.createElement('div');
    shortcutLabel.textContent = keyCombination.toUpperCase();
    shortcutLabel.classList.add('shortcut');
    container.appendChild(shortcutLabel);

    document.addEventListener('keydown', (e) => {
      if (e.key === keyCombination) {
        playSound(name);
      }
    });
  }

  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.appendChild(container);

  const audio = createSound(name, filename);

  // Actualizar la barra de progreso
  audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime / audio.duration;
  });
}

function createSound(name, filename) {
  const audio = new Audio(`sounds/${decodeURIComponent(filename)}`);
  soundMap[name] = audio;
  return audio;
}

function playSound(name) {
  const sound = soundMap[name];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  } else {
    console.error(`Sonido no encontrado: ${name}`);
  }
}

function pauseSound(name) {
  const sound = soundMap[name];
  if (sound) {
    sound.pause();
  } else {
    console.error(`Sonido no encontrado: ${name}`);
  }
}

function setVolume(name, volume) {
  const sound = soundMap[name];
  if (sound) {
    sound.volume = volume;
  } else {
    console.error(`Sonido no encontrado: ${name}`);
  }
}

// Ejemplo de cómo añadir botones, puedes personalizar estos según tus necesidades
createSoundButton('FONDO', '00FONDO.mp3', '0');
createSoundButton('CAMBIO DE ESCENA', '1INICIO.mp3', '1');
createSoundButton('CAMBIO DE PARTES', '0CIERRE.mp3', '2');
createSoundButton('ALARMA', '2ALARMACLOCK.mp3','3');
createSoundButton('ORACION', '3ORACION.mp3', '5');
createSoundButton('RELOJ', '4RELOJ.mp3', '6');
createSoundButton('PASOS', '5PASOS.mp3', '7');
createSoundButton('ENFADO', '9JEFEENFADADO.mp3', 't');
createSoundButton('ORACION', '10ORACION.mp3', 'y');
createSoundButton('CIELO', '11CIELO.mp3', 'u');
createSoundButton('CORO', 'COROSANTO.mp3', 'o');
createSoundButton('SUSURROS', '12SUSURROS.mp3', 'a');
createSoundButton('CIERRE LIBRO', '13LIBRO.mp3', 's');
createSoundButton('CIELO', '14CIELO.mp3', 'd');
createSoundButton('SUSURROS', '15SUSURROS.mp3', 'f');
createSoundButton('CAMPANAS', '16CAMPANAS.mp3', 'g');
createSoundButton('OFRENDA', '17OFRENDA.mp3', 'h');
createSoundButton('SAD', '18SAD.mp3', 'k');
