javascript: (async () => {
	document.body.contentEditable = (document.body.contentEditable === "true") ? "false" : "true";
	document.designMode = (document.designMode === "on") ? "off" : "on";
})();
