function ddg_spice_quixey(data) {
	/********/
	/* Init */
	/********/
	var state = {};
	// placeholder for the apps
	state.apps = [];
	function setup() {
		/* Initialize globals */
		state.min_win = 500;
		// minimum window width to show dots
		state.li_width = 90;
		// default total width and border of each carousel <li>
		state.li_padding = 14;
		state.li_border = 0;
		state.frame_padding = 14;
		// default frame padding and border
		state.frame_border = 2;
		state.current_item = 0;
		// current video in nav
		//Set total width of <li>
		state.thumb_width = state.li_width + state.li_padding + state.li_border;
		// store window width
		state.win = YAHOO.util.Dom.getRegion("nav").width;
		var frame_width = state.win - state.frame_padding - state.frame_border;
		// increment by how many thumbs
		state.inc = Math.floor(frame_width / state.thumb_width);
		// stretch li to fit max
		var extra = frame_width - state.thumb_width * state.inc;
		state.li_width += Math.ceil(extra / state.inc);
		// last video
		var linc = state.apps.length % state.inc;
		state.last = Math.max(0, state.apps.length - (linc ? linc : state.inc));
		// whole states
		state.current_item -= state.current_item % state.inc;
		// check if zero click box has mouse or keyboard focus
		state.hasFocus = false;
		// add the navigation
		createNav();
		// moves the slide to their current position
		setSlides();
		// style for prev / next
		pnClasses();
		// add the dots
		makeDots();
		// listen for window resizes
		YAHOO.util.Event.addListener(window, "resize", function() {
			clearTimeout(state.resize);
			state.resize = setTimeout(setup, 400);
		});
	}
	
	/************************/
	/* FUNCTION DEFINITIONS */
	/************************/

	/********************/
	/* Helper Functions */
	/********************/

	// Make sure a property is defined on an object
	function isProp(obj, prop) {
		prop = prop.split(".");
		for (var i = 0, len = prop.length; i < len; i++) {
			if ((obj = obj[prop[i]]) === undefined) return false;
		}
		return true;
	}
	// Cross-browser prevent default
	function preventDefault(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	}

	// simple function to shorten strings
	function shorten(string, length) {
		if (length === undefined) length = 40;
		if (string.length > length) {
			return string.slice(0, length - 3) + "...";
		} else {
			return string;
		}
	}

	function toHTTPS(url) {
		return url.replace("http://", "https://");
	}

	/******************/
	/* Event Handlers */
	/******************/

	// Click handler for prev / next arrows
	function wrapCB(next) {
		return function(e) {
			preventDefault(e);
			if (state.current_item === 0 && !next) return;
			if (state.current_item === state.last && next) return;
			state.current_item += (next ? 1 : -1) * state.inc;
			// edge conditions when resizing
			if (state.current_item < 0) state.current_item = 0;
			if (state.current_item > state.last) state.current_item = state.last;
			doNav(state.current_item / state.inc);
		};
	}
	// Close around clicking thumbs
	function clickA(app) {
		return function(e) {
			preventDefault(e);
			var ul = d.getElementById("slides");
			var j = 0, len = ul.childNodes.length;
			for (;j < len; j++) {
				YAHOO.util.Dom.removeClass(ul.childNodes[j], "sel");
			}
			YAHOO.util.Dom.addClass(this.parentNode, "sel");
			addPreview(app);
		};
	}

	/****************/
	/* JSON Parsing */
	/****************/
	function getInfo(app) {
		var app_id_string = app.id.toString();
		var app_container = d.createElement("div");
		var img_anchor = d.createElement("a");
		var img = d.createElement("img");
		img_anchor.href = app.url || app.developer.url || dir_url;
		img.src = toHTTPS(app.icon_url);
		var info = d.createElement("div");
		var name_wrap = d.createElement("div");
		var details = d.createElement("div");
		details.innerHTML = getDetails(app);
		var name = d.createElement("a");
		name.href = app.url;
		name.innerHTML = shorten(app.name, 80);
		var price = d.createElement("div");
		price.innerHTML = getPriceRange(app.editions);
		var rating = d.createElement("div");
		if (app.rating != null)
			rating.innerHTML = getRating(app);
		var description = d.createElement("div");
		var clear = d.createElement("div");
		if (isProp(app, "short_desc")) 
			description.innerHTML += shorten(app.short_desc, 180);
		name_wrap.appendChild(name);
		name_wrap.appendChild(rating);
		name_wrap.appendChild(price);
		name_wrap.appendChild(description);
		img_anchor.appendChild(img);
		info.appendChild(img_anchor);
		info.appendChild(name_wrap);
		app_container.appendChild(info);
		app_container.appendChild(details);
		app_container.appendChild(clear);
		// Set Styles
		YAHOO.util.Dom.setAttribute(app_container, "id", app_id_string);
		YAHOO.util.Dom.setAttribute(details, "id", "details_" + app_id_string);
		if (app.rating != null) {
			YAHOO.util.Dom.setAttribute(rating, "title", app.rating.toFixed(1));
			YAHOO.util.Dom.addClass(rating, "rating");
		}
		YAHOO.util.Dom.setAttribute(description, "title", app.short_desc);
		YAHOO.util.Dom.addClass(app_container, "app_container");
		YAHOO.util.Dom.addClass(img_anchor, "app_icon_anchor");
		YAHOO.util.Dom.addClass(img, "app_icon");
		YAHOO.util.Dom.addClass(info, "app_info");
		YAHOO.util.Dom.addClass(price, "price");
		YAHOO.util.Dom.addClass(name_wrap, "name_wrap");
		YAHOO.util.Dom.addClass(details, "app_details ");
		YAHOO.util.Dom.addClass(name, "name");
		YAHOO.util.Dom.setAttribute(name, "title", app.name);
		YAHOO.util.Dom.addClass(clear, "clear");
		YAHOO.util.Dom.addClass(description, "app_description");
		return app_container.innerHTML;
	}
	// extract app information and add to view	
	function getDetails(app) {
		var more_info = d.createElement("div");
		var editions = d.createElement("div");
		editions.innerHTML = getEditions(app.editions);
		more_info.appendChild(editions);
		YAHOO.util.Dom.addClass(editions, "app_editions");
		return more_info.innerHTML;
	}
	// format app price, rating and description 
	function getEditions(editions_array) {
		var editions = d.createElement("div");
		for (var i in editions_array) {
			var current = editions_array[i];
			// var price = d.createElement("a");
			var edition = d.createElement("div");
			YAHOO.util.Dom.addClass(edition, "app_edition");
			if (current.rating != null) {
				rating = current.rating.toFixed(1);
				YAHOO.util.Dom.setAttribute(edition, "title", current.name + " - Rating: " + rating);
			} else {
				YAHOO.util.Dom.setAttribute(edition, "title", current.name);
			}

			// Only show indivual prices if they are different
			if (editions_array.length > 1 && getPriceRange(editions_array).match("-") != null){
				var price = ("$" + (current.cents / 100).toFixed(2).toString()).replace("$0.00", "FREE");
				edition.innerHTML += getPlatforms(current.platforms, current.url, price);
			} else {
				edition.innerHTML += getPlatforms(current.platforms, current.url);
			}
			editions.appendChild(edition);
		}
		return editions.innerHTML;
	}
	// format the list of platforms each app is available on
	function getPlatforms(p_array, url, price) {
		var platforms_array = p_array;
			platforms = d.createElement("div"),
			has_apple = 0,
			has_ios = false,
			ios = {
				name: "iOS",
				id: "ios"
			}

		// Check for presence of both iPhone and iPad
		// if so, add "iOS" to array and replace them
		// with custom "iOS" platform
 		for (var i in platforms_array) {
			if (platforms_array[i].id === 2004 || platforms_array[i].id === 2015) {
				has_apple++;
			}

			if (platforms_array[i].id === "ios"){
				has_ios = true;
				break;
			}

		}
		if (has_apple > 1 && has_ios === false) {
			platforms_array.push(ios);
		}

		for (var i in platforms_array) {
			var current = platforms_array[i];

			if ((current.id === 2004 || current.id === 2015) && has_apple > 1) {
				continue;
			}

			var platform = d.createElement("a");
			if (url != undefined)
				platform.href = url;
			var img = d.createElement("img");
			// Get proper apple icon
			if (current.id === 2004 || current.id === 2015 || current.id === "ios") {
				img.src = "https://icons.duckduckgo.com/i/itunes.apple.com.ico";
			} else {
				img.src = toHTTPS(current.icon_url);
			}
			YAHOO.util.Dom.addClass(img, "platform_icon");
			YAHOO.util.Dom.addClass(platform, "app_platform");
			platform.appendChild(img);
			platform.innerHTML += current.name;
			if (price !== undefined){
				platform.innerHTML += " - " + price;
			}
			platforms.appendChild(platform);
		}
		return platforms.innerHTML;
	}
	// determine app price
	function getPriceRange(editions_array) {
		var low = editions_array[0].cents;
		var high = editions_array[0].cents;
		var temp, range, lowp, highp;
		for (var i in editions_array) {
			temp = editions_array[i].cents;
			if (temp < low) low = temp;
			if (temp > high) high = temp;
		}
		if (low == 0) {
			lowp = "FREE";
		} else {
			lowp = "$" + (low / 100).toFixed(2).toString();
		}
		if (high > low) {
			highp = "$" + (high / 100).toFixed(2).toString();
			range = lowp + " - " + highp;
		} else {
			range = lowp;
		}
		return range;
	}
	// determine app rating
	function getRating(app) {
		var rating = d.createElement("div");
		repeat = Math.round(app.rating);
		for (var i = 0; i < repeat; i++) {
			star = d.createElement("span");
			YAHOO.util.Dom.addClass(star, "star");
			rating.appendChild(star);
		}
		return rating.innerHTML;
	}
	/**************/
	/* Navigation */
	/**************/
	function createNav() {
		// get main nav element
		var nav = d.getElementById("nav");
		nav.innerHTML = "";
		// clear
		// create slider to hold thumbnails
		// will hide overflowing elements to look like slide
		var slider = d.createElement("div");
		slider.id = "slider";
		var frame = d.createElement("div");
		frame.id = "frame";
		// store state
		var len = state.apps.length;
		var total_width = state.li_width + state.li_padding + state.li_border;
		var end = total_width * len;
		// create list of videos
		var ul = d.createElement("ul");
		ul.id = "slides";
		YAHOO.util.Dom.setStyle(ul, "width", end + "px");
		var i, li, img, a, id, app, p, txt;
		for (i = 0; i < len; i++) {
			li = d.createElement("li");
			YAHOO.util.Dom.addClass(li, "item");
			YAHOO.util.Dom.setStyle(li, "width", state.li_width + "px");
			app = state.apps[i];
			if (!isProp(app, "id"))
				continue;
			id = app.id;
			if (!isProp(app, "url"))
				continue;
			a = d.createElement("a");
			a.href = app.url;
			YAHOO.util.Event.addListener(a, "click", clickA(app));
			img = d.createElement("img");
			if (!isProp(app, "icon_url"))
				continue;
			img.src = toHTTPS(app.icon_url);
			p = d.createElement("p");
			if (!isProp(app, "name"))
				continue;
			span = d.createElement("span");
			span.innerHTML = shorten(app.name, 40);
			p.appendChild(img);
			a.appendChild(p);
			a.appendChild(span);
			li.appendChild(a);
			ul.appendChild(li);
		}
		frame.appendChild(ul);
		slider.appendChild(frame);
		nav.appendChild(slider);
	}
	// Make prev / next arrows
	function makeArrow(id, next) {
		var na = d.createElement("a");
		na.href = "#";
		na.id = id;
		var na_img = d.createElement("img");
		na_img.id = id + "_img";
		na_img.src = next ? DDG.get_asset_path("arrow-next.png") : DDG.get_asset_path("arrow-prev.png");
		na.appendChild(na_img);
		YAHOO.util.Dom.addClass(na_img, "npa_img");
		YAHOO.util.Dom.addClass(na, "npa");
		YAHOO.util.Event.addListener(na, "click", wrapCB(next));
		var pagination = d.getElementById("pagination");
		pagination.appendChild(na);
	}
	// Invoke common nav methods
	function doNav(i) {
		setSlides();
		pnClasses();
		highlightDot(i);
	}
	// Slide the thumbnails around
	function setSlides() {
		var mar = "-" + state.current_item * (state.li_width + state.li_padding + state.li_border) + "px";
		YAHOO.util.Dom.setStyle("slides", "margin-left", mar);
	}
	// Set styling on previous / next buttons
	function pnClasses() {
		if (state.current_item > 0) YAHOO.util.Dom.removeClass("preva", "npah"); else YAHOO.util.Dom.addClass("preva", "npah");
		if (state.current_item < state.last) YAHOO.util.Dom.removeClass("nexta", "npah"); else YAHOO.util.Dom.addClass("nexta", "npah");
	}
	// Highlight the appropriate dot
	function highlightDot(j) {
		var dots = d.getElementById("dots");
		var n = Math.ceil(state.apps.length / state.inc);
		if (n > 4 && state.win < state.min_win) // small screen
			return showPage(dots, n);
		dots = dots.childNodes;
		var l = dots.length;
		var k = 0;
		for (;k < l; k++) YAHOO.util.Dom.removeClass(dots[k], "selected");
		YAHOO.util.Dom.addClass(dots[j], "selected");
	}
	// Close around dot handler
	function dotHandler(j) {
		return function(e) {
			preventDefault(e);
			state.current_item = j * state.inc;
			doNav(j);
		};
	}
	// Show page numbers
	function showPage(dots, n) {
		var sel = state.current_item / state.inc;
		var p = d.createElement("p");
		YAHOO.util.Dom.addClass(p, "page");
		p.appendChild(d.createTextNode(sel + 1 + "/" + n));
		dots.innerHTML = "";
		// clear
		dots.appendChild(p);
	}
	// Make the dots
	function makeDots() {
		var dots = d.getElementById("dots"),
			n = Math.ceil(state.apps.length / state.inc);
		if (!dots) {
			dots = d.createElement("div");
			dots.id = "dots";
			var nav = d.getElementById("nav");
			pagination = d.createElement("div");
			pagination.id = "pagination";
			nav.appendChild(pagination);
			if (n > 1) {
				// add the prev / next arrows
				makeArrow("nexta", true);
				makeArrow("preva", false);
				pagination.appendChild(dots);
			} else {
				YAHOO.util.Dom.addClass(pagination, "minimal");
			}
		}
		var lin, j = 0, sel = state.current_item / state.inc;
		// at most 4 dots on small screens
		if (n > 4 && state.win < state.min_win) {
			return showPage(dots, n);
		}
		dots.innerHTML = ""; // clear
		for (;j < n; j++) {
			lin = d.createElement("a");
			lin.appendChild(d.createTextNode("\u2022"));
			lin.href = "#";
			if (j === sel) YAHOO.util.Dom.addClass(lin, "selected");
			YAHOO.util.Event.addListener(lin, "click", dotHandler(j));
			dots.appendChild(lin);
		}
	}

	/*****************/
	/* Preview Embed */
	/*****************/

	// Add app preview to screen
	function addPreview(app) {
		var preview, id = app.id;
		if (!id) {
			preview = d.getElementById("preview");
			if (!preview)
				return;
			id = YAHOO.util.Dom.getAttribute(preview, "app");
		}
		preview = d.createElement("div");
		preview.id = "preview";
		preview.innerHTML = getInfo(app);
		YAHOO.util.Dom.setStyle(preview, "width", "100%");
		YAHOO.util.Dom.setStyle(preview, "height", "100%");
		YAHOO.util.Dom.setAttribute(preview, "app", id);
		var emb = d.getElementById("emb");
		emb.innerHTML = "";
		//clear
		emb.appendChild(preview);
		YAHOO.util.Dom.setStyle("emb", "display", "block");
	}


	/*******************/
	/* Relevancy Check */
	/*******************/

	// remove irrelevant result
	function getRelevant(results) {
		var apps = [],
			backupApps = [],
			CATEGORIES = [
				"action",
				"adventure",
				"arcade",
				"board",
				"business",
				"casino",
				"design",
				"developer tools",
				"dice",
				"education",
				"educational",
				"entertainment",
				"family",
				"finance",
				"graphics",
				"graphics and design",
				"health and fitness",
				"kids",
				"lifestyle",
				"medical",
				"music",
				"networking",
				"news",
				"photography",
				"productivity",
				"puzzle",
				"racing",
				"role playing",
				"simulation",
				"social networking",
				"social",
				"sports",
				"strategy",
				"travel",
				"trivia",
				"utilities",
				"video",
				"weather",
			],
			SKIP_ARRAY = {
				"app": 1,
				"apps": 1,
				"application": 1,
				"applications": 1,
				"android": 1,
				"droid": 1,
				"google play store": 1,
				"google play": 1,
				"windows phone": 1,
				"windows phone 8": 1,
				"windows mobile": 1,
				"windows": 1,
				"blackberry": 1,
				"apple app store": 1,
				"apple app": 1,
				"ipod touch": 1,
				"ipod": 1,
				"iphone": 1,
				"ipad": 1,
				"ios": 1,
				"free": 1
			};

		for (var i in results) {
			// console.log("IS RELEVANT? : " + app.name);
			// console.log(DDG.isRelevant(app.name, SKIP_ARRAY, 3));

			// check to make sure this is actually a key
			if (isProp(results, i)){
				// console.log(results[i]);
				app = results[i];
			} else {
				// console.log(" NOT A PROPERTY" + i);
				continue;
			}


			// check if this app result is relevant
			if (DDG.isRelevant(app.name.toLowerCase(), SKIP_ARRAY)) {
				// console.log("RELEVANT: " + app.name);
				apps.push(app);
			} else if (isProp(app, "short_desc")) {
				if (DDG.isRelevant(app.short_desc.toLowerCase(), SKIP_ARRAY)) {
					// console.log("BACKUP APP SHORT DESC: " + app.name);
					backupApps.push(app);
				}
			} else if (isProp(app.custom, "category")) {
				if (DDG.isRelevant(app.custom.category.toLowerCase(), SKIP_ARRAY)) {
					// console.log("BACKUP APP CATEGORY: " + app.name);
					backupApps.push(app);
				}
			} else{
				// console.log("NOT RELEVANT: " + app.name);
				continue;
			}
			continue;
		}

		// Return relevant results
		// console.log(apps);
		if (apps.length > 0) {
			return apps;
		}

		// Returnrelevant results
		// and some supplemental results
		// console.log(backupApps);
		if (backupApps.length > 0) {
			return backupApps;
		}

		// No very relevant results,
		// fallback to check if it was a
		// categorical search Eg."free social apps for android"
		var q = DDG.get_query();
		var matches = CATEGORIES.map(
			function(w){
				var word = new RegExp(w, "i");
				return q.match(word) ? 1 : 0;
			}
		);
		return (matches.indexOf(1) !== -1) ? results : null;
	}


	/********/
	/* Main */
	/********/

	// Check for results
	if (data && isProp(data, "results") && data.results.length > 0) {
		// store the apps
		state.apps = getRelevant(data.results);
		if (state.apps === null) return;
		// main container
		var container = d.createElement("div");
		var div = d.createElement("div");
		div.id = "quixey";
		// container for navigation
		var nav = d.createElement("div");
		nav.id = "nav";
		div.appendChild(nav);
		// container for the app preview, initially hidden
		var emb = d.createElement("div");
		emb.id = "emb";
		div.appendChild(emb);
		// Append quixey div to container
		container.appendChild(div);
		// set more at link
		var u = "https://www.quixey.com/search?q=";
		if (isProp(data, "q")) {
			var q = data.q.replace(/\s/g, "+");
		}
		// grab original query for header
		var query = DDG.get_query();
		// ddg: add to page
		var items = [ {
			a: container.innerHTML,
			h: query + " (App Search)",
			s: "Quixey",
			u: u + q,
			force_big_header: true,
			force_more_at_logo: "quixey_logo.png",
			force_no_fold: 1
		} ];
		nra(items, 0, true);
		// start spice
		setup();
	}
}