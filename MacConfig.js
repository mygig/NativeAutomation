require('colors');
const WD_DRIVER = require('wd');
const CHAI = require('chai');
const CHAI_AS_PROMISED = require('chai-as-promised');

const TEST_PORT = 4723;
const TEST_HOST = 'localhost';
const TEST_APP = 'Calculator';
const TEST_PLATFORM = 'mac';

let driver;

CHAI.use(CHAI_AS_PROMISED);
CHAI.should();
CHAI_AS_PROMISED.transferPromiseness = WD_DRIVER.transferPromiseness;


/**
 * @param {webdriver} webdriver instance
 * @return {none} none
 */
class MacConfig {
	async beforeConfig() {
		if (driver !== undefined){
			return driver;
		} else {
			driver = await WD_DRIVER.promiseChainRemote(TEST_HOST, TEST_PORT);

			// optional extra logging
			driver.on('status', info => {
				console.log(info.cyan);
			});
			driver.on('command', (eventType, command, response) => {
				console.log(' > ' + eventType.cyan, command, (response || '').grey);
			});
			driver.on('http', (meth, path, data) => {
				console.log(' > ' + meth.magenta, path, (data || '').grey);
			});
			// Set the speed mouse moves for moveTo() actions
			driver.setCookie({'name': 'mouse_speed', 'value': 200});

			await driver.init({
				app: TEST_APP,
				platformName: TEST_PLATFORM,
				deviceName: TEST_PLATFORM
			});
			await driver.setImplicitWaitTimeout(5000);
			return driver;
		}
	}

	async afterConfig() {
		console.log('Closing driver and server');
		await driver.keys(WD_DRIVER.SPECIAL_KEYS.Command+'q');
		await driver.quit();
	}
}

module.exports = new MacConfig();