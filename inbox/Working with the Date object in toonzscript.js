// Example ToonzScript using the Date object
print("Starting script execution...");

// Getting the current date and time
var now = new Date();
print("Current date and time: " + now.toString());

// Displaying individual components of the date
print("Year: " + now.getFullYear());
print("Month: " + (now.getMonth() + 1)); // Months are zero-indexed, so +1 is needed
print("Day: " + now.getDate());

// Displaying time components
print("Hours: " + now.getHours());
print("Minutes: " + now.getMinutes());
print("Seconds: " + now.getSeconds());

// Creating a specific date
var specificDate = new Date(2024, 0, 1); // January 1, 2024
print("Specific date: " + specificDate.toString());

print("Script execution finished.");
