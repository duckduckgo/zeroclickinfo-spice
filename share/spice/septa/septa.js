function ddg_spice_septa(api_result) {
    console.log("SEPTA");
    console.log(api_result);

    Spice.render({
        data              : api_result,
        header1           : 'SEPTA',
        force_big_header  : true,
        source_name       : 'www.septa.org',
        source_url        : 'www.septa.org',
        template_normal   : 'septa'
    });
};
