= Friends in Common =
Author: Daniella Valentin

A command-line tool to check friends in common between 2 Twitter users.

== Description ==

This was made last year, as my first node experience. It is command-line tool to list
friends in common between 2 users in Twitter. 

To run it, execute fic.js file with node passing as arguments the Twitter usernames you want
to compare:

$ node fic.js usernameA usernameB

By default, it lists 10 friends in common. This can be changed this way:

$ node fic.js --l 15 usernameA usernameB

In the example bellow, it will show 15 users. Remember that Twitter calls are limited (200 per hour).
I don't do checks about the remaining calls allowed.

Important: node-oauth was not written by me. Please check readme in the folder.