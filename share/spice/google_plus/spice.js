// `ddg_spice_google_plus` is a callback function that gets
// called when people search for movie titles. Example
// triggers are "google+ duckduckgo" or "google+ ubuntu."

// This anonymous function is used to prevent helper
// functions from becoming global functions. We only expose
// `ddg_spice_google_plus` so we attach it to the variable `root`. 
(function(root) {
	root.ddg_spice_google_plus = function(google) {
		var re, query, collection;

		// Check if the user is searching for other people.
		if(google && google.kind === "plus#peopleFeed" && google.items && google.items.length > 0) {
			re = /\s*(google\+|google\splus|g\+|gplus|google\+\suser|g\+\suser|google\splus\suser|google\+\sprofile|g\+\sprofile|gplus\sprofile|gplus\suser|g\splus\sprofile|g\splus\suser)\s*/;
			query = DDG.get_query();
			collection = {
				limit: getLimit(google),
				google: google,
				query: query.replace(re, "")
			};

			display(collection);
		}
	};

	// Limit the number of items displayed.
	function getLimit(google) {
		if(google.items.length > 5) {
		    return 5;
		} else {
		    return google.items.length;
		}
	}

	// Use this function to create the HTML and call the `nra` function.
	function display(collection) {

		// This function is responsible for displaying individual images
		// in a row.
		function googleHTML(link_a, link_text, image_a) {
			var div, div2, link, img;

			div = d.createElement("div");
			div2 = d.createElement("div");

			link = d.createElement("a");
			link.href = link_a;

			img = d.createElement('img');
			img.src = image_a;
			YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
			YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
			YAHOO.util.Dom.setStyle(div,'text-align', 'center');
			link.appendChild(img);
			div.appendChild(link);

			link = d.createElement('a');
			link.href = link_a;
			link.innerHTML = link_text;
			div.appendChild(link);
			div.appendChild(d.createElement('br'));
			
			YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
			YAHOO.util.Dom.setStyle(div, "float", "left");
			YAHOO.util.Dom.setStyle(div, "margin", "0px 20px 0px 0px");
			YAHOO.util.Dom.setStyle(div, "padding", "5px");
			YAHOO.util.Dom.setStyle(div, "max-width", "80px");

			div2.appendChild(div);
			return div2.innerHTML;
		}

		// Concatenates the HTML.
		function builderHTML(google, limit) {
			var out = '<div style="float:left;">', item;
			for(var i = 0; i < limit; i += 1) {
				item = google.items[i];
				out += googleHTML('/?q=google%2B+userid:' + item.id, item.displayName, 
							"/iu/?u=" + item.image.url);
			}
			out += '</div>';
			return out;
		}

		var items = [[]];
		if(collection.google.kind === "plus#peopleFeed") {
			items[0] = {
				a: builderHTML(collection.google, collection.limit),
				h: 'Google+ Users (' + collection.query + ')',
				s: 'Google+',
				f: true,
				u: 'http://plus.google.com/s/' + collection.query
			}
			nra(items,1,1);
		}
	}
}(this));