const Accessory = require('./lib/accessory');

module.exports = class HbUniSenTemp extends Accessory {
    init(config, node) {
      for (let i = 1; i <= 3; i++) {
          const ch = config.description.ADDRESS + ':' + i;
          if (config.options[ch] && config.options[ch].disabled) {
              continue;
          }

          const name = node.ccu.channelNames[ch];
          
          if (i === 1) {
            this.addService('Switch', name)
              .get('On', config.deviceAddress + ':1.STATE')
              .set('On', config.deviceAddress + ':1.STATE');
          }

          if (i === 2) {
            this.addService('ContactSensor', name)
              .get('ContactSensorState', config.deviceAddress + ':2.STATE', (value, c) => {
                  return value ? c.CONTACT_NOT_DETECTED : c.CONTACT_DETECTED;
               });
          }

          if (i === 3) {
            this.addService('TemperatureSensor', name)
              .setProps('CurrentTemperature', {minValue: -50, maxValue: 120})
              .get('CurrentTemperature', config.deviceAddress + ':3.TEMPERATURE');
          }
       }
    }
};
