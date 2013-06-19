#ZeroClickInfo Spice - Developer Checklist

*Before* making you pull request, please go over this checklist to make sure your plugin is ready for us to look at and hopefully to be deployed live!

- [ ] Did you add the Spice metadata to the .pm file(s)?
- [ ] Did you write a test file? (It should go in the t/ directory)
- [ ] Did you write any custom css?
    - [ ] If so, did you namespace the css? (ever plugin has a div with id="spice_<template_name>", use that to target your styles so you don't overwrite any global styles)
- [ ] Can this plugin return unsafe content (bad words, etc)
    - [ ] Did you set `is_unsafe` to true?