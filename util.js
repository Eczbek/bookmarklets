javascript: (async () => {
	/* for statistics homework */
	
	window.util = {};
	
	window.util.round = (value, decimals = 2) => Math.round(value * (10 ** decimals)) / (10 ** decimals);
	
	window.util.zip = (callback, arrays) => [...Array(Math.max(...arrays.map((array) => array.length)))].fill().map((_, i) => {
		const elements = arrays.filter((array) => array.length > i).map((array) => array[i]);
		return elements.length < 2 ? elements[0] : elements.slice(1).reduce(callback, elements[0]);
	});

	window.util.frequencies = (values) => values.reduce((result, item) => {
		if (!result[item]) {
			result[item] = 0;
		}
		++result[item];
		return result;
	}, {});

	window.util.categoryFrequencies = (values, min, width) => {
		const g = [];
		for (let i = 0; min <= Math.max(...values); ++i) {
			g[i] = values.reduce((x, y) => x + (y >= min && y < min + width), 0);
			min += width;
		}
		return g;
	};
	
	window.util.relativeFrequencies = (frequencies) => frequencies.map((x, y, z) => x / z.reduce((a, b) => a + b, 0));
	
	window.util.relativeCategoryFrequencies = (freqs, minimum, width) => {
		const g = [];
		const max = Math.max(...freqs);
		while (minimum <= max) {
			g.push(freqs.reduce((x, y) => x + (y >= minimum && y <= minimum + width), 0));
			minimum += width;
		}
		return window.util.relativeFrequencies(g);
	};

	window.util.categoryMidpoints = (min, width, count) => [...Array(count)].map((_, y) => (min * 2 + y * width * 2 + width - 1) / 2);
	
	window.util.mean = (values) => values.reduce((x, y) => x + y, 0) / values.length;
	
	window.util.median = (values) => values.length % 2 ? values[(values.length - 1) / 2] : (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
	
	window.util.mode = (values) => Math.max(...values);
	
	window.util.frequenciesMean = (frequencies, midpoints) => window.util.zip(frequencies, midpoints, (x, y) => x * y).reduce((x, y) => x + y, 0) / frequencies.reduce((x, y) => x + y, 0);
	
	window.util.removeElement = (x) => x.parentElement.removeChild(x);

	window.util.getData1 = () => [...document.querySelectorAll('div>span>div>div>.AnsedObject')].map((x) => +x.textContent);

	window.util.getData2 = () => [...document.querySelectorAll('center>table>tbody>tr>td>span>div>div>span.AnsedObject')].map((element) => +element.textContent);

	window.util.stemLeafPlot = (values) => {
		const result = {};
		for (const value of values) {
			(result[Math.floor(value)] ??= []).push(value - Math.floor(value));
		}
		for (const key of Object.keys(result)) {
			result[key] = result[key].sort((a, b) => a > b).reduce((y,x)=>y+Math.round(x*10), '');
		}
		return result;
	};

	window.util.stemLeafSplit = (plot) => plot.flatMap(([a, b]) => b&&String(b).split('').map(c=>+(a+(String(a).includes('.')?'':'.')+c))).filter(x=>x);
})();
