# Contributing to ZeroClickInfo-Spice

At DuckDuckGo, we truly appreciate our community members taking the time to contribute to our open-source repositores. In an effort to ensure contributions are easy for you to make and for us to manage, we have written some guidelines that we ask our contributors to follow so that we can handle pull requests in a timely manner with as little friction as possible.

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free)

If submitting a **bug** or **suggestion**:
* Check the ZeroClickInfo-Spice [issues](https://github.com/duckduckgo/zeroclickinfo-spice/issues) to see if an issue already exists for the given bug or suggestion
    * If one doesn't exist, create a GitHub issue in the ZeroClickInfo-Spice repository
        * Clearly describe the bug/improvemnt, including steps to reproduce when it is a bug
    * If one already exists, please add any aditional comments you have regarding the matter

If submitting a **pull request** (bugfix/addition):
* Fork the ZeroClickInfo-Spice repository on GitHub

## Making Changes

* Before making and changes, refer to the **ZeroClickInfo Plugin [Guidelines](#)** to assure your changes are made in the correct fashion
* Make sure your commits are of a reasonable size. They shouldn't be too big (or too small)
* Make sure your commit messages effectively explain what changes have been made, and please identify which plugin or file has been modified:

    ```
    AlternativeTo - removed CSS file, fixed <li> height in Spice.render()
    ```

    is much better than:

    ```
    fixed AlternativeTo plugin
    ```

* Make sure you have added the necessary tests for your changes. Consider all edge cases and make sure they are handled correctly
    * Examples can be found in the t/ directory
    * Exhasutive tests are always appreciated!
* Run `dzil test` (executes all tests in t/) to assure nothing else was accidentally broken.

## Submitting Changes

* Push your changes to your fork of the repository
* Submit a pull request to the ZeroClickInfo-Spice repository
    * Make sure to use the ZeroClickInfo-Spice repository's [Pull Request Template](/Pull_Request_Template.md)