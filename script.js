document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('array-input');
    const computeBtn = document.getElementById('compute-btn');
    const errorMsgElement = document.getElementById('error-msg');
    
    const inputDisplay = document.getElementById('input-display');
    const unitsOutputElement = document.getElementById('units-output');
    
    const svgBoth = document.getElementById('svg-container-both');
    const svgWater = document.getElementById('svg-container-water');

    function processInput() {
        errorMsgElement.textContent = '';
        const rawValue = inputElement.value;
        
        const parts = rawValue.split(',').map(s => s.trim());
        const heights = [];
        for (const p of parts) {
            if (p === '') continue;
            const val = parseInt(p, 10);
            if (isNaN(val) || val < 0) {
                errorMsgElement.textContent = 'Invalid input!';
                return;
            }
            heights.push(val);
        }

        if (heights.length === 0) {
            errorMsgElement.textContent = 'Empty array!';
            return;
        }

        inputDisplay.textContent = heights.join(',');

        const { totalWater, waterLevels } = calculateWater(heights);
        
        unitsOutputElement.textContent = totalWater;

        // Render top graph (Blocks + Water)
        renderGrid(svgBoth, heights, waterLevels, true);
        
        // Render bottom graph (Only Water)
        renderGrid(svgWater, heights, waterLevels, false);
    }

    function calculateWater(heights) {
        const n = heights.length;
        if (n === 0) return { totalWater: 0, waterLevels: [] };

        const leftMax = new Array(n).fill(0);
        const rightMax = new Array(n).fill(0);
        const waterLevels = new Array(n).fill(0);

        leftMax[0] = heights[0];
        for (let i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
        }

        rightMax[n - 1] = heights[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
        }

        let totalWater = 0;
        for (let i = 0; i < n; i++) {
            waterLevels[i] = Math.min(leftMax[i], rightMax[i]) - heights[i];
            if (waterLevels[i] > 0) {
                totalWater += waterLevels[i];
            } else {
                waterLevels[i] = 0;
            }
        }

        return { totalWater, waterLevels };
    }

    function renderGrid(container, heights, waterLevels, showBlocks) {
        const cellSize = 30; // Closer to screenshot scale
        const n = heights.length;
        let maxHeight = Math.max(...heights);
        const rows = maxHeight + 1; // 1 empty row on top

        const svgWidth = n * cellSize;
        const svgHeight = rows * cellSize;

        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("width", svgWidth);
        svg.setAttribute("height", svgHeight);
        svg.setAttribute("style", "display: block; margin: 0;");

        for (let x = 0; x < n; x++) {
            for (let y = 0; y < rows; y++) {
                const rect = document.createElementNS(ns, "rect");
                rect.setAttribute("x", x * cellSize);
                rect.setAttribute("y", (rows - 1 - y) * cellSize);
                rect.setAttribute("width", cellSize);
                rect.setAttribute("height", cellSize);
                
                // Borders
                rect.setAttribute("stroke", "#000");
                rect.setAttribute("stroke-width", "1");

                let fillColor = "white"; // default

                if (showBlocks && y < heights[x]) {
                    fillColor = "yellow";
                } else if (y >= heights[x] && y < heights[x] + waterLevels[x]) {
                    fillColor = "#00b0f0"; // light blue
                }

                rect.setAttribute("fill", fillColor);
                svg.appendChild(rect);
            }
        }

        container.innerHTML = '';
        container.appendChild(svg);
    }

    // Attach listeners
    computeBtn.addEventListener('click', processInput);
    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') processInput();
    });

    // Run once on load
    processInput();
});
