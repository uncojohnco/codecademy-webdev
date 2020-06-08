const doorPaths = {
    closed: 'https//s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg',
    robot: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg',
    beach: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg',
    space: 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg',
};

const doorFactory = (doorid) => {
    return {
        _doorid: doorid,
        _srcEle: document.getElementById(doorid),
        _open: false,

        init() {
            this._srcEle.onclick = this.onclick;
        },

        onclick() {
            if (this._open) {
                this._srcEle.src = doorPaths.closed;
                this._open = false;
            } else {
                this._srcEle.src = doorAttrs[this._doorid].img;
                this._open = true;
            };
        },
    }
};

const doorAttrs = {
    door1: { img: doorPaths.robot },
    door2: { img: doorPaths.beach },
    door3: { img: doorPaths.space }
}


doorOnclick = (event) => {
    const door = event.srcElement;
    console.log(door);
    door.src = doorAttrs[door.id].img;
};


const doorObjs = {
    door1: doorFactory('door1'),
    door2: doorFactory('door2'),
    door3: doorFactory('door3'),
};

doorObjs.door1.init()