function ddg_spice_smbc(response) {
    var smbc       = {};
    smbc.img_url   = response.items[0].image_url;
    smbc.alt_text  = response.items[0].alt_text;
    smbc.prev_url  = response.items[1].link;

    Spice.render({
        data             : smbc,
        header1          : response.items[0].title,
        source_url       : response.link,
        source_name      : 'SMBC',
        template_normal  : 'smbc',
        force_big_header : true
    });
}
