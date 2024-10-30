// Import the fs (file system) module to read files
const fs = require('fs');

// List of input files
const inputFiles = ['input.json', 'input1.json'];

// Function to calculate the constant term 'c' using Lagrange interpolation
function lagrangeInterpolation(points) {
    let constantTerm = 0;
    const numPoints = points.length;

    // Calculate the Lagrange interpolation polynomial at x=0 (constant term)
    for (let i = 0; i < numPoints; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < numPoints; j++) {
            if (i !== j) {
                let xj = points[j][0];
                li *= (0 - xj) / (xi - xj);
            }
        }

        constantTerm += yi * li;
    }

    return Math.round(constantTerm);
}

// Loop through each input file, read data, and calculate 'c'
inputFiles.forEach((fileName) => {
    // Step 1: Read and parse the JSON file
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));

    // Extract keys for n and k
    const { n, k } = data.keys;

    // Step 2: Decode the (x, y) pairs
    const points = [];
    for (const [x, pointData] of Object.entries(data)) {
        if (x === "keys") continue; // Skip the "keys" object
        const base = parseInt(pointData.base);
        const value = pointData.value;

        // Convert value from given base to decimal (base 10)
        const y = parseInt(value, base); // This line may fail for large values, see below

        // Store the (x, y) pair
        points.push([parseInt(x), y]);
    }

    // Step 3: Calculate the secret constant term 'c' for this file
    const secret = lagrangeInterpolation(points);
    console.log(`The secret constant term (c) for ${fileName} is:`, secret);
});
