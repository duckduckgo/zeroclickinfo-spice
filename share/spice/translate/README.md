#Translate Plugin Directory Explanation

Due to the nature of the of Translate plugin, both the Detect and Detect_Phrase callback functions are reliant on the From_To and From_To_Phrase (respectively) callbacks which also require their respective Handlebars templates to properly display their results.

In order to prevent duplicate code and to allow sharing of the javascript and handlebars temaplates, the files are placed in the translate/ directory wich causes them to be automatically included when any of the Detect or From_To callbacks are used.

For more information about the use of commons scripts and templates, please refer to the Spice documentation.