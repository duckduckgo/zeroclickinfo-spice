function ddg_spice_apartable_city (api_result){
      if (api_result.error) {
          return Spice.failed('apartable_city');
      }


  Spice.add({
    id: 'spice_apartable_city',
    name: 'Apartable.com',
    data: api_result,
    templates: {
      group: 'info',
      item : Spice.npm.item,
    },
  });
};
