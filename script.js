class Letter {
  constructor(container) {
    this.letter = document.createElement('div');
    this.letter.classList.add('letter');
    container.appendChild(this.letter);
  }

  setContent(content) {
    this.letter.innerHTML = content;
  }

  setRotate(deg) {
    this.letter.style.transform = `rotate(${deg}deg)`;
  }

  setDimension(width, heigth) {
    this.letter.style.width = width + 'px';
    this.letter.style.height = heigth + 'px';
    this.width = width;
    this.heigth = heigth;
  }

  setPosition(x, y) {
    this.offsetLeft = this.width / 2;
    this.offsetTop = this.heigth / 2;
    this.x = x;
    this.y = y;
    this.letter.style.left = x - this.offsetLeft + 'px';
    this.letter.style.top = y - this.offsetTop + 'px';
  }
}

class CircleLetters extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="style.css">
      <main class="containerLetters"></main>
    `;
  }

  connectedCallback() {
    this.drawLetters();
  }

  drawLetters() {
    let container = this.shadowRoot.querySelector('.containerLetters');
    let message =
      'La humanidad programa su destino, una línea de código a la vez';
    let n_letters = message.length;
    let angle = -Math.PI;
    let increase = (Math.PI * 2) / n_letters;
    let containerLetters = [];

    for (let i = 0; i < n_letters; i++) {
      let letra = new Letter(container);
      letra.setDimension(150, 150);
      letra.setContent(message.charAt(i));
      containerLetters.push(letra);
    }

    const rotateLetter = () => {
      let radio = 100 * Math.sin(angle);

      for (let i = 0; i < n_letters; i++) {
        let x = radio * Math.cos(angle) + 110;
        let y = radio * Math.sin(angle) + 110;
        let deg = Math.atan2(y - 110, x - 110) * (180 / Math.PI) + 90;
        containerLetters[i].setPosition(x, y);
        containerLetters[i].setRotate(deg);
        angle += increase;
      }

      angle += 0.04;
    };

    setInterval(rotateLetter, 30);
  }
}

customElements.define('circle-letters', CircleLetters);
