// Testing script to explore available objects and methods in ToonzScript
print("Starting script execution...");

// Exploring if certain objects are recognized in ToonzScript
try {
    var scene = Scene.current();
    print("Current scene accessed: " + scene);
} catch (e) {
    print("Error accessing Scene: " + e.message);
}

try {
    if (typeof VectorLevel != "undefined") {
        print("VectorLevel object is available.");
        // Further code to manipulate vector levels would go here
    } else {
        print("VectorLevel object is not available.");
    }
} catch (e) {
    print("Error testing VectorLevel: " + e.message);
}

print("Script execution finished.");
