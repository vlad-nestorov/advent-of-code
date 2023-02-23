# Day 16

## Part 1 Attempts

### 1. Optimize return of next valve
1. Find the shortest path to all remaining closed valves
2. Find pressure that could be released by each valve after travelling to it and opening it
3. Choose the valve which will give most pressure

This approach does not take into account the distance needed to travel to the next valve, 
therefore is likely to give the wrong result. Against the Day 16 example, this approach gets 1595 total pressure release
vs the 1651 in the example approach. 

### 2. Brute force all possible traversal paths
1. Build lookup for shortest path between all closed valve
2. Go through all permutations of travelling between closed valves and opening them.
3. Save the path with max result. 

In the sample input, only 15 of 60 valves have a flow rate > 0. 
This means there are `15! = 1307674368000` possible orders in which to open the valves. 

As a rough estimate, lets say that's 10^12 combinations to exhaustively iterate on a ~1 GHz CPU, and each check takes 10 cycles
(10^8 combinations per second).
I wouldn't expect an answer for at least 10^4 seconds, which is close to 3h. There musts be a better way

### 3. Brute force all possible traversal paths in 30 min
This is the same approach as 2., but it would cull all permutations with the same 30min start.

For example, lets say we had 15 valves and the path V1 -> V5 -> V9 takes 24min, including opening each valve, 
and there are no valves closer than 5 steps from V9. That means all remaining 12! paths after V9 are equivalent for our purposes. 

## Part 2 Attempts

### 1. Reuse path generation from Part 1 method 3
1. Generate all viable paths for 26 minutes for a single person
2. Do a cartesian product of the paths with themselves, to represent all possible paths two people (or a person and an elephant) can take

While this technically works, it generates A LOT of additional possibilities. For the example it took ~3min to finish. No hope it'll finish in a few hours for the sample. 

Let's assume it takes on average 3 moves to travel to a tap and turn it on. Then, in 26 minutes a single person can turn on ~ 8 taps, for a total of $15!/8!$ combinations.
Using that same set for two people, we get a lot of overlapping options $(15!/8!)^2$. Assuming each person takes roughly the same number of moves,
and we only consider the paths where they don't go for the same valves, we get $15!/8!$ for the first person, but only $15!-15!/8! = 15!(8!-1)/8!$ for the second)
for a total of $(15!/8!)(15!(8!-1)/8!)$

*** This math feels fishy.

### 2. Generate pairs of paths
1. Similar to Part 1.3, but instead of maintaining 1 list of moves, maintain 2. Explore assigning the next closed node to both players.

After a few hours and 3x10^8 iterations, the max value is 1937, which is between the single person solution for 30 min (2265) but more than the single person solution for 26 min (1709) 

### 3. Assume yield of person A's path must be at least half of the single person solution
If we want to get a result higher than the single person solution, either person A or person B must
follow a path that produces more than half of the single person solution. 

The way paths are generated in 2), every path for person A is also produced for person B, 
so we can first generate all paths for person A, and include only the ones that are less than 26 moves AND release total pressure is greater than Part 1 total / 2

**Rough idea**

Generate all possible paths for A

1. Add one valve from the remaining closed valves to the path
2. If the path length > 26, skip
3. If the path total released pressure is > than Part 1 total / 2, yield it as a possible result
4. Go back to 1, removing the valve from the remaining valves

For each possible path of A
1. Remove valves opened by A from remaining valves
2. Use Part 1.3 solution to find max yield for 26 moves

### 4. Simpler version of 3
Turns out that instead of trying to generate all paths for both independently, it's much more efficient to calculate the 
max yield of each next possible path for A, and the max yield if A stops there and B visits the remaining nodes. 

This also has the benefit of not keeping as much state. 

Based on this answer:
https://www.reddit.com/r/adventofcode/comments/zn6k1l/comment/j0fti6c/?utm_source=share&utm_medium=web2x&context=3

For the sample, attempt 3 resulted in 46975480 iterations of the `generatePaths` function, 
while the `search` approach in attempt 3 only had 2269505, AND was easier to memoize

Memoize statistics:

Init    Cache  %Cache  Source location
2269505  4304291   65.48  (all)
