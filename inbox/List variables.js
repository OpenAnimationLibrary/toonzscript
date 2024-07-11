// Script to list all global variables and their current values
print("Listing all global variables and their values...");

// Iterate over all properties of the global object
for (var property in this) {
    try {
        var value = this[property]; // Attempt to access the value of the property
        print(property + " : " + value); // Print the name and value of the property
    } catch (error) {
        print(property + " : Access Error"); // Handle properties that may cause errors when accessed
    }
}

print("Listing completed.");
