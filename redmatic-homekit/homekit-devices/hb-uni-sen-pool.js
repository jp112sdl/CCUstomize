const Accessory = require('./lib/accessory');

module.exports = class HbUniSenTemp extends Accessory {
    init(config, node) {
        const {ccu} = node;

        const channels = config.description.CHILDREN;
        const name = ccu.channelNames[channels[i]];

        for (let i = 1; i <= 2; i++) {
            if (!this.option(i)) {
                continue;
            }

            const dp = config.iface + '.' + channels[i] + '.TEMPERATURE';

            this.addService('TemperatureSensor', name)
                .setProps('CurrentTemperature', {minValue: -150, maxValue: 150})
                .get('CurrentTemperature', dp);
        }

        for (let i = 3; i <= 4; i++) {             
            if (!this.option(i)) {
                continue;
            }

            const dp = config.iface + '.' + channels[i] + '.STATE';

            this.addService('ContactSensor', name)
                .get('ContactSensorState', dp, (value, c) => {
                    return value ? c.CONTACT_NOT_DETECTED : c.CONTACT_DETECTED;
                });
        }

        for (let i = 5; i <= 8; i++) {
            if (!this.option(i)) {
                continue;
            }

            const dp = config.iface + '.' + channels[i] + '.STATE';

            this.addService('Switch', name)
                .get('On', dp)
                .set('On', dp);
        }
    }
};
