In the [last post](intro), we developed a basic technique for getting input from the user. You might wanna check that out first if you haven't already.

# Moving On

What kind of game do you want to make? I want to make a game where you move around and stuff! Okay, let's go!

To do that, we'll need to keep track of where we are, and how fast we're going. Let's make a little dude that can keep track of that for us:

```HTML
<style>
.entity {
    /* Set position */
    position: absolute;
    --x: 0;
    --y: 0;
    transform: translate(var(--x), var(--y)) rotate(90deg);

    /* ...Other less important rules */
}
.key-w-pressed .entity {
    --velocity-y: -1px;
}
.key-a-pressed .entity {
    --velocity-x: -1px;
}
.key-s-pressed .entity {
    --velocity-y: 1px;
}
.key-d-pressed .entity {
    --velocity-x: 1px;
}
</style>
<div class="entity">:)</div>
```

<style>
.entity {
    /* Basic attributes */
    background: red;
    height: 20px;
    width: 20px;
    /* Contrast with bg */
    color: black;

    /* Center the face */
    display: flex;
    justify-content: center;
    align-items: center;

    /* Set position */
    position: absolute;
    --x: 0;
    --y: 0;
    transform: translate(var(--x), var(--y)) rotate(90deg);
    --speed: 1px;
}
.key-w-pressed .entity {
    --velocity-y: calc(-1 * var(--speed) );
}
.key-a-pressed .entity {
    --velocity-x: calc(-1 * var(--speed) );
}
.key-s-pressed .entity {
    --velocity-y: calc(1 * var(--speed) );
}
.key-d-pressed .entity {
    --velocity-x: calc(1 * var(--speed) );
}
</style>
<div class="entity">:)</div>

Now use WASD keys to move our little dude. Look at 'em go!

## Pause to reflect on how far we have already come

Try inspecting our little dude by right clicking on him and selecting "Inspect." You should be able to see his CSS properties changing as you move him around. Reminder: If he's not moving, click back on the page itself to restore focus. Pretty neat!

Another cool thing about this is how it sensibly handles edge cases. Try pressing keys corresponding to orthogonal directions, like "w" and "d". Or keys corresponding to opposite directions, like "w" and "s". Quite sensible, mostly.

The only not so sensible part I can see is in the second case. If you're moving in a positive x or y direction and then you also press the key for the negative direction, nothing happens, but in the reverse case, you start heading in the new direction. For example: Press and hold "w" and then also press "s". Then press and hold "s" and then also press "w".

This is a result of how CSS works. We put the rules about moving down and right after the rules about moving up and left, and later rules take precedence.

This isn't a necessarily a terrible defect, as it's probably not a show stopper for most games, but something to be mindful of in our adventure.

## Need for --speed

If we add another CSS variable for the speed instead of using a hard-coded "1px", we can add a lil widget that allows us to fine-tune our lil dude's speed.

<form data-target-selector=".entity" data-units='{"--speed":"px"}'>
    <label>--speed: <input name="--speed" type="number"/>px</label>
    <input type="submit" value="Set Velocity"/>
</form>

I wrote some JavaScript that let's us create such widgets with pure HTML:

```html
<form data-target-selector=".entity" data-units='{"--speed":"px"}'>
  <label>--speed: <input name="--speed" type="number" />px</label>
  <input type="submit" value="Set Velocity" />
</form>
```

Convenient, eh?
