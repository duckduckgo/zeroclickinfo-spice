(function(env){
  "use strict";

  env.ddg_spice_apartable_city = function (api_result){
      if (api_result.error) {
          return Spice.failed('apartable_city');
      }


  Spice.add({
    id: 'apartable_city',
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
      options     : {
        rating  : false,
        ratingText: false
      }
    }
  });
};

}(this));
