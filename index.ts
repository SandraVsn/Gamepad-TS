import HID from 'node-hid';
import { EventEmitter } from 'node:events';
import config from 'mapping';

class Gamepad extends EventEmitter {
  private states = {};
  vendorId: number;
  productId: number;
  constructor(vendorId: number, productId: number) {
    super();
    this.vendorId = vendorId;
    this.productId = productId;
  }

  connect() {
    const device = new HID.HID(this.vendorId, this.productId);
    device.on('data', this.onControllerFrame.bind(this));
    this.emit('connected');
  }

  private onControllerFrame(data) {
    this.processJoysticks(data);
    this.processButtons(data);
  }
  private processJoysticks(data) {
    const joysticks = config.joysticks;
    for (let i = 0, len = joysticks.length; i < len; i++) {
      const joystick = joysticks[i];
      if (!this.states[joystick.name]) {
        this.states[joystick.name] = {
          x: data[joystick.x.pin],
          y: data[joystick.y.pin],
        };
        continue;
      }
      let currentState = this.states[joystick.name];
      if (
        currentState.x !== data[joystick.x.pin] ||
        currentState.y !== data[joystick.y.pin]
      ) {
        currentState = {
          x: data[joystick.x.pin],
          y: data[joystick.y.pin],
        };
        this.states[joystick.name] = currentState;
        this.emit(`${joystick.name}`, currentState.x, currentState.y);
      }
    }
  }
  private processButtons(data) {
    const buttons = config.buttons;
    for (let i = 0, len = buttons.length; i < len; i++) {
      const button = buttons[i];
      const isPressed = (data[button.pin] & 0xff) === button.value;
      if (this.states[button.name] === undefined) {
        this.states[button.name] = isPressed;
        if (isPressed) {
          this.emit(`${button.name}`, isPressed);
        }
        continue;
      }
      let currentState = this.states[button.name];
      if (isPressed && currentState !== isPressed) {
        this.emit(`${button.name}`, isPressed);
      } else if (!isPressed && currentState !== isPressed) {
        this.emit(`${button.name}`, isPressed);
      }
      this.states[button.name] = isPressed;
    }
  }
}

// Initialisation instance

const vId = 1133;
const pId = 49686;

const pad = new Gamepad(vId, pId);
pad.on('connected', () => console.log('connected'));
pad.on('LStick', (x, y) => console.log('LStick x : ' + x + ' y : ' + y));
pad.on('RStick', (x, y) => console.log('RStick x : ' + x + ' y : ' + y));
pad.on('X', (p) => console.log('X is pressed : ' + p));
pad.on('Y', (p) => console.log('Y is pressed : ' + p));
pad.on('B', (p) => console.log('B is pressed : ' + p));
pad.on('A', (p) => console.log('A is pressed : ' + p));
pad.on('back', (p) => console.log('back is pressed : ' + p));
pad.on('start', (p) => console.log('start is pressed : ' + p));
pad.on('dpadL', (p) => console.log('dpadL is pressed : ' + p));
pad.on('dpadLUp', (p) => console.log('dpadLUp is pressed : ' + p));
pad.on('dpadUp', (p) => console.log('dpadUp is pressed : ' + p));
pad.on('dpadRUp', (p) => console.log('dpadRUp is pressed : ' + p));
pad.on('dpadR', (p) => console.log('dpadR is pressed : ' + p));
pad.on('dpadRDown', (p) => console.log('dpadRDown is pressed : ' + p));
pad.on('dpadDown', (p) => console.log('dpadDown is pressed : ' + p));
pad.on('dpadLDown', (p) => console.log('dpadLDown is pressed : ' + p));
pad.on('LB', (p) => console.log('LB is pressed : ' + p));
pad.on('RB', (p) => console.log('RB is pressed : ' + p));
pad.on('LT', (p) => console.log('LT is pressed : ' + p));
pad.on('RT', (p) => console.log('RT is pressed : ' + p));

pad.connect();
