const fs = require('fs');

const inputFiles = ['input.json', 'input1.json'];


function lagrangeInterpolation(points) {
    let constantTerm = 0;
    const numPoints = points.length;

    
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


inputFiles.forEach((fileName) => {
  
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));

    const { n, k } = data.keys;

   
    const points = [];
    for (const [x, pointData] of Object.entries(data)) {
        if (x === "keys") continue; 
        const base = parseInt(pointData.base);
        const value = pointData.value;

        const y = parseInt(value, base);

        points.push([parseInt(x), y]);
    }

    // Step 3: Calculate the secret constant term 'c' for this file
    const secret = lagrangeInterpolation(points);
    console.log(`The secret constant term (c) for ${fileName} is:`, secret);
});
