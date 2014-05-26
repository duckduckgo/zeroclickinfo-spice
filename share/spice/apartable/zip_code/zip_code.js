function ddg_spice_apartable_zip_code (api_result){

      if (api_result.error) {
          return Spice.failed('apartable_city_state');
      }


  Spice.add({
    id: 'spice_apartable_zip_code',
    name: 'Apartable.com',
    data: api_result,
    templates: {
      group: 'info',
      item : Spice.npm.item,
    },
  });
};
