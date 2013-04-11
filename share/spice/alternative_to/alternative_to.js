function ddg_spice_alternative_to(api_result) 
{
    Spice.render({
        data           : api_result,
        source_name    : 'AlternativeTo',
        source_url     : api_result['Url'],
        template_normal: "alternative_to"
    });
}

