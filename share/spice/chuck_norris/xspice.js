function ddg_spice_chuck_norris(response) {
    if (response.type != 'success') return;

    Spice.render({
        data             : { 'chuck' : response.value.joke },
        source_url       : 'http://www.icndb.com',
        source_name      : 'Internet Chuck Norris Database',
        image            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/ChuckNorris200611292256.jpg/48px-ChuckNorris200611292256.jpg',
        template_normal  : 'chuck_norris',
        force_no_icon    : true
    });
}

