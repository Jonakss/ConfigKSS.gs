# ConfigKSS - AppScript Library

This AppScript library provides a simple way to manage configuration parameters for your Google Apps Script projects. It allows you to store your configuration in a Google Sheet and easily access it from your scripts.

## Features

* Load configuration parameters from a Google Sheet.
* Access parameters using a simple `get(key)` method.
* Automatically reload configuration on sheet edits (optional).
* Specify the Spreadsheet, Sheet name, and ID.
* Caching mechanism for improved performance.

## Usage

1. **Copy the code:** Paste the entire code into your AppScript project.
2. **Create a Config Sheet:** In your Google Sheet, create a sheet named "Config" (or specify a different name using `setConfigSheet()`). 
3. **Add your parameters:** In the "Config" sheet, add your parameters in two columns:
    * **Column A:** Parameter name (key)
    * **Column B:** Parameter value
4. **Load the configuration:** In your script, call `loadConfig_()` to load the parameters.
5. **Access parameters:** Use the `get(key)` method to retrieve the value of a parameter.

## Example

```javascript
// Load the configuration
loadConfig_();

// Get the value of the parameter "apiUrl"
let apiUrl = get("apiUrl"); 

// Use the apiUrl in your code
Logger.log(apiUrl);
```
