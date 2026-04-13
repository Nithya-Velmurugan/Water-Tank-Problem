# 💧 Water Tank Problem Visualizer

A premium, interactive Frontend Web Application built from scratch with **Vanilla JavaScript, HTML, and CSS**. This project instantly calculates and visually solves the classic "Trapping Rain Water" algorithmic problem.

## 🚀 Algorithmic Approach & Impact
The core engineering challenge is calculating the trapped water units accurately and performantly. 
- **Algorithm Strategy**: Built using an optimized dynamic programming methodology. It pre-computes the maximum boundary heights originating from both the left (`leftMax`) and right (`rightMax`) passes. 
- **Performance Constraints**: Functions at a lightning-fast **O(N) Time Complexity** while maintaining a strict **O(N) Space Complexity** memory footprint.
- **Zero-Dependency Rendering**: Transforms the raw calculation data into an interactive, mathematical **Table View Graph** via entirely custom SVG element generation. This completely eliminates the need for heavy third-party graphing frameworks (like Chart.js or D3.js).

## 🛠️ Tech Stack
* **Vanilla JavaScript (ES6)** - Raw DOM manipulation and programmatic geometric mapping.
* **HTML5** - Clean, semantic markup.
* **Modern CSS3** - Responsive UI components, Google Font integration (Inter), and custom SVG block-styling.

## 💻 Try it Out!
1. **Zero build steps required.** Simply download/clone this repository and double-click `index.html` to run the app directly in your web browser.
2. **Input Data**: Enter your comma-separated array of integer block heights (e.g., `0,4,0,0,0,6,0,6,4,0`).
3. **Execute**: Press the **Compute** button to trigger the algorithm and generate the visual projections showing BOTH the tank block layout and strictly the isolated water units.

---
*Developed as a technical demonstration highlighting optimal data logic bridged with precise frontend DOM manipulations.*
