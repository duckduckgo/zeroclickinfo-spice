(function (env) {
    "use strict";
    env.ddg_spice_medicine = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('medicine');
        }
        
        console.log("results: "+api_result);
        api_result.results.forEach(function(item){
            console.log(item);
        });

        // Render the response
        Spice.add({
            id: "medicine",

            name: "Medicine",
            data: api_result.results,
            meta: {
                sourceName: "myHealthbox",
                sourceUrl: 'https://www.myhealthbox.eu/en/search.php?s='+DDG.get_query()
                +'&adv=false&filter_principio_attivo=&filter_produttore=&filter_country='
                +'&filter_language=&filter_medicine_type=&nome_prodotto=&codice_prodotto=&codice_ATC='
                +'&principio_attivo=&produttore=&indicazioni_terapeutiche=&search_country=&search_lang=&search_med_type='
            },
            normalize: function(item) {
                return {
                    title: item.medicineName,
                    activeIngredient: item.active_ingredient,
                    manufacturer: item.mah,
                    dosage: item.dosage,
                    pharmaceuticalForm: item.pharmaceutical_form,
                    url: 'http://test.myhealthbox.eu/'+item.languageCode+'/medicine/'+ item.medicineId
                };
            },
            templates: {
                group: 'base',
                //item: 'base_item',
                //detail: false,
                //item_detail: false
                //item_detail: false,
                options: {
                    content: Spice.medicine.medicine
                    //variant: 'wide'
                }
            }
        });
    };
}(this));
