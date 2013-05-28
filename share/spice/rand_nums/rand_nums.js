function ddg_spice_rand_nums(api_result) {

    console.log(api_result);

    var min;
    var max;

    // Get the original query.
    // We're going to pass this to the header.
    var query = "";
    $("script").each(function() {
        var matched, result;
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/rand_nums\/([^\/]+)\/(.+)/);
            if(result) {
                min = result[1];
                max = result[2];
            }
        }
    });

    min = min || 0;
    max = max || 100;

    Spice.render({
        data             : api_result,
        source_url       : 'http://www.random.org/integers/?num=100&min='
                            + min + '&max=' + max + '&col=5&base=10&format=html&rnd=new',
        source_name      : 'Random.org',
        template_normal  : 'rand_nums',
    });
}
