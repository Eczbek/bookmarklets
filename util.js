window.util = {
	round: (value, decimals = 2) => Math.round(value * (10 ** decimals)) / (10 ** decimals),

	midpoints: (min, width, count) => [...Array(count)].map((_, y) => (min * 2 + y * width * 2 + width - 1) / 2),

	zip: (arr1, arr2, callback) => arr1.map((x, y) => callback(x, arr2[y])),

	relativeFrequencies: (frequencies, decimals = 2) => frequencies.map((x, y, z) => window.round(x / z.reduce((a, b) => a + b), decimals)),

	relativeCategoryFrequencies: (freqs, minimum, width, decimals) => {
		const g = [];
		const max = Math.max(...freqs);
		while (minimum <= max) {
			g.push(freqs.reduce((x, y) => x + (y >= minimum - 0.5 && y <= minimum + width - 0.5), 0));
			minimum += width;
		}
		return window.relativeFrequencies(g, decimals);
	},

	mean: (values) => values.reduce((x, y) => x + y, 0) / values.length,

	median: (values) => values.length % 2 ? values[(values.length - 1) / 2] : (values[values.length / 2 - 1] + values[values.length / 2]) / 2,

	mode: (values) => Math.max(...values),

	frequenciesMean: (frequencies, midpoints, decimals) => window.zip(frequencies, midpoints, (x, y) => x * y).reduce((x, y) => x + y, 0) / frequencies.reduce((x, y) => x + y, 0),

	removeElement: (x) => x.parentElement.removeChild(x)
};
