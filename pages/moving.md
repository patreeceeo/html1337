# Moving On

What kind of game do you want to make? I want to make a game where you move around and stuff! Okay, let's go!

To do that, we'll need to keep track of where we are, and how fast we're going. Let's make a little dude that can keep track of that for us:

```CSS
.entity {
    background: red;
    height: 20px;
    width: 20px;
    position: absolute;
    --x: 0;
    --y: 0;
    top: var(--y);
    left: var(--x);
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
```

<style>
.entity {
    background: red;
    height: 20px;
    width: 20px;
    position: absolute;
    --x: 0;
    --y: 0;
    top: var(--y);
    left: var(--x);
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
<div class="entity"></div>

Now use WASD keys to move our little dude. Look at him go!
