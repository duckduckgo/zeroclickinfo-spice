(function (env) {
    'use strict';
    env.ddg_spice_nutrition = function(api_result) {

        if (!api_result || !api_result.hits || !api_result.hits.length) {
            return Spice.failed('nutrition');
        }

        var fieldToTerms = {
                nf_calories: { terms: ['calories','cals'], label: 'Calories' },
                nf_calories_from_fat: { terms: ['calories from fat','cals from fat','fat calories'], label: 'Calories' },
                nf_total_fat: { terms: ['fat'], uom: 'g' },
                nf_saturated_fat: { terms: ['saturated fat'], uom: 'g' },
                nf_monounsaturated_fat: { terms: ['monounsaturated fat'], uom: 'g' },
                nf_polyunsaturated_fat: { terms: ['polyunsaturated fat'], uom: 'g' },
                nf_trans_fatty_acid: { terms: ['trans fat','trans-fat','trans fatty acid'], uom: 'g' },
                nf_cholesterol: { terms: ['cholesterol'], uom: 'mg' },
                nf_sodium: { terms: ['sodium'], uom: 'mg' },
                nf_total_carbohydrate: { terms: ['carbohydrates','carbs'], uom: 'g' },
                nf_dietary_fiber: { terms: ['fiber','dietary fiber'], uom: 'g' },
                nf_sugars: { terms: ['sugar'], uom: 'g' },
                nf_protein: { terms: ['protein'], uom: 'g' },
                nf_vitamin_a_dv: { terms: ['vitamin a'], uom: '%', label:'Daily Value' },
                nf_vitamin_c_dv: { terms: ['vitamin c'], uom: '%', label: 'Daily Value' },
                nf_calcium_dv: { terms: ['calcium'], uom: '%', label: 'Daily Value' },
                nf_iron_dv: { terms: ['iron'], uom: '%', label: 'Daily Value' }
            },

			skipWords = ['calories', 'saturated', 'vitamin', 'calcium', 'fiber', 'carbs', 'carbohydrates', 'monounsaturated', 'polyunsaturated', 'sodium', 'protein', 'sugar', 'fatty', 'trans', 'trans-fat'],

            stripRegex1 = /^(how|what)?('s | is | are | many | much )?(the )?(total | amount of )?/,
            stripRegex2 = /^\s?(are | contained )?(there )?(in )?(a |an )?/,

            getMeasurementInfo = function(searchTerm) {
                var field, fieldInfo, term, i, bestMatch;
                for (field in fieldToTerms) {
                    fieldInfo = fieldToTerms[field];
                    for (i = 0; i < fieldInfo.terms.length; i++) {
                        term = fieldInfo.terms[i];
                        if (searchTerm.match(term) && (!bestMatch || bestMatch.term.length < term.length)) {
                            bestMatch = {
                                term: term,
                                uom: fieldInfo.uom,
								label: fieldInfo.label,
                                id: field
                            };
                        }
                    }
                }

                return bestMatch;
            },

            // search term w/o any beginning text
            tmpTerm = DDG.get_query().toLowerCase().replace(stripRegex1, ''),

            measurementInfo = getMeasurementInfo(tmpTerm);

        if (!measurementInfo) { return Spice.failed('nutrition'); }

       // figure out the food item (what should be left):
        var foodItem = tmpTerm.replace(measurementInfo.term, '').replace(stripRegex2, ''),

            portions = [],

            // dom refs that will get assigned onShow:
            $el, $amount, $portion;

        for (var i=0; i<api_result.hits.length; i++) {
            var item = api_result.hits[i].fields;

			if (DDG.isRelevant(item.item_name, skipWords)) {
				portions.push({
					id: i,
					name: item.item_name,
					amount: item[measurementInfo.id]
				});
			}
        };

		// if no portions are relevant, then bail:
		if (!portions.length) { return Spice.failed('nutrition'); }

        Spice.add({
            id: 'nutrition',
            name: 'Nutrition',
            data: {
                uom: measurementInfo.uom,
				label: measurementInfo.label,
                portions: portions.length > 1 && portions,
                currentPortion: portions[0]
            },
            meta: {
                sourceName: 'Nutritionix',
                sourceUrl: 'http://nutritionix.com/search?q=' + foodItem
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
                    $amount = $el.find('.nutrition__amount');
                    $portion = $el.find('.nutrition__portion__dropdown');

                    $portion.change(function() {
                        var portionId = $portion.val();
                        $amount.text(portions[portionId].amount + (measurementInfo.uom || ''));
                    });
                }
            }
        });
    };
}(this));
