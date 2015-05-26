Asset loading effects
=====================

This is a library to show the loading progress of given assets and reveal them using various animations. Please give feedback, report bugs, and propose new loader ideas!

[Read about how it was made]()

#### Effect demos:
- [Circular]()
- [Sqare]()
- [Linear with shadow]()
- [Linear]()
- [Diagonal]()
- [Fill]()
- [Corner]()

## How to use:

1. Include the necessary files. Right now that means you need to include the 3 required JS files and the CSS
2. Apply the `.ale` class to all elements you want to use a loading effect on.
3. Declare the loader type using `data-ale-type`
4. Declare the source(s) for the element using `data-ale-src`. For a secondary (backup) source, use `data-ale-src-backup`.
5. If it's a video, also declare `data-ale-is-vid=true`.

Image example:

    &lt;div class="ale" data-ale-type="diagonal" data-ale-src="/img/url.jpg"&gt;

Video example:

	&lt;div class="ale" data-ale-type="diagonal" data-ale-src="/vid/vidFile.mp4" data-ale-src-backup="/vid/backupVidFile.mpeg" data-ale-is-vid=true&gt;


___

Follow me: [Twitter](http://www.twitter.com/codrops), [CodePen](http://codepen.io/Zeaklous), [GitHub](https://github.com/ZachSaucier)
