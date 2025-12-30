# Intro

So you want to make games and put them online? You can either A.) Use a game engine that has a functioning export to web and be mindful of all its caveats or B.) Dive neck deep into the bog that is JavaScript, the slightly cursed native tongue of the web.

Or C.) Just use HTML and CSS? Perhaps by the end of this blog series, that will actually be possible!

What's that? <button popovertarget="test" popovertargetaction="show">Why are you giving me that look?</button>

<div id="test" popover>
    You think <a href="https://media.ccc.de/v/39c3-css-clicker-training-making-games-in-a-styling-language#t=2391">HTML and CSS are not programming languages</a>??
</div>

## First steps

Someone once said [games are a series of interesting decisions](https://www.gamedeveloper.com/design/gdc-2012-sid-meier-on-how-to-see-games-as-sets-of-interesting-decisions). In order for there to be any of that, we'll need a way to get input from the player. But don't worry, I'll write the JavaScript for you, and let you know what the player did via CSS. That way, you can write CSS like:

```CSS
.key-w-pressed.key-i-pressed.key-n-pressed {
    background-color: red;
}
```

<style>
.key-w-pressed.key-i-pressed.key-n-pressed {
    background-color: red;
}
</style>

Now hold down "w", "i" and "n" on the keyboard and, with any luck, we'll see the background color of this page change. Wow! By the way, you can press them in any order! You might have a harder time if you decided to view this on a device without a keyboard, press the caps lock or shift key, disable JavaScript, etc.

One cool thing about this approach compared to the standard JavaScript approach is that it's automatically quite [debuggable](https://en.wikipedia.org/wiki/Debugging) without needing to modify the code. Right click anywhere on the page and select "Inspect" to open your browser's developer tools, then click back on the page itself to restore focus. You should now be able to see stuff changing as you press keys. Trying playing around with it. Correlating what's happening in the HTML element inspector with what's happening on the page itself can be quite elucidating.

This is perhaps not the most interesting game, but it's a start!

Next, [we'll really get moving](moving)!
