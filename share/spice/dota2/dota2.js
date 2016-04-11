(function (env) {
    "use strict";

    function getItemFromData(itemdata, itemName) {
        var item;
        if (itemdata[itemName]) {
            item = itemdata[itemName];
        } else {
            $.each(itemdata, function(index, value) {
                if (value.dname.toLowerCase() == itemName) {
                    item = value;
                }
            });
        }
        return item;
    }

    function getItemComponents(item, fullResult) {
        var components = [];
        if (item.components) {
            $.each(item.components, function(index, value) {
                var component = {
                    name: fullResult.itemdata[value].dname,
                    img: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/items/' + fullResult.itemdata[value].img),
                    searchTerms: fullResult.itemdata[value].dname.replace(" ", "+")
                };
                components.push(component);
            });
        }
        return components;
    }

    function getItemDisplayAssets() {
        return {
            gold: {
                image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/tooltips/gold.png'),
                title: 'Gold'
            }
        }
    }

    function createItemReturnObject(item, result) {
        return {
            isItem: true,
            name: item.dname,
            description: item.desc,
            cost: item.cost,
            notes: item.notes,
            attributes: item.attrib,
            components: getItemComponents(item, result),
            image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/items/' + item.img),
            assets: getItemDisplayAssets()
        };
    }

    function getHeroFromData(herodata, heroName) {
        var hero;
        if (herodata[heroName]) {
            hero = herodata[heroName];
            hero.heroKey = heroName;
        } else {
            $.each(herodata, function(index, value) {
                if (value.dname.toLowerCase() == heroName) {
                    hero = value;
                    hero.heroKey = index;
                }
            });
        }
        return hero;
    }

    function getHeroRoles(hero) {
        return hero.droles.replace(/ - /g, ', ');
    }

    function getHeroAbilities(hero, result) {
        var abilities = [];
        $.each(result.abilitydata, function(index, value) {
            if (index.indexOf(hero.heroKey) === 0) {
                abilities.push(
                    {
                        name: value.dname,
                        image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/abilities/' + index + '_hp1.png')
                    }
                );
            }
        });
        return abilities;
    }

    function getHeroDisplayAssets() {
        return {
            stats: {
                intelligence: {
                    image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_int.png'),
                    title: 'Intelligence'
                },
                agility: {
                    image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_agi.png'),
                    title: 'Agility'
                },
                strength: {
                    image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_str.png'),
                    title: 'Strength'
                },
                attack: {
                    image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_attack.png'),
                    title: 'Attack'
                },
                speed: {
                    image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_speed.png'),
                    title: 'Speed'
                },
                defense: {
                    image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heropedia/overviewicon_defense.png'),
                    title: 'Defense'
                },
            }
        }
    }

    function createHeroReturnObject(hero, result) {
        var primaryAttributes = {
            'int': 'Intelligence',
            'str': 'Strength',
            'agi': 'Agility'
        };

        return {
            isHero: true,
            name: hero.dname,
            image: DDG.getImageProxyURL('http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.heroKey + '_vert.jpg'),
            attackType: hero.dac,
            primaryAttribute: primaryAttributes[hero.pa],
            int: hero.attribs.int.b + ' + ' + hero.attribs.int.g,
            agi: hero.attribs.agi.b + ' + ' + hero.attribs.agi.g,
            str: hero.attribs.str.b + ' + ' + hero.attribs.str.g,
            attack: hero.attribs.dmg.min + ' - ' + hero.attribs.dmg.max,
            speed: hero.attribs.ms,
            defense: hero.attribs.armor,
            roles: getHeroRoles(hero),
            abilities: getHeroAbilities(hero, result),
            assets: getHeroDisplayAssets()
        };
    }

    env.ddg_spice_dota2 = function(api_result){

        if (api_result.error) {
            return Spice.failed('dota2');
        }

        var searchTarget = DDG.get_query().replace(/dota\s?2/, "").trim().toLowerCase();
        var returnData;
        var item = getItemFromData(api_result.itemdata, searchTarget);
        var sourceUrl;
        var template;
        if (typeof item !== 'undefined') {
            returnData = createItemReturnObject(item, api_result);
            sourceUrl = 'https://www.dota2.com/items/';
            template = {
                group: 'base',
                item: false,
                options: {
                    content: Spice.dota2.dota2_item
                }
            };
        } else {
            var hero = getHeroFromData(api_result.herodata, searchTarget);
            if (typeof hero !== 'undefined') {
                returnData = createHeroReturnObject(hero, api_result);
            }
            sourceUrl = 'https://www.dota2.com/hero/' + hero.dname.replace(" ", "_");
            template = {
                group: 'base',
                detail: false,
                item_detail: false,
                variants: {
                    tile: 'xwide'
                },
                options: {
                    content: Spice.dota2.dota2_hero,
                    moreAt: true
                }
            };
        }

        Spice.add({
            id: "dota2",
            name: "Games",
            data: returnData,
            meta: {
                sourceName: "dota2.com",
                sourceUrl: sourceUrl
            },
            templates: template
        });
    };
}(this));
