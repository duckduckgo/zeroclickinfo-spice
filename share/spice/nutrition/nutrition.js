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

            script = $('[src*="/js/spice/nutrition/"]')[0],
            source = $(script).attr('src'),
            matches = source.match(/nutrition\/([^\/]+)\/?(.*)/),
            foodItem = decodeURIComponent(matches[1]),

            stripRegex = /^(how|what)?('s | is | are | many | much )?(the )?(total | amount of )?/,

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
            tmpTerm = DDG.get_query().toLowerCase().replace(stripRegex, ''),

            measurementInfo = getMeasurementInfo(tmpTerm);

        if (!measurementInfo || !foodItem) { return Spice.failed('nutrition'); }

        // figure out the food item (what should be left):
        var portions = [],

            // dom refs that will get assigned onShow:
            boundToDropDown, $amount, $portion;

        for (var i=0; i<api_result.hits.length; i++) {
            var item = api_result.hits[i].fields,
                regex = new RegExp(foodItem, 'i');

            if (DDG.stringsRelevant(item.item_name, foodItem, [], 3) && regex.test(item.item_name)) {

                // if there's already portitions in the array, and the item isn't
                // found until after the first comma, don't show it.
                // This handles cases where things like "Baby Food, banana flavored" come back
                // from the api when searching for just "banana".
                if (portions.length) {
                    var splitPortionName = item.item_name.split(','),
                        firstStr = splitPortionName[0];

                    if (!regex.test(firstStr)) {
                        continue;
                    }
                }

                portions.push({
                    id: portions.length,
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
                if (!boundToDropDown && portions.length > 1) {
                    var $el = Spice.getDOM('nutrition');

                    $amount = $el.find('.nutrition__amount');
                    $portion = $el.find('.nutrition__portion__dropdown');

                    $portion.change(function() {
                        var portionId = $portion.val();
                        $amount.text(portions[portionId].amount + (measurementInfo.uom || ''));
                    });

                    boundToDropDown = true;
                }
            }
        });
    };
}(this));
