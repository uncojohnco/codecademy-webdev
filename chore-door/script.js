const doorPaths = {
  closed: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg',
  robot: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg',
  beach: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg',
  space: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg',
};


const openDoors = [
  {
    name: 'beach',
    img: doorPaths.beach
  },
  {
    name: 'space',
    img: doorPaths.space
  },
  {
    name: 'robot',
    img: doorPaths.robot
  },
]


function getRandomOpenDoor() {
  const index = Math.floor(Math.random() * openDoors.length);
  return openDoors[index];
}


const doorOnclick = (door) => {

  // console.log(e.target.id);

  if (door._open) {
    door.src = doorPaths.closed;
    door._open = false;
    door._behind = null;

  } else {
    const openDoor = getRandomOpenDoor()

    door.src = openDoor.img;
    door._open = true;
    door._behind = openDoor.name;
  }

  return door;

};


const createDoor = (doorid) => {

  const element = document.getElementById(doorid);
  element._open = false;
  element._behind = null;
  element.onclick = game.playDoor;

  return element;
};


const game = {

  _doors: {},

  addDoor(name) {
    this._doors[name] = createDoor(name)
  },

  get doors() {
    return Object.entries(this._doors)
  },

  getRound() {
    game._doors.forEach(console.log(d => this._doors[d]));
  },

  isRoundOver() {

    let behind;

    for ([k, d] of this.doors) {
      if (behind === undefined) {
        behind = d._behind;
      } else {
        if (behind !== d._behind) {
          return false
        }
      }
    }

    return true;
  },


  playDoor (e) {
    const door = e.target.id;

    doorOnclick(door);
    // 'this' returns the element that fired this event!
    // Should work out a better way to handle this when in an inner js objects...
    // this.doors
    game.doors.forEach(([k, d]) => console.log(k, d._behind));

    if (this.isRoundOver()) {
      this.endRound();
    }

  },


};


game.addDoor('door1');
game.addDoor('door2');
game.addDoor('door3');
