Currently there's no straightforward way to share assets between submodules, so some code in this IA (specifically the Handlebars template, the CSS file and the normalize method) is duplicated across four submodules.

If you're adding changes to one of these, don't forget it might need to be done for all four of them!
