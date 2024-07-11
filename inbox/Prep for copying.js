function listGlobalVariables() {
    var output = "Listing all global variables and their values:\n";
    
    // Iterate over all properties of the global object
    for (var property in this) {
        try {
            var value = this[property]; // Attempt to access the value of the property
            output += property + " : " + value + "\n"; // Append the name and value of the property to output
        } catch (error) {
            output += property + " : Access Error\n"; // Handle properties that may cause errors when accessed
        }
    }

    output += "Listing completed.";
    return output;
}

// Function to display output for manual copying
function displayForManualCopying() {
    var data = listGlobalVariables();
    print(data); // Assuming `print` outputs to a console or text area that allows text selection
}

// Call function to display data
displayForManualCopying();
