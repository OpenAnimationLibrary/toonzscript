//This script was suggested but will not work for a number of reasons.  Those reasons should be documented, preferrably inline.

// Function to copy text to the clipboard
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        print('Text copied to clipboard successfully.');
    }, (err) => {
        print('Failed to copy text: ', err);
    });
}

// Example usage
copyTextToClipboard("Hello, world!");
