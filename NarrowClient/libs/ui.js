window.NarrowSDK = {
	SkyDomes: {
		Day: {
			skyHighCol: new window.THREE.Color(0, 0.415, 0.96),
			skyLowCol: new window.THREE.Color(0.807, 0.89, 0.933),
			skyMidCol: new window.THREE.Color(0.807, 0.89, 0.933)
		},
		Night: {
			skyHighCol: new window.THREE.Color(0.078, 0.078, 0.156),
			skyLowCol: new window.THREE.Color(0.019, 0.027, 0.098),
			skyMidCol: new window.THREE.Color(0.039, 0.039, 0.137)
		},
		SunSet: {
			skyHighCol: new window.THREE.Color(0.937, 0.4, 0.078),
			skyLowCol: new window.THREE.Color(0.996, 0.666, 0.447),
			skyMidCol: new window.THREE.Color(0.996, 0.866, 0.639)
		},
	},
	SetSky: function (style) {
		window.NarrowSDK.Scene.traverse(function (obj) {
			if (obj.name === "skydome") {

				// gotta manually do it cuz the vtable (prototype) doesnt match up properly and im not sure how to set it to THREE.Color's one

				obj.material.uniforms.skyHighCol.value.r = style.skyHighCol.r;
				obj.material.uniforms.skyHighCol.value.g = style.skyHighCol.g;
				obj.material.uniforms.skyHighCol.value.b = style.skyHighCol.b;

				obj.material.uniforms.skyLowCol.value.r = style.skyLowCol.r;
				obj.material.uniforms.skyLowCol.value.g = style.skyLowCol.g;
				obj.material.uniforms.skyLowCol.value.b = style.skyLowCol.b;

				obj.material.uniforms.skyMidCol.value.r = style.skyMidCol.r;
				obj.material.uniforms.skyMidCol.value.g = style.skyMidCol.g;
				obj.material.uniforms.skyMidCol.value.b = style.skyMidCol.b;
			}
		});
	},
	NarrowUI: {
		CreateMenu: function (icon, title, callback) { // static/img/menuUI/settings.svg
			/*
				Converted to JavaScript by YeemiScript
			*/
			const div = document.createElement("div");
			div.className = "main-menu-button-container extraBtn";

			const button = document.createElement("button");
			button.className = "wrinkledPaper main-menu-button";
			button.setAttribute("aria-label", title);
			button.style.setProperty("--wrinkled-paper-seed", "45893");

			const buttonImage = document.createElement("div");
			buttonImage.className = "buttonImage";
			buttonImage.style.backgroundImage = `url("${icon}")`;
			buttonImage.style.backgroundSize = "60%";

			button.appendChild(buttonImage);
			div.appendChild(button);

			const buttonText = document.createElement("div");
			buttonText.className = "main-menu-button-text whiteBigText blueNight";
			buttonText.setAttribute("aria-hidden", "true");
			buttonText.textContent = title;

			div.appendChild(buttonText);

			button.addEventListener("click", function () {
				callback(div);
			});

			const xpath = "/html/body/div[2]/div[2]/div[2]";
			const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			const element = result.singleNodeValue;

			element.appendChild(div);

			return div;
		}
	}
};

WeakMap.prototype.set = new Proxy(WeakMap.prototype.set, {
	apply(target, thisArgs, args) {
		if (args[0].type == "Scene") {
			if (window.NarrowSDK.Scene == undefined) {
				window.NarrowSDK.Scene = args[0];
			}
		}

		return Reflect.apply(...arguments);
	}
});