function ddg_spice_deb_version(ir) 
{
    var out, tmp, div, div2, link, img, item, program;
    out = '';

    console.log(ir);

    if (ir == ""){ return 1;};
    items = new Array();
    items[0] = new Array();
    program = ir.split("|")[0];
    console.log(program);
    ir = ir.split('\n');
    ir = '<p>'+ ir.join('</p><p>') + '</p>';
    items[0]['a'] = ir;
    items[0]['h'] = 'Versions of ' + program + ' in Debian';
    items[0]['s'] = 'qa.debian.org';
    items[0]['u'] = 'http://qa.debian.org/madison.php?package=' + program + '&table=debian&a=&c=&s=#';
    nra(items);
  
    // // validity check
    // if (alts['Items']) {
    // 	for (i in alts['Items']) {
    // 	    item = alts['Items'][i];

    // 	    div = d.createElement("div");
    // 	    div2 = d.createElement("div");

    // 	    link = d.createElement("a");
    // 	    link.href = item['Url'];
    // 	    if (item['Name'].length >= 10) {
    // 		item['Name'] = item['Name'].substring(0,8) + "...";
    // 	    }
    // 	    img = d.createElement('img');
    // 	    img.src = '/iu/?u='+item['IconUrl'];
    // 	    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
    // 	    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
    // 	    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
    // 	    link.appendChild(img);
    // 	    div.appendChild(link);

    // 	    link = d.createElement('a');
    // 	    link.href = item['Url'];
    // 	    link.innerHTML = item['Name'];
    // 	    div.appendChild(link);
    // 	    div.appendChild(d.createElement('br'));
      
    // 	    YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
    // 	    YAHOO.util.Dom.setStyle(div, "float", "left");
    // 	    YAHOO.util.Dom.setStyle(div, "margin", "10px 20px 10px 0px");
    // 	    YAHOO.util.Dom.setStyle(div, "padding", "5px");
    // 	    YAHOO.util.Dom.setStyle(div, "max-width", "80px");
	    
    // 	    div2.appendChild(div);
    // 	    out += div2.innerHTML;
    // 	}
    // }
    // if (out) {
    // 	// @yegg likes it w/out the newline :)
    // 	// out += '<div class="clear"></div>';
    // 	items = new Array();
    // 	items[0] = new Array();
    // 	items[0]['a'] = out;
    // 	items[0]['h'] = '';
    // 	items[0]['s'] = 'AlternativeTo';
    // 	items[0]['u'] = alts['Url'];
    // 	nra(items,1,1);
    // }
}
