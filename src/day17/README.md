# Day 17

## Part 1

Fun with linear algebra! A challenge here is to easily check if two shapes collide. I chose to bring in the `mathjs` library
and use some simple martix operations to do these checks. 

## Part 2

Fun with cycle detection!

As soon as I saw an impossibly large number of shapes, I knew the challenge is finding a pattern. 

My fist attempt was to check the height of the tower every time we've gone through the entire wind pattern. 
This looked promising for the sample input, but not the example. 

Looking around for cycle detection algorithms, the Turtle and Hare looked promising. The thing that stumped me for a while is 
how to compare if two states are equal, since I was still thinking about checking the height when the wind index is 0. 
A better place to anchor the cycle detection is after a shape has settled, and compare if the shape type and wind index are the same.

Possible improvements:
- [ ] Only simulate enough tower shapes until the hare catches up to the turtle.
- [ ] Don't keep all simulated shapes in memory