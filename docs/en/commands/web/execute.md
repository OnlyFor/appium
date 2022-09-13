[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
# Execute Script

Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame (Web context). Run a native [mobile command](/docs/en/commands/mobile-command.md) (Native Context).
[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
## Example Usage

```java
// Java
((JavascriptExecutor) driver).executeScript("window.setTimeout(arguments[arguments.length - 1], 500);");

```

```python
# Python
self.driver.execute_script(‘document.title’)

```

```javascript
// Javascript
// webdriver.io example
var result = browser.execute(function(a, b, c, d) {
  // browser context - you may not access client or console
  return a + b + c + d;
}, 1, 2, 3, 4)

// node.js context - client and console are available
console.log(result); // outputs: 10

// wd example
await driver.execute('document.title');

```

```ruby
# Ruby
# ruby_lib example
execute_script("document.title")

# ruby_lib_core example
@driver.execute_script("document.title")

```

```csharp
// C#
// TODO C# sample

```

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
## Description

The executed script is assumed to be synchronous and the result of evaluating the script is returned to the client.

The script argument defines the script to execute in the form of a function body. The value returned by that function will be returned to the client. The function will be invoked with the provided args array and the values may be accessed via the arguments object in the order specified.

Arguments may be any JSON-primitive, array, or JSON object. JSON objects that define a WebElement reference will be converted to the corresponding DOM element. Likewise, any WebElements in the script result will be returned to the client as WebElement JSON objects.

For `execute` in the native context, see [Mobile Commands](/docs/en/commands/mobile-command.md).


[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
## Support

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
### Appium Server

|Platform|Driver|Platform Versions|Appium Version|Driver Version|
|--------|----------------|------|--------------|--------------|
| iOS | [XCUITest](/docs/en/drivers/ios-xcuitest.md) | None | None | None |
|  | [UIAutomation](/docs/en/drivers/ios-uiautomation.md) | None | None | None |
| Android | [UiAutomator2](/docs/en/drivers/android-uiautomator2.md) | None | None | None |
|  | [Espresso](/docs/en/drivers/android-espresso.md) | None | None | None |
|  | [UiAutomator](/docs/en/drivers/android-uiautomator.md) | None | None | None |
| Mac | [Mac](/docs/en/drivers/mac.md) | None | None | None |
| Windows | [Windows](/docs/en/drivers/windows.md) | None | None | None |


[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
### Appium Clients

|Language|Support|Documentation|
|--------|-------|-------------|
|[Java](https://github.com/appium/java-client/releases/latest)| All | [seleniumhq.github.io](https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/remote/RemoteWebDriver.html#executeScript-java.lang.String-java.lang.Object...-) |
|[Python](https://github.com/appium/python-client/releases/latest)| All | [selenium-python.readthedocs.io](http://selenium-python.readthedocs.io/api.html#selenium.webdriver.remote.webdriver.WebDriver.execute_script) |
|[Javascript (WebdriverIO)](http://webdriver.io/index.html)| All |  |
|[Javascript (WD)](https://github.com/admc/wd/releases/latest)| All | [github.com](https://github.com/admc/wd/blob/master/lib/commands.js#L102) |
|[Ruby](https://github.com/appium/ruby_lib/releases/latest)| All | [www.rubydoc.info](https://www.rubydoc.info/gems/selenium-webdriver/Selenium/WebDriver/Driver:execute_script) |
|[C#](https://github.com/appium/appium-dotnet-driver/releases/latest)| All | [github.com](https://github.com/appium/appium-dotnet-driver/) |

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
## HTTP API Specifications

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
### Endpoint

`POST /session/:session_id/execute`

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
### URL Parameters

|name|description|
|----|-----------|
|session_id|ID of the session to route the command to|

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
### JSON Parameters

|name|type|description|
|----|----|-----------|
| script | `string` | The script to execute |
| args | `array` | The script arguments |

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
### Response

The script result (`any`)

[//]: # (DO NOT EDIT THIS FILE! This is an auto-generated file. Editing for this document happens in /commands-yml/commands/web/execute.yml)
## See Also

* [W3C Specification](https://www.w3.org/TR/webdriver/#dfn-execute-script)
* [JSONWP Specification](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidexecute)