//TIF to TLV with date time stamp

a = new Image("F:\\input.0001.tif");
print("Input file:  " + a);

// Create an instance of ToonzRasterConverter
r = new ToonzRasterConverter();

// Convert the input image
b = r.convert(a);

// Function to format date and time components
function formatNumber(number) {
    return (number < 10 ? '0' : '') + number; // Add leading zero if less than 10
}

// Get the current date and time
var now = new Date();
var dateTime = now.getFullYear().toString() +
               formatNumber(now.getMonth() + 1) +
               formatNumber(now.getDate()) + "_" +
               formatNumber(now.getHours()) +
               formatNumber(now.getMinutes()) +
               formatNumber(now.getSeconds());

// Append the date and time to the output filename
o = "F:\\converted_" + dateTime + ".tlv";

// Save the converted image
b.save(o);
print("Output file:  " + o);

// Load and view the level
z = new Level(o);
view(z);
