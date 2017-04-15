(function() {

  window.ddg_spice_enervee = function(api_result) {
    if (api_result && api_result.id) {
      return Spice.render({
        force_big_header: true,
        header1: "" + api_result.name + " " + api_result.category_name,
        source_name: "Enervee",
        source_url: api_result.url,
        template_normal: 'enervee',
        data: {
          electricity: (parseFloat(api_result.energy_cost) * 5).toFixed(2),
          score: api_result.score,
          source_url: api_result.url,
          category_url: api_result.cateogry_url,
          category_name: api_result.category_name
        }
      });
    }
  };

}).call(this);
