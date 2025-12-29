# Intro

So you want to make games and put them online? You can either A.) Use a game engine that has a functioning export to web and be mindful of all its caveats or B.) Dive neck deep into the bog that is JavaScript, the slightly cursed native tongue of the web.

Or C.) Just use HTML and CSS? Perhaps by the end of this blog series, that will actually be possible!

## First steps

Someone once said [games are a series of interesting decisions](https://www.gamedeveloper.com/design/gdc-2012-sid-meier-on-how-to-see-games-as-sets-of-interesting-decisions). In order for there to be any of that, we'll need a way to get input from the player. But don't worry, I'll write the JavaScript for you, and let you know what the player did via CSS. That way, you can write CSS like:

```CSS
.key-w-pressed {
    background-color: red;
}
```

<style>
.key-w-pressed {
    background-color: red;
}
</style>

And with any luck, we should see the background color of this page change when we press "w" on the keyboard. Wow! Perhaps not the most interesting game, but it's a start!
<output></output>
