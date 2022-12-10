import { soundData_json } from "../Constants/soundData_json.js";

const Sound = {
  sounds: {

  },
  
  load: function() {
    for (const [sound, src] of Object.entries(soundData_json)) {
      this.sounds[sound] = new Audio();
      this.sounds[sound].src = src;
    }
  },

  play: function(sound) {
    this.sounds[sound].cloneNode(true).play();
  }
};

export { Sound };