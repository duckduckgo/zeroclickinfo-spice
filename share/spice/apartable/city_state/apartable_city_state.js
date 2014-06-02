(function(env){
  "use strict";

  env.ddg_spice_apartable_city_state = function (api_result){

      if (api_result.error) {
          return Spice.failed('apartable_city_state');
      }


  Spice.add({
    id: 'apartable_city_state',
    name: 'Apartable.com',
    meta: {
      sourceName: "Apartable",
      sourceUrl: "https://apartable.com",
      itemType: "Apartments"
    },
    data: api_result,
    normalize: function(item){
      return {
        img   : item.main_thumbnail_url,
        heading : item.short_address,
        price : '$' + item.price,
        url   :  'http://apartable.com/apartments/'+item.id
      }
    },
    templates: {
      group: 'products',
      detail: false,
      item_detail: false,
      options     : {
        rating  : false,
        ratingText: false
      }
    }
  });
};
}(this));
