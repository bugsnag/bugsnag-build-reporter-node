# How to contribute

## Reporting issues

If you think you've spotted a problem with this module, feel free to open up a
[new issue](https://github.com/bugsnag/bugsnag-build-reporter-node/issues/new). There are a couple
of things you should check before doing so:

- Do you have the latest version of bugsnag-build-reporter? If not, does updating to the latest
version fix your issue?
- Has somebody else [already reported](https://github.com/bugsnag/bugsnag-build-reporter-node/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen) your issue? Feel free to comment or check-in on an existing issue that matches your own.
- Is your problem definitely to do with this module? For anything else, email [support@bugsnag.com](mailto:support@bugsnag.com).

## Fixing issues

If you've identified a fix to a new or existing issue, we welcome contributions!

- [Fork](https://help.github.com/articles/fork-a-repo) the [repo on github](https://github.com/bugsnag/bugsnag-build-reporter-node)
- Make your changes locally
- Ensure the changes pass tests (`npm test`)
- Commit and push your changes
- [Make a pull request](https://help.github.com/articles/using-pull-requests)
- Ensure CI passes (and if it fails, attempt to address the cause)

## Adding features

In general, feature additions will come from Bugsnag employees. If you think you have
a useful addition that doesn’t take long to create a pull request for, feel free
to go ahead and make it and strike up a discussion. With any non-trivial amount
of work, the best thing to do is [create an issue](https://github.com/bugsnag/bugsnag-build-reporter-node/issues/new)
in which to discuss the feature, for the following reasons:

- Bugsnag has an internal roadmap of things to work on. We might have already planned to
work on your suggested feature.
- We might disagree about whether the addition is worthwhile or not.
- We might agree that the addition is worthwhile but disagree with the implementation.

That said, we have had some tremendous contributions from the community in the past,
so use your best judgement. What we want to avoid here is anybody feeling like they’ve
wasted their time!

## Testing

Run `npm test` to execute the unit tests.

Note – you'll need to have Mercurial (`hg`) installed to execute them successfully