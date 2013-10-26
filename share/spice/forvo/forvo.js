nrj("soundmanager2/script/soundmanager2-nodebug-jsmin.js", true);

function ddg_spice_forvo (api_result) {
    "use strict";

    if (api_result.attributes.total < 1) return;

    // Display the Spice plug-in.
    Spice.render({
        data             : api_result,
        header1          : "Pronunciations (Forvo)",
        source_url       : "http://www.forvo.com/",
        source_name      : "Forvo",
        spice_name       : "forvo",
        template_frame   : "list",
        template_options : {
            items         : api_result.items, //list,
            template_item : "forvo",
            show          : 3,
            max           : 5,
            type          : "ul",
	    use_alternate_template: false
        },
        force_big_header : true,
        force_no_fold    : true
    });



    // This gets called when the sound is finished playing
    // or when another player is playing. It basically just resets the look of the player.
    var clearPlayer = function() {
        var li = $(".spice2list_item");
        li.removeClass("sm2_playing");
        li.removeClass("sm2_paused");
        li.addClass("sm2_stopped");
        soundManager.stopAll();
    };

    // Loads and plays the audio file.
    var isFailed = false;
    var playSound = function(anchor) {
        soundManager.stopAll();

        if(isFailed) {
            setTimeout(function() {
                clearPlayer();
            }, 1000);
        } else {
            var sound = soundManager.createSound({
                id: anchor.attr("id"),
                url: anchor.data("stream"),
                onfinish: function() {
                    clearPlayer();
                }
            });

            sound.play();
        }
    };

    // Initialize SoundManager2.
    window.SM2_DEFER = true;
    var isLoaded = false;
    var isLoading = false;
    var soundSetup = function(anchor) {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.ontimeout(function() {
            isFailed = true;
            isLoaded = true;
            clearPlayer();
        })
        soundManager.onready(function() {
            playSound(anchor);
            isLoaded = true;
        });
    };

    // This controls our player.
    var last_id;
    ddg_spice_forvo.player = function() {
        var li = $(this);
        var anchor = li.find("a.forvo-audio");

        // Get the sound
        var current_id = anchor.attr("id");

        var sound;

        // Make sure only one player is playing at any one time.
        if(!last_id) {
            last_id = current_id;
        } else if(last_id !== current_id) {
            last_id = current_id;
            clearPlayer();
        }

        // Check if it is already playing.
        // If it is, pause it.
        if(li.hasClass("sm2_playing") && isLoaded) {
            li.removeClass("sm2_playing");
            li.removeClass("sm2_stopped");
            li.addClass("sm2_paused");

            sound = soundManager.getSoundById(current_id);
            sound.pause();
        // If it's not playing, it's probably paused.
        // Let's play it.
        } else if(li.hasClass("sm2_paused")){
            li.removeClass("sm2_playing");
            li.removeClass("sm2_paused");
            li.addClass("sm2_playing");

            sound = soundManager.getSoundById(current_id);
            sound.resume();
        // If it's neither paused nor playing, we should load the audio and play it.
        } else {
            // Load SoundManager2 if it hasn't already.
            if(!isLoaded && !isLoading) {
                isLoading = true;
                soundSetup(anchor);
            // If SoundManager already loaded, we should just play the sound.
            } else if(isLoaded) {
                playSound(anchor);
            }

            li.removeClass("sm2_playing");
            li.removeClass("sm2_stopped");
            li.addClass("sm2_playing");
        }
    };

    $(document).ready(function() {
    $(".spice2list_item").click(ddg_spice_forvo.player);
    // $(".spice2list_item").attr("class", "sm2_stopped");
    $(".spice2list_item").addClass("sm2_stopped");
    });
};


// The sex (returned as either "m" or "f") should be expanded.
Handlebars.registerHelper("forvo_sex", function(sex) {
    "use strict";

    if(sex === "m")
        return "Male";

    return "Female";
});

