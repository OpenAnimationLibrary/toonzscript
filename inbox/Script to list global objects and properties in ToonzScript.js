// Script to list global objects and properties in ToonzScript
print("Listing global properties...");

// Iterate over all properties in the global object
for (var property in this) {
    try {
        print(property + " : " + typeof this[property]); // Print property name and type
    } catch (error) {
        print(property + " : Access Error"); // Handle properties that may cause errors when accessed
    }
}

print("-------------------\nListing completed.");