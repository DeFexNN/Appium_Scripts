const wdio = require('webdriverio');

const opts = {
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:appPackage': 'com.android.settings',
        'appium:appActivity': '.Settings',
    }
};

(async () => {
    console.log('Підключення до сервера Appium...');
    const driver = await wdio.remote(opts);
    console.log('Підключення успішне!');

    try {
        const batteryMenuSelector = 'new UiSelector().textContains("Battery")';
        const batteryMenu = await driver.$(`android=${batteryMenuSelector}`);
        await batteryMenu.click();
        console.log('Batter Menu Open');
        const batteryInfoSelector = 'new UiSelector().textContains("%")';
        const batteryElement = await driver.$(`android=${batteryInfoSelector}`);
        const batteryText = await batteryElement.getText();

        console.log(`Відсоток заряду батареї: ${batteryText}`);
    } catch (err) {
        console.error('Error:', err.message);
    }

    await driver.deleteSession();
})();
