function ddg_spice_bootic( products ) 
{
	/* bail out early if there is no usable data */
	if ( ! products.products || ! products.sorted )
		return;

	/* constants */
	var pic_width = 100;
	var pic_height = 100;
	var server = 'http://www.bootic.com';
	var pic_base_uri = 'http://static.bootic.com/_pictures/'
		+ pic_width + 'x' + pic_height + '/';

	var placeholder = d.createElement( 'div' );
	var icon_parent = d.createElement( 'div' );
	YAHOO.util.Dom.addClass( icon_parent, 'bootic_products' );

	placeholder.appendChild( icon_parent );

	for ( var i = 0; i < products.sorted.length; i++ ) {
		var p_id = products.sorted[ i ];
		var item = products.products[ p_id ];

		var icon = d.createElement( 'div' );
		YAHOO.util.Dom.addClass( icon,
			'bootic_product inline highlight_zero_click1 highlight_zero_click_wrapper' );

		var link = d.createElement( 'a' );
		YAHOO.util.Dom.addClass( link, 'bootic_name' );
		link.href = server + item.url;

		var pic = item.pictures[0].replace( /^.*?\//, '' );
		var img = d.createElement( 'img' );
		YAHOO.util.Dom.addClass( img, 'bootic_picture' );
		img.src = '/iu/?u=' + pic_base_uri + pic;
		img.width = pic_width;
		img.height = pic_height;
		img.alt = item.name;
		link.appendChild( img );

		var name = d.createElement( 'span' );
		name.innerHTML = item.name;
		link.appendChild( name );

		icon.appendChild( link );
		icon.title = item.name;

		icon_parent.appendChild( icon );
	}

	var query = '';
	if ( products.query ) {
		query = encodeURIComponent( products.query );
	}

	var items = new Array();
	items[0] = new Array();
	items[0]['a'] = placeholder.innerHTML;
	items[0]['s'] = 'Bootic';
	items[0]['h'] = 'Bootic (' + query + ")";
	items[0]['u'] = 'http://www.bootic.com/?q=' + query;
	items[0]['f'] = 1;
	items[0]['force_big_header'] = 1;

	/* 
	 * favicon placement: 1 - next to More at link;
	 * is internal highlight: 1 - we have our own links
	 */
	nra( items, 1, 1 );
}
