function ddg_spice_$ia_name (api_result) {
    "use strict";
    // Display the Spice plugin.
    // Verify api_result contains result
    if (!api.result.length) return;

    // Render spice instant answe
    Spice.render({
	//define Spice.render properties here:
	header1 : "Header text"
	source_name : "Source for More at link"
   });
};

