[![Build Status](https://travis-ci.org/duckduckgo/zeroclickinfo-spice.svg?branch=master)](https://travis-ci.org/duckduckgo/zeroclickinfo-spice)

# Welcome to DuckDuckHack!
We're a community of open source developers from around the world, contributing code to improve the DuckDuckGo search engine.


### The Programming Mission
We want every programming search to have great results, providing the information you need instantly. The Programming Mission empowers the community to create Instant Answers for reference, libraries, help, and tools.

For now, we are **only accepting Pull Requests and Issues related to the Programming Mission**.


## How to contribute
- [**Create new Spice Instant Answers, and improve existing ones**](https://github.com/duckduckgo/zeroclickinfo-spice/issues?q=is%3Aopen+is%3Aissue+label%3A"Mission%3A+Programming")
    - **Note**: Spices are written in Perl (back-end) and JavaScript (front-end). They can also typically use CSS, and [Handlebars](http://handlebarsjs.com) Templates.
- [**Visit our Forum**](https://forum.duckduckhack.com/t/duckduckhack-getting-started/53) to learn more about the Programming Mission, and how you can help us **analyze Instant Answer performance data** to determine new projects


### What are Spice Instant Answers?
Spices retrieve data from third-party JSON APIs. An API call is generated at the time of the query, and the JSON data returned is used to build an Instant Answer result on the front-end.


#### Example: NPM Spice
- [Code](https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Npm.pm) | [Example Query](https://duckduckgo.com/?q=npm+express.js&t=opera&ia=software) | [Instant Answer Page](https://duck.co/ia/view/npm)

![npm expressjs search](https://cloud.githubusercontent.com/assets/873785/20064623/515e8b04-a4d9-11e6-84d9-66ffa2a5d6d2.png)


## Resources
- Join the [DuckDuckHack Slack channel](https://quackslack.herokuapp.com/) to ask questions
- Join the [DuckDuckHack Forum](https://forum.duckduckhack.com/) to discuss project planning and Instant Answer metrics
- Read the [Spice documentation](https://docs.duckduckhack.com/walkthroughs/forum-lookup.html) for technical help
- View the list of [all live Spice Instant Answers](https://duck.co/ia?repo=spice&topic=programming) to see more examples
