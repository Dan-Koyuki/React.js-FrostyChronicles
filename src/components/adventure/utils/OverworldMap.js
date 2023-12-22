import Person from './Person';
import OverworldEvent from './OverworldEvent';
import { utils } from './utils';

class OverworldMap {
  constructor(config){
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage, 
      utils.withGrid(13) - cameraPerson.x, 
      utils.withGrid(7) - cameraPerson.y
      )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage, 
      utils.withGrid(13) - cameraPerson.x, 
      utils.withGrid(7) - cameraPerson.y
    )
  } 

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key];
      object.id = key;

      //TODO: determine if this object should actually mount
      object.mount(this);

    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;
  }

  addWall(x,y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);
  }

}

export const OverworldMaps = {
  PokemonCenter: {
    lowerSrc: "https://raw.githubusercontent.com/DanKoyuki/sprite/master/images/maps/maplower.png",
    upperSrc: "https://raw.githubusercontent.com/DanKoyuki/sprite/master/images/maps/mapupper.png",
    gameObjects: {
      npcA: new Person({
        x: utils.withGrid(27),
        y: utils.withGrid(8),
        src: "https://raw.githubusercontent.com/DanKoyuki/sprite/master/images/character/people/NPC%2001.png",
        behaviorLoop: [
          { type: "stand",  direction: "left", time: 800 },
          { type: "stand",  direction: "up", time: 800 },
          { type: "stand",  direction: "right", time: 1200 },
          { type: "stand",  direction: "up", time: 300 },
        ]
      }),
      npcB: new Person({
        x: utils.withGrid(30),
        y: utils.withGrid(10),
        src: "https://raw.githubusercontent.com/DanKoyuki/sprite/master/images/character/people/NPC%2002.png",
        behaviorLoop: [
          { type: "walk",  direction: "left" },
          { type: "stand",  direction: "up", time: 800 },
          { type: "walk",  direction: "up" },
          { type: "walk",  direction: "right" },
          { type: "walk",  direction: "down" },
        ]
      }),
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(27),
        y: utils.withGrid(13),
        src: 'https://raw.githubusercontent.com/DanKoyuki/sprite/master/images/character/people/HERO%2001.png'
      })
    },
    walls: {
      [utils.asGridCoord(19,14)] : true,
      [utils.asGridCoord(20,14)] : true,
      [utils.asGridCoord(19,15)] : true,
      [utils.asGridCoord(20,15)] : true,
      [utils.asGridCoord(34,14)] : true,
      [utils.asGridCoord(35,14)] : true,
      [utils.asGridCoord(34,15)] : true,
      [utils.asGridCoord(35,15)] : true,
    }
  },
}

export default OverworldMap;