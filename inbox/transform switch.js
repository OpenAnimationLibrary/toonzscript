// Function to apply transformations based on type
function applyTransformation(type, parameters) {
    switch (type) {
        case 'scale':
            print('Scaling object...');
            // Assuming a function scaleObject exists that takes parameters for scaling
            scaleObject(parameters.x, parameters.y);
            break;
        case 'rotate':
            print('Rotating object...');
            // Assuming a function rotateObject exists that takes degrees as a parameter
            rotateObject(parameters.degrees);
            break;
        case 'translate':
            print('Translating object...');
            // Assuming a function translateObject exists that takes x and y offsets
            translateObject(parameters.x, parameters.y);
            break;
        default:
            print('Unknown transformation type:', type);
            break;
    }
}

// Example usage
applyTransformation('rotate', { degrees: 90 });
applyTransformation('scale', { x: 1.5, y: 1.5 });
applyTransformation('translate', { x: 100, y: 50 });
