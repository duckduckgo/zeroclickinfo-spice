(function (env) {
    "use strict";

    env.ddg_spice_nutrition = function(api_result) {
        
        // checks to make sure that there is an api response, it's error free 
        // and contains items to parse.
        if (!api_result || api_result.error || api_result.foods < 1) {
            return Spice.failed('nutrition');
        }
        
        var api_data = api_result.foods;
        
        // the global data object pushed to the front end
        var data = {
            calories: 0,
            foods: []
        };
        
        // this function generates the data structure that is pushed to the
        // front-end
        function generateData() {
       
            for(var i = 0 ; i < api_data.length ; i++) {
                data.calories += api_data[i].nf_calories;
                data.foods.push(api_data[i]);
            } 
            
            return data;
        } // generateData
        
        function generateSubtitle() {
            var subtitle = "Calories in ";
            var foods_length = data.foods.length;
          
            if( foods_length === 1 ) {
                subtitle += data.foods[0].serving_qty + " " + data.foods[0].food_name;
            } else {
                for( var i = 0 ; i < foods_length ; i++ ) {
                    if(i === foods_length - 1) {
                        subtitle += "and " + data.foods[i].serving_qty + " " + data.foods[i].food_name;
                    } else {
                        subtitle += data.foods[i].serving_qty + " " + data.foods[i].food_name + ", ";                    
                    }
                } // for
            } // if
            
            return subtitle;
        }// generateSubtitle
        
        Spice.add({
            id: 'nutrition',
            name: 'Nutrition',
            data: generateData(),
            meta: {
                sourceName: 'Nutritionix',
                sourceUrl: 'https://www.nutritionix.com/natural-demo?q=' + DDG.get_query()
            },
            normalize: function(item) {
                return {
                    title: item.calories,
                    subtitle: generateSubtitle()
                };
            },
           templates: {
                group: 'text',
                options: {
                    content: Spice.nutrition.content,
                    moreAt: true
                }
            },
        });
        
    };
}(this));