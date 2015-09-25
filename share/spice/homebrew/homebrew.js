(function (env) {
    "use strict";
    env.ddg_spice_homebrew = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('homebrew');
        }

        Spice.add({
            id: "homebrew",
            name: "Formula",
            data: api_result,
            meta: {
                sourceName: "Homebrew Formulas",
                sourceUrl: 'http://brewformulas.org/' + api_result.formula
            },
            normalize: function(item) {
                var boxData = [{heading: 'Formula Information:'}];

                if (item.homepage) {
                    boxData.push({
                        label: "Homepage",
                        value: item.homepage,
                        url: item.homepage
                    });
                }

                if (item.version) {
                    boxData.push({
                        label: "Version",
                        value: item.version
                    })
                }


                if (item.dependencies) {
                    if (item.dependencies.length > 0) {
                        boxData.push({
                            label: "Dependencies",
                            value: item.dependencies.join(", ").toLowerCase()
                        });
                    }
                }

                if (item.dependents) {
                    if (item.dependents.length > 0) {
                        boxData.push({
                            label: "Dependents",
                            value: item.dependents.join(", ").toLowerCase()
                        });
                    }
                }

                if (item.reference) {
                    boxData.push({
                        label: "Reference",
                        value: item.reference
                    })
                }

                return {
                    title: item.formula,
                    subtitle: item.description,
                    infoboxData: boxData
                }
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.homebrew.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
