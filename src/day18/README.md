# Day 18

## Part 1

Brute force will work easily here, just put all cubes in a matrix and check if there's a neighbor

## Part 2

Options:

- Project the droplet onto 2d space from each direction and multiply by two
    - This won't account for any grooves that are hidden by the projection.
- eliminate air pockets as a first pass, and reuse logic from part 1
    - Detecting that an air pocket is surrounded on all sides seems tricky.
- start scan from outside rather than for each cube
    - Could start from a single air cube and expand one in each direction, similar to finding shortest path
      with Dijkstra's algorithm.
    - ^^ winner.