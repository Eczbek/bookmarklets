javascript: (async () => {
	window.util = {};
	
	window.util.round = (value, decimals = 2) => Math.round(value * (10 ** decimals)) / (10 ** decimals);
	
	window.util.midpoints = (min, width, count) => [...Array(count)].map((_, y) => (min * 2 + y * width * 2 + width - 1) / 2);
	
	window.util.zip = (callback, arrays) => [...Array(Math.max(...arrays.map((array) => array.length)))].fill().map((_, i) => {
		const elements = arrays.filter((array) => array.length > i).map((array) => array[i]);
		return elements.length < 2 ? elements[0] : elements.slice(1).reduce(callback, elements[0]);
	});
	
	window.util.relativeFrequencies = (frequencies, decimals = 2) => frequencies.map((x, y, z) => window.util.round(x / z.reduce((a, b) => a + b), decimals));
	
	window.util.relativeCategoryFrequencies = (freqs, minimum, width, decimals) => {
		const g = [];
		const max = Math.max(...freqs);
		while (minimum <= max) {
			g.push(freqs.reduce((x, y) => x + (y >= minimum - 0.5 && y <= minimum + width - 0.5), 0));
			minimum += width;
		}
		return window.util.relativeFrequencies(g, decimals);
	};
	
	window.util.mean = (values) => values.reduce((x, y) => x + y, 0) / values.length;
	
	window.util.median = (values) => values.length % 2 ? values[(values.length - 1) / 2] : (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
	
	window.util.mode = (values) => Math.max(...values);
	
	window.util.frequenciesMean = (frequencies, midpoints, decimals) => window.util.zip(frequencies, midpoints, (x, y) => x * y).reduce((x, y) => x + y, 0) / frequencies.reduce((x, y) => x + y, 0);
	
	window.util.removeElement = (x) => x.parentElement.removeChild(x);
})();
