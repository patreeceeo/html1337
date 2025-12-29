# Different kinds of entities can be created by using different css classes

# Some generic functions

- Map css selectors to JS functions
- Evaluate various kinds of CSS expressions e.g. `calc(1px + 1px)` => '2px'

These will facilitate:

- updating css variables self-referentially
  - elements with a velocity css class have velocity/position css variables. Update their position variables on each frame.
- spawning
  - elements with a spawn prototype css class are initially removed from dom but stored in js memory
  - read css variables related to spawn rate, max spawn count to determine how many should be in the dom on each frame.
  - set spawn info css variables to use in calculating other css variables
- collision handling
  - maintain a spatial index of elements with a collision css class.
  - read collision mask css variable, detect collisions with matching entities.
  - add css class to colliding entities
- camera/frame management
  - maintain list of elements with a camera css class.
  - read css variable to decide how to handle when an entity leaves the frame element bounds
  - read css variable for camera/frame position, zoom, rotation
