// Example ToonzScript using basic JavaScript objects
print("Starting script execution...");

// Creating and manipulating an array
var numbers = [10, 20, 30, 40, 50];
print("Original numbers: " + numbers.join(", "));

// Adding a number to the array
numbers.push(60);
print("Updated numbers: " + numbers.join(", "));

// Calculating the sum of the numbers
var sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
print("Sum of numbers: " + sum);

// Using Math object
var maxNumber = Math.max.apply(null, numbers);
print("Maximum number: " + maxNumber);

print("Script execution finished.");
