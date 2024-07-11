// Example ToonzScript using basic JavaScript objects with strings
print("Starting script execution...");

// Creating and manipulating an array of strings
var items = ["apple", "banana", "cherry"];
print("Original items: " + items.join(", "));

// Adding a new item to the array
items.push("watermelon");
print("Updated items: " + items.join(", "));

// Removing the last item from the array
var removedItem = items.pop();
print("Removed item: " + removedItem);
print("Current items: " + items.join(", "));

print("Script execution finished.");
