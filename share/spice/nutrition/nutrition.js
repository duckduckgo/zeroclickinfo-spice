(function (env) {
    'use strict';
    env.ddg_spice_nutrition = function(api_result){

        if (!api_result || !api_result.hits || !api_result.hits.length) {
            return Spice.failed('nutrition');
        }

        var nutritionFnBound = false,

            fieldToTerms = {
                nf_calories_from_fat: ['calories from fat','cals from fat','fat calories'],
                nf_total_fat: ['fat'],
                nf_saturated_fat: [],
                nf_monounsaturated_fat: ['monounsaturated fat'],
                nf_polyunsaturated_fat: ['polyunsaturated fat'],
                nf_trans_fatty_acid: ['trans fat','trans-fat','trans fatty acid'],
                nf_cholesterol: ['cholesterol'],
                nf_sodium: ['sodium'],
                nf_total_carbohydrate: ['carbohydrates','carbs'],
                nf_dietary_fiber: ['fiber','dietary fiber'],
                nf_sugars: ['sugar'],
                nf_protein: ['protein'],
                nf_vitamin_a_dv: ['vitamin a'],
                nf_vitamin_c_dv: ['vitamin c'],
                nf_calcium_dv: ['calcium','ca'],
                nf_iron_dv: ['iron','fe'],
                nf_calories: ['calories','cals']
            },

            stripRegex1 = /^(how|what)?('s | is | are | many | much )?(the )?(total | amount of )?/,
            stripRegex2 = /^\s?(are | contained )?(there )?(in )?(a |an )?/,

            getMeasurementInfo = function(searchTerm){
                for (var field in fieldToTerms) {
                    var terms = fieldToTerms[field];
                    for (var i=0; i<terms.length; i++) {
                        var term = ' ' + terms[i] + ' ';
                        if (searchTerm.match(term)) {
                            return {
                                term: term,
                                // first term in array is canonical to show on UI:
                                name: terms[0],
                                id: field
                            };
                        }
                    }
                }

                return {};
            },

            // search term w/o any beginning text
            tmpTerm = DDG.get_query().replace(stripRegex1,'');

            measurementInfo = getMeasurementInfo(tmpTerm),

            // will hold the measurement name (i.e. calories)
            measurementName = measurementInfo.name,

            // the field id to find the amount in the api results:
            measurementId = measurementInfo.id;

        if (!measurementId) { return Spice.fail('nutrition'); }

       // figure out the food item (what should be left):
        var foodItem = tmpTerm.replace(measurementInfo.term,'').replace(stripRegex2, ''),

            portions = api_result.hits.map(function(item, idx){
                return {
                    id: idx,
                    name: item.item_name,
                    amount: item.fields[measurementId]
                }
            }),

            // dom refs that will get assigned onShow:
            $el, $amount, $portion,


        Spice.add({
            id: 'nutrition',
            name: 'Nutrition',
            data: {
                measurementName: measurementInfo.name,
                portitions: portitions.length > 1 && portitions,
                currentPortion: portitions[0]
            },
            meta: {
                sourceName: 'Nutritionix',
                sourceUrl: 'http://nutritionix.com/search?q=' + itemName
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.nutrition.content,
                    moreAt: true
                }
            },
            onShow: function() {
                // bind to the drop down (if not already bound)
                if (!$el && portions.length > 1) {
                    $el = Spice.getDOM('nutrition');
                    $amount $el.find('nutrition__amount');
                    $portion = $el.find('nutrition__portion__dropdown');

                    $portion.change(function(){
                        var portionId = $portion.val();
                        $amount.text(portions[portionId].amount);
                    });
                }
            }
        });
    };
}(this));
