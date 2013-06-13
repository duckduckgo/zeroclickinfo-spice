function ddg_spice_game_info(api_result) {
    if (api_result == null || api_result['status'] != 'OK') return;

    Spice.render({
        data                     : api_result,
        image_url                : api_result.image,
        header1                  : api_result.name + ' (Games)',
        source_url               : api_result.link,
        source_name              : 'TheFreeGamesDB',
        template_normal          : 'game_info',
        force_no_favicon         : true
    });
}
