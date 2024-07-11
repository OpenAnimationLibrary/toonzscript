// Function to check if a file exists
// This must be implemented to actually check the filesystem based on your environment's capabilities
function fileExists(filepath) {
    // Implement this function based on the capabilities provided by OpenToonz or external tools
    // This line is just a placeholder
    return false;
}

// Function to find an available filename by incrementing a counter
function findAvailableFilename(baseFilename) {
    var counter = 0;  // Start with no increment
    var newFilename = baseFilename + (counter ? "_" + counter : "") + ".tlv";

    // Increment filename if exists
    while (fileExists(newFilename)) {
        counter++;
        newFilename = baseFilename + "_" + counter + ".tlv";
    }

    return newFilename;
}

// Base filename without increment
var baseFilename = "F:\\converted";

// Find an available filename
var availableFilename = findAvailableFilename(baseFilename);

// Assuming you have a way to save the file, use the determined filename
// Example save function (you would replace this with actual save logic)
img.save(availableFilename);; // Ensure this method is defined or replace with your save mechanism

print("File would be saved as: " + availableFilename);
