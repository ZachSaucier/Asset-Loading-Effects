Asset loading effects
=====================

This is a library to show the loading progress of given assets and reveal them using various animations. Please give feedback, report bugs, and propose new loader ideas!

[Read about how it was made](https://zachsaucier.com/blog/asset-loading-effects/)

![Asset loading effects](https://github.com/user-attachments/assets/24b81f4a-70b9-4bd2-a3ab-f38e9e403724)


#### Effect demos:
- [Circular](https://zachsaucier.github.io/Asset-Loading-Effects/)
- [Sqare](https://zachsaucier.github.io/Asset-Loading-Effects/index2.html)
- [Linear with shadow](https://zachsaucier.github.io/Asset-Loading-Effects/index3.html) (Demos a video being loaded)
- [Linear](https://zachsaucier.github.io/Asset-Loading-Effects/index4.html)
- [Diagonal](https://zachsaucier.github.io/Asset-Loading-Effects/index5.html)
- [Fill](https://zachsaucier.github.io/Asset-Loading-Effects/index6.html)
- [Corner](https://zachsaucier.github.io/Asset-Loading-Effects/index7.html)

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

Please feel free to make and add your own effects and remove effects you're not using in your project! I'd love to hear suggestions for other loading effects. Understanding [how it's made](https://zachsaucier.com/blog/asset-loading-effects/) will help you if you're seeking to make your own effects.

___

## Support

Did you find this repo useful? I'd really appreciate it if you would consider buying me a coffee!

<a href="https://www.buymeacoffee.com/zachsaucier" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
