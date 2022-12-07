const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_W = 87;
const KEY_ATTACK = 32;

const KeyListener = {
  keys: {
    horizontal: { a: false, d: false, state: null },
    vertical: { w: false, d: false, state: null },
    attack: false
  },

  listenKeyEvent: function() {
    document.onkeydown = e => {
      switch(e.keyCode) {
        case KEY_A:
          this.keys.horizontal.a = true;
          this.keys.horizontal.state = e.key;
          break;
        case KEY_D:
          this.keys.horizontal.d = true;
          this.keys.horizontal.state = e.key;
          break;
        case KEY_W:
          this.keys.vertical.w = true;
          this.keys.vertical.state = e.key;
          break;
        case KEY_S:
          this.keys.vertical.s = true;
          this.keys.vertical.state = e.key;
          break;
        case KEY_ATTACK:
          this.keys.attack = true;
          break;
        default:
          break;
      }
    };

    document.onkeyup = e => {
      switch(e.keyCode) {
        case KEY_A:
          this.keys.horizontal.a = false;
          break;
        case KEY_D:
          this.keys.horizontal.d = false;
          break;
        case KEY_W:
          this.keys.vertical.w = false;
          break;
        case KEY_S:
          this.keys.vertical.s = false;
          break;
        case KEY_ATTACK:
          this.keys.attack = false;
          break;
        default:
          break;
      }
    };
  }
};

export { KeyListener };