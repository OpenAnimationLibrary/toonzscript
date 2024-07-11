// Function to extract date and time from the filename
function extractDateTimeFromFilename(filename) {
    var pattern = /_(\d{8}_\d{6})\.tlv$/; // Regex to find the datetime pattern
    var match = filename.match(pattern);
    return match ? match[1] : null;
}

// Placeholder for file existence check
// Implement this function based on the actual capabilities of ToonzScript or external methods
function fileExists(filepath) {
    // This function needs actual implementation for checking file existence
    // Currently, it returns false to avoid errors
    return false;
}

// Function to find an available filename by incrementing a counter
function findAvailableFilename(baseFilename) {
    var counter = 1;
    var newFilename = baseFilename + ".tlv"; // Initial filename with extension

    // Increment filename if exists
    while (fileExists(newFilename)) {
        newFilename = baseFilename + "_" + counter + ".tlv";
        counter++;
    }

    return newFilename;
}

// Example processing logic with actual file loading and saving
var inputFilename = "F:\\converted_20240710_191102.tlv";
var dateTime = extractDateTimeFromFilename(inputFilename);

if (dateTime) {
    print("Extracted Date-Time: " + dateTime);

    // Remove the date-time stamp to revert to the original filename base
    var originalFilename = inputFilename.replace("_" + dateTime, "").replace(".tlv", "");
    var availableFilename = findAvailableFilename(originalFilename);

    // Assuming 'image' is your loaded image object from 'inputFilename'
    var image = new Image(inputFilename); // This might need to change based on actual loading method
    image.save(availableFilename); // Save the image under the new filename
    print("File saved as: " + availableFilename);
} else {
    print("No date-time found in the filename.");
}
