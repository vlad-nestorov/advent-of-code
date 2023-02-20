# Day 16

## Attempts

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

