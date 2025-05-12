/**
 * Test to check if the marker is displayed at the correct location
 * when a canton is clicked on the map.
 * 
 * This test was written to investigate a question on StackOverflow:
 * https://stackoverflow.com/q/79601421/42659
 */

const { Builder, By } = require('selenium-webdriver');

const firefox = require('selenium-webdriver/firefox');

(async function testMarkerLocation() {

    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        .build();

    try {
        
        await driver.get(
            'http://localhost:8000');

        // wait until both markers are added
        await driver.wait(async () => {

            const markers = await driver.findElements(
                By.css('.leaflet-marker-icon'));

            return markers.length === 2;

        }, 10000);

        const marker = await driver.findElement(
            By.xpath("//img[@src='train-station.png']"));

        const {x, y} = await marker.getRect();

        const transform = await marker.getCssValue('transform');

        console.log('Marker X:', x);
        console.log('Marker Y:', y);
        console.log('Transform:', transform);

    } 
    catch (error) {
        console.error('Test failed:', error);
    }
    finally {
        await driver.quit();
    }

})();