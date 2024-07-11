// Script to check for common JavaScript objects and functions
print("Starting script execution...");
print("Checking standard JavaScript objects and functions...");

var itemsToCheck = ['Array', 'Object', 'Math', 'Date', 'String'];
itemsToCheck.forEach(function(item) {
    print(item + " availability: " + (typeof global[item] !== 'undefined' ? "available" : "not available"));
});

print("Script execution finished.");
