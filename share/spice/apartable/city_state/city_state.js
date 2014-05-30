(function(env){
  "use strict";

  env.ddg_spice_apartable_city_state = function (api_result){

      if (api_result.error) {
          return Spice.failed('apartable_city_state');
      }


  Spice.add({
    id: 'spice_apartable_city_state',
    name: 'Apartable.com',
    data: api_result,
    templates: {
      group: 'info',
      item : Spice.npm.item,
    },
  });
};
}(this));
