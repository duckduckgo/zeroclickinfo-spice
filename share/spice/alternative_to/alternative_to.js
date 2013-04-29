function ddg_spice_alternative_to(api_result) {
    Spice.render({
        data           : api_result,
        source_name    : 'AlternativeTo',
        source_url     : api_result.Url,
        template_normal: "alternative_to",
        template_frame : "carousel",
        carousel_css_id: "alternative_to",
        carousel_items : api_result.Items,
        force_no_fold  : 1
    });
}

