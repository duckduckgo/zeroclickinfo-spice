function ddg_spice_bootic(products) 
{
    var out, tmp, div, div2, link, img, item;
    out = '';

    var pic_width = 100;
    var pic_height = 100;
    var server = 'http://www.bootic.com';
    var pic_base_uri = 'http://static.bootic.com/_pictures/'+pic_width+'x'+pic_height+'/';

    if ( products.products && products.sorted ) {
	for (var i = 0; i < products.sorted.length; i++ ) {
	    var p_id = products.sorted[ i ];
	    var item = products.products[ p_id ];

	    div = d.createElement("div");
	    div2 = d.createElement("div");

	    link = d.createElement("a");
	    link.href = server + item.url;

	    var pic = item.pictures[0].replace( /^.*?\//, "" );
	    img = d.createElement('img');
	    img.src = '/iu/?u=' + pic_base_uri + pic;
	    img.width = pic_width;
	    img.height = pic_height;
	    img.alt = item.name;
	    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
	    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
	    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
	    link.appendChild(img);
	    div.appendChild(link);

	    link = d.createElement('a');
	    link.href = server + item.url;
	    link.innerHTML = item.name;

	    YAHOO.util.Dom.setStyle( link, 'display', 'block' );
	    YAHOO.util.Dom.setStyle( link, 'width', '110px' );
	    YAHOO.util.Dom.setStyle( link, 'max-height', '56px' );
	    YAHOO.util.Dom.setStyle( link, 'overflow', 'hidden' );

	    div.appendChild(link);
	    div.title = item.name;
      
	    var last_right = "16px";
	    if ( i == products.sorted.length - 1 )
		last_right = "0px";

	    YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
	    YAHOO.util.Dom.setStyle(div, "float", "left");
	    YAHOO.util.Dom.setStyle(div, "margin", "10px "+last_right+" 0px 0px");
	    YAHOO.util.Dom.setStyle(div, "padding", "5px 5px 5px 5px");
	    YAHOO.util.Dom.setStyle(div, "max-width", "120px");
	    
	    div2.appendChild(div);
	    out += div2.innerHTML;
	}
    }
    if (out) {
	out += '<div class="clear"></div>';
	items = new Array();
	items[0] = new Array();
	items[0]['a'] = out;
	items[0]['h'] = '';
	items[0]['s'] = 'Bootic (' + products.total + ' products)';
	var query = '';
	if ( products.query )
	    query = '?q=' + encodeURIComponent( products.query );
	items[0]['u'] = 'http://www.bootic.com/' + query;
	items[0]['f'] = 1;
	nra(items,1,1);
    }
}
