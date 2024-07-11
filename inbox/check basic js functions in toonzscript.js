// Script to check basic JavaScript capabilities in ToonzScript
print("Starting script execution...");

// Check basic JavaScript constructors and utilities
var itemsToCheck = ['Array', 'Object', 'Math', 'Date', 'String'];
itemsToCheck.forEach(function(item) {
    print(item + " availability: " + (typeof this[item] !== 'undefined' ? "available" : "not available"));
});

print("Script execution finished.");
