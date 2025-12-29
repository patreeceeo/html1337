# A generic way to map css variable name/value pairs to JS functions

This will facilitate:

- updating css variables self-referentially
  - velocity => position + velocity, rotation velocity => rotation + rotation velocity
- spawning
  - input css variable: spawn count => clone or remove elements matching selector
  - output css variable: spawn index => use to calculate other css variables
- collision handling
  - input css variable: collision-mask => detect collisions with matching entities
  - add css class to colliding entities
- frame management
  - input css variable: how to handle when an entity leaves the frame element bounds
