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
