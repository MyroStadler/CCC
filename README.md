"Ching chong cha!"
==================

Translating this game to the browser is challenging. The game's nature
is that two sources of input occur simultaneously, which is of course
not possible here. One would imagine an at-terminal version of this to
work like battleships where actions are cloaked and there are two separate
display surfaces. The best we can do here is to make this a networked game
using XMPP, or failing that - as is the case here - a screen divided into
two.

To make the task more interesting and make it smaller I set some 
parameters:
- no graphics dependencies
- 3 hours development time total

I went for a simple queuing game engine, a pattern that has served me well
in the past. The concerns are separated into constituent Javascript "classes"
and tied together in main.js.

The config uses loose internal coupling based on strings. I had a little 
internal debate over where the testing requirements for the game should live. 
In the end I decided that the game's rules are best encapsulated in the game
itself, hence a test function that can be run on game.model. 

WRT responsiveness for this exercise in simplicity I'm advocating the web in 
its initial cascading form which is naturally responsive. This requires severe 
UI restrictions, basically only using elements for their intended purpose so 
the visual metaphor is appropriate showing the browser default.


TODO
====

Add testing using QUnit, leverage Model.test method.
Write grunt tasks to concatenate javascript so lint warnings go away.
Grunt minify tasks.
Go some way towards resolving CSS linting.
Skin

