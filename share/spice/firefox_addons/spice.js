function ddg_spice_firefox_addons(xmlString) {
    var items = [[]];
    var xml = parseXml(xmlString);
    var name = xml.getElementsByTagName('name')[0];
    var summary = xml.getElementsByTagName('summary')[0];
    var icon = xml.getElementsByTagName('icon')[0];
    var url = xml.getElementsByTagName('learnmore')[0];
    items[0]['h'] = name.textContent || name.innerText;
    items[0]['a'] = summary.textContent || summary.innerText;
    items[0]['i'] = icon.textContent || icon.innerText;
    items[0]['s'] = 'Firefox Add-ons';
    items[0]['u'] = url.textContent || url.innerText;
    items[0]['force_big_header'] = 1;
    items[0]["force_space_after"] = 1;
    nra(items);
}

var parseXml;

if (typeof window.DOMParser != "undefined") {
    parseXml = function(xmlStr) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "application/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" &&
           new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function(xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    throw new Error("No XML parser found");
}