// Further simplified script to check basic functionality in ToonzScript
print("Starting script execution...");

// Simple environment checks
try {
    print("Attempting to access global objects...");
    // Check if certain global functions or properties are accessible
    var currentLevel = Toonz.getCurrentLevel(); // Hypothetical method
    print("Accessed current level: " + currentLevel);
} catch (e) {
    print("Error accessing global objects: " + e.message);
}

// Basic drawing commands (if any)
try {
    print("Attempting basic drawing command...");
    var rect = Rectangle.create(100, 100, 200, 200); // Hypothetical drawing method
    rect.fill("red");
    print("Rectangle created and filled.");
} catch (e) {
    print("Error with drawing commands: " + e.message);
}

print("Script execution finished.");
