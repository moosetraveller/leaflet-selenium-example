using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

var options = new FirefoxOptions();

using FirefoxDriver driver = new(options);

try
{
    driver.Navigate().GoToUrl("http://localhost:8000");

    WebDriverWait wait = new(driver, TimeSpan.FromSeconds(10));

    // wait until both markers are added
    wait.Until(d =>
    {
        var markers = d.FindElements(By.CssSelector(".leaflet-marker-icon"));
        return markers.Count == 2;
    });

    var marker = driver.FindElement(
        By.XPath("//img[@src='train-station.png']"));

    int x = marker.Location.X;
    int y = marker.Location.Y;

    string transform = marker.GetCssValue("transform");


    Console.WriteLine($"Marker X: {x}\nMarker Y: {y}");
    Console.WriteLine($"Transform: {transform}");
}
catch (Exception ex)
{
    Console.WriteLine("Test failed: " + ex.Message);
}