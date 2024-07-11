// Assuming 'newo' is your object of interest
// You might need to replace 'newo' with the actual object or variable name you're interested in
print("Exploring properties of the newo object...");

var obj = newo; // Replace 'newo' with the actual object reference if different

// Check if the object exists
if (obj) {
    // Iterate over all properties in the object
    for (var property in obj) {
        try {
            // Print property name and type
            print(property + " : " + typeof obj[property]);

            // Attempt to print more details if it's a function
            if (typeof obj[property] === "function") {
                print(" Function details: " + obj[property].toString());
            }
        } catch (error) {
            print(property + " : Access Error"); // Handle properties that may cause errors when accessed
        }
    }
} else {
    print("Error: 'newo' object does not exist or is not accessible.");
}

print("Exploration completed.");
