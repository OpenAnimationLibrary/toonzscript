// Define the array with various types of elements
var myArray = [1, 'a', 3.14, true, 'hello', 42, null, [1, 2], {'key': 'value'}, 9.8, 'end'];

// Function to process and output each element of the array
function outputElements(arr) {
    rfor (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        var elementType = typeof element;
        var elementValue = '';

        // Check if the element is an object and handle it accordingly
        if (elementType === 'object') {
            if (Array.isArray(element)) {
                // Convert array to string for output
                elementValue = 'an array [' + element.join(', ') + ']';
            } else if (element === null) {
                elementValue = 'null';
            } else {
                // Convert object to string for output
                var keyValuePairs = [];
                for (var key in element) {
                    keyValuePairs.push(key + ': ' + element[key]);
                }
                elementValue = 'an object {' + keyValuePairs.join(', ') + '}';
            }
        } else {
            // Convert non-objects directly to string
            elementValue = element.toString();
        }

        // Print each element in a sentence
        print('Element ' + i + ' is ' + elementValue + ' and is of type ' + elementType + '.');
    }
}

// Call the function with the array
outputElements(myArray);
