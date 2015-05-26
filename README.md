Asset loading effects
=====================

This is a library to show the loading progress of given assets and reveal them using various animations. Please give feedback, report bugs, and propose new loader ideas!

[Read about how it was made](http://zachsaucier.com/blog/blog/2015/05/26/definition-vs-description/)

#### Effect demos:
- [Circular](http://zachsaucier.github.io/Asset-Loading-Effects/)
- [Sqare](http://zachsaucier.github.io/Asset-Loading-Effects/index2.html)
- [Linear with shadow](http://zachsaucier.github.io/Asset-Loading-Effects/index3.html)
- [Linear](http://zachsaucier.github.io/Asset-Loading-Effects/index4.html)
- [Diagonal](http://zachsaucier.github.io/Asset-Loading-Effects/index5.html)
- [Fill](http://zachsaucier.github.io/Asset-Loading-Effects/index6.html)
- [Corner](http://zachsaucier.github.io/Asset-Loading-Effects/index7.html)

## How to use:

1. Include the necessary files. Right now that means you need to include the 3 required JS files and the CSS
2. Apply the `.ale` class to all elements you want to use a loading effect on.
3. Declare the loader type using `data-ale-type`
4. Declare the source(s) for the element using `data-ale-src`. For a secondary (backup) source, use `data-ale-src-backup`.
5. If it's a video, also declare `data-ale-is-vid=true`.

Image example:

    <div class="ale" data-ale-type="diagonal" data-ale-src="/img/url.jpg">

Video example:

	<div class="ale" data-ale-type="diagonal" data-ale-src="/vid/vidFile.mp4" data-ale-src-backup="/vid/backupVidFile.mpeg" data-ale-is-vid=true>


___

Follow me: [Twitter](http://www.twitter.com/codrops), [CodePen](http://codepen.io/Zeaklous), [GitHub](https://github.com/ZachSaucier)
