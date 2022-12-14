const config = {
  vendorID: 1133,
  productID: 49686,
  joysticks: [
    {
      name: 'left',
      x: {
        pin: 0,
      },
      y: {
        pin: 1,
      },
    },
    {
      name: 'right',
      x: {
        pin: 2,
      },
      y: {
        pin: 3,
      },
    },
  ],
  buttons: [
    {
      value: 64,
      pin: 5,
      name: 'leftJoystick',
    },
    {
      value: 128,
      pin: 5,
      name: 'rightJoystick',
    },
    {
      value: 16,
      pin: 5,
      name: 'back',
    },
    {
      value: 32,
      pin: 5,
      name: 'start',
    },
    {
      value: 6,
      pin: 4,
      name: 'dpadLeft',
    },
    {
      value: 0,
      pin: 4,
      name: 'dpadUp',
    },
    {
      value: 2,
      pin: 4,
      name: 'dpadRight',
    },
    {
      value: 4,
      pin: 4,
      name: 'dpadDown',
    },
    {
      value: 24,
      pin: 4,
      name: 'X',
    },
    {
      value: 136,
      pin: 4,
      name: 'Y',
    },
    {
      value: 40,
      pin: 4,
      name: 'A',
    },
    {
      value: 72,
      pin: 4,
      name: 'B',
    },
    {
      value: 1,
      pin: 5,
      name: 'LB',
    },
    {
      value: 2,
      pin: 5,
      name: 'RB',
    },
    {
      value: 4,
      pin: 5,
      name: 'LT',
    },
    {
      value: 8,
      pin: 5,
      name: 'RT',
    },
  ],
};

export default config;
