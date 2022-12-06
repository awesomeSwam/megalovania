const toRad = Math.PI / 180;

const randomInt = (min, max) => (Math.random() * (max - min)) + min;

const randomFloat = (min, max) => Math.floor((Math.random() * (max - min)) + min);

const lerp = (s, e, t) => s + (e - s) * t;

export { toRad, randomInt, randomFloat, lerp };