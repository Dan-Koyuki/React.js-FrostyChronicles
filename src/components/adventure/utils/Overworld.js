
class Overworld{
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.map = null
  }

  init () {
    const image  = new Image();
    image.onload = () => {
      console.log("its here");
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = 'https://raw.githubusercontent.com/DanKoyuki/sprite/master/images/maps/maplower.png';
  }

}

export default Overworld;