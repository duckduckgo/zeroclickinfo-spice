// `ddg_spice_google_plus` is a callback function that gets
// called when people search for movie titles. Example
// triggers are "google+ duckduckgo" or "google+ ubuntu."

// This anonymous function is used to prevent helper
// functions from becoming global functions. We only expose
// `ddg_spice_google_plus` so we attach it to the variable `root`. 
(function(root) {
    "use strict";

    root.ddg_spice_google_plus = function(google) {
        var re, query, collection;

        // Check if the user is searching for people.
        if(google && google.kind === "plus#peopleFeed" && google.items && google.items.length > 0) {
            collection = {
                limit: getLimit(google.items.length, 5),
                google: google,
                query: getQuery()
            };

            display(collection);
        // Check if the user wants to view a specific person.
        } else if(google && google.kind === "plus#person") {
            collection = {
                about: getAbout(google),
                organizations: getOrganizations(google),
                placesLived: getPlaces(google),
                links: getLinks(google),
                google: google
            };

            display(collection);
        }
    };

    // This function gets the original query and strips the trigger words.
    function getQuery() {
        var re = /\s*(google\+|google\splus|g\+|gplus|google\+\suser|g\+\suser|google\splus\suser|google\+\sprofile|g\+\sprofile|gplus\sprofile|gplus\suser|g\splus\sprofile|g\splus\suser)\s*/,
            query = DDG.get_query();
        return query.replace(re, '');
    }

    // This function extracts the external links on their
    // Google+ profile (e.g. Twitter).
    function getLinks(google) {
        var links = [], unique = [];
        if(google.urls && google.urls.length > 2) {
            google.urls.length -= 2;
            for(var i = 0; i < google.urls.length; i += 1) {
                if(unique.indexOf(google.urls[i].value) === -1) {
                    unique.push(google.urls[i].value);
                    var re = /(?:https?:\/\/)?(?:www\.)?([^\/]+)\/?.*/;
                    var string =  google.urls[i].value.toLowerCase();
                    string = string.replace(re, "$1");
                    re = /\.(?:com|net|org)/;
                    string = string.replace(re, "");
                    links.push([google.urls[i].value, string]);
                }
            }
        }
        return links;
    }

    // This function retrieves the place where a person is currently living in (e.g. New Jersey).
    function getPlaces(google) {
        var places = [];
        if(google.placesLived) {
            for(var i = 0, length = google.placesLived.length; i < length; i += 1) {
                if(google.placesLived[i].primary) {
                    places.push(google.placesLived[i].value);
                }
            }
        }
        return places;
    }

    // Organizations in Google+ can be the school (e.g. Harvard) and/or 
    // place of work (e.g. NASA).
    function getOrganizations(google) {
        var orgs = '', length;
        if(google.organizations) {
            length = getLimit(google.organizations.length, 2);
            for(var i = 0; i < length; i += 1) {
                orgs += google.organizations[i].name + 
                    (google.organizations[i].title ? ' (' + google.organizations[i].title + ')' : '');
                if(i !== length - 1) {
                    orgs += ', ';
                }
            }
        }
        return orgs;
    }

    // Some people add introductions and taglines in their profile.
    function getAbout(google) {
        var out = '';
        if (google.tagline && google.tagline !== '<br>') {
            out = google.tagline;
        } else if(google.aboutMe && google.aboutMe !== '<br>') {
            out = google.aboutMe.substring(0, 200);
            if(google.aboutMe.length > 200) {
                out += '...';
            }
        }
        return out;
    }

    // Limit the number of items displayed.
    function getLimit(compare, limit) {
        if(compare > limit) {
            return limit;
        } else {
            return compare;
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

        // Wraps the person's introduction in a `div` tag.
        function aboutHTML(about) {
            if(about !== '') {
                return '<div class="google_profile"><i>Introduction: </i> ' + about + '</div>';
            }
            return '';
        }

        // Wraps the organizations in a `div` tag.
        function organizationsHTML(organizations) {
            if(organizations !== '') {
                return '<div class="google_orgs"><i>Organizations: </i>' + organizations + '</div>';
            }
            return '';
        }

        // Wraps the person's current location in a `div` tag.
        function placesHTML(placesLived) {
            var out = '';
            for(var i = 0, length = placesLived.length; i < length; i += 1) {
                out += '<div class="google_places"><i>Lives in: </i>' + placesLived[i] + '</div>';
            }
            return out;
        }

        // The external links are added to an anchor tag.
        function linksHTML(links) {
            var out = '';
            if(links.length > 0) {
                for(var i = 0, length = links.length; i < length; i += 1) {
                    out += '<a href="' + links[i][0] + '" title="' + links[i][0] + '">' +
                        links[i][1] + '</a>';
                    out += ', ';
                }
                if(out.substring(out.length-2, out.length) === ', ') {
                    out = out.substring(0, out.length-3);
                }
                return '<div class="google_links"><i>Links: </i>' + out + '</div>';
            }
            return '';
        }

        // Finally, we display the plugin. We have two `nra` functions because this 
        // plugin can be called in two different ways (check `GooglePlus.pm`).
        var items = [[]];
        if(collection.google.kind === "plus#peopleFeed") {
            items[0] = {
                a: builderHTML(collection.google, collection.limit),
                h: 'Google+ Users (' + collection.query + ')',
                s: 'Google+',
                f: true,
                u: 'http://plus.google.com/s/' + collection.query
            };
            nra(items, 1, 1);
        } else {
            items[0] = {
                a: aboutHTML(collection.about) + organizationsHTML(collection.organizations) + 
                    placesHTML(collection.placesLived) + linksHTML(collection.links),
                h: collection.google.displayName + ' (Google+)',
                s: 'Google+',
                u: collection.google.url,
                f: true,
                i: collection.google.image.url.substring(0, collection.google.image.url.length-6)
            };
            nra(items);
        }
    }
}(this));