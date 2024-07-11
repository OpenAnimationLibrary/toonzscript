// Function to extract date and time from the filename
function extractDateTimeFromFilename(filename) {
    var pattern = /_(\d{8}_\d{6})\.tlv$/; // Regex to find the datetime pattern
    var match = filename.match(pattern);
    return match ? match[1] : null;
}

// Function to check if a file exists
function fileExists(filepath) {
    // Placeholder function: You need to replace this with actual file existence check in ToonzScript
    // This is just a conceptual placeholder
    return false;
}

// Simulated input filename
var filename = "F:\\converted_20240710_123456.tlv";

// Extract date-time from filename
var dateTime = extractDateTimeFromFilename(filename);
if (dateTime) {
    print("Extracted Date-Time: " + dateTime);

    // Prepare the original filename by removing the date-time stamp
    var originalFilename = filename.replace("_" + dateTime, "");

    // Check if the original file already exists
    if (!fileExists(originalFilename)) {
        // Code to save the file as originalFilename
        // Assuming b is your image object loaded from filename
        // b.save(originalFilename);
        print("File saved as: " + originalFilename);
    } else {
        print("File already exists. Not saving: " + originalFilename);
    }
} else {
    print("No date-time found in the filename.");
}
