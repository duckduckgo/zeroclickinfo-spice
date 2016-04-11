# Contributing an Instant Answer to DuckDuckGo.com

## Learn How to Build Spice Instant Answers

Learn to make an Instant Answer by starting with our walkthrough: **[Build an API-based lookup](http://docs.duckduckhack.com/walkthroughs/forum-lookup.html)**

You can find the full [DuckDuckHack documentation here](http://docs.duckduckhack.com).

## Improve a Live Instant Answer

We welcome new contributors to dive in and improve live Instant Answers. It's a great, hands-on way to learn how things work. Start by [setting up your development environment](http://docs.duckduckhack.com/welcome/setup-dev-environment.html).

Have a [favorite Instant Answer](http://duck.co/ia) that you want to make even better? Feel free to dive in and make changes.

You can see all "low-hanging fruit" issues neatly organized in one place on our [Live Issues Page](https://duck.co/ia/dev/issues?tag=lowhangingfruit), or get an overview of all [Instant Answers in development](https://duck.co/ia/dev/pipeline).

## Go Live on DuckDuckGo.com

The final step is to have your contribution appear on DuckDuckGo.com above ads and organic links, on [millions of searches](https://duckduckgo.com/traffic.html).

1. **[Create an Instant Answer Page](https://duck.co/ia/new_ia) as the home base for your idea.** If you're fixing an existing Instant Answer, [locate its existing page](https://duck.co/ia). 

	This page will be the center for feedback, Github issues, attribution, deployment, and collaboration.

2. **Make sure your contribution meets the [Production Guidelines](http://docs.duckduckhack.com/submitting/checklist.html).**

3. **[Submit a pull request](http://docs.duckduckhack.com/submitting/pull-request.html).** 

We're excited to meet you and support you along the way - and it's never too early to say hello. Join us on [Slack](https://quackslack.herokuapp.com) or [email](mailto:open@duckduckgo.com). 

## Formatting Your Pull Request

When submitting a pull request, the following guidelines help speed up the review process:

### New Instant Answers

1. New IAs should be titled as follows: **`New {IA TOPIC} {IA TYPE}`**. For example, `New Instagram Spice` or `New Firefox Cheat Sheet`

2. Paste the relevant [Instant Answer Page URL](https://duck.co/ia/new_ia) in the description field. This will automatically link the PR to the Instant Answer.
	
### Improvements

1. Fixes should be titled as follows: **`{IA NAME}: Brief explanation`**. For example: `PeopleInSpace: Use smaller local image, fallback to API when needed.`

2. Paste the relevant [Instant Answer Page URL](https://duck.co/ia/new_ia) in the description field. This will automatically link the PR to the Instant Answer.

3. Include the issue number in the description (conveniently, this will automatically resolve the issue upon merging). Describe your motivation, thought process, and solution in the description. For example:

	"**Fixes #2038.** The images used by the API are very large and don't change often. I've but a smaller version of each image (and a 2x version for retina screens) in the share directory. The callback will try and load a local image based on the astronauts name and fallback to using the API's image if one does not exist."

> **IMPORTANT:** Don't worry if you get an initial error regarding failing Travis tests. The reason is that your IA page hasn't yet been moved out of the "Planning" status - which only community leaders/staff can do. As long as the ID in your IA page matches the ID in your code, and you've pasted the URL to your IA page, you can ignore this initial error.
	
