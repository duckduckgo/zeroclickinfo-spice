function ddg_spice_alternative_to(api_result) 
{
    console.log("alternative_to xspice()");

    Spice.render({
        data           : api_result,
        source_name    : 'AlternativeTo',
        source_url     : api_result['Url'],
        template_normal: "alternative_to"
    });
}

