# connectfour
Connect Four JavaScript Game

Page loads with a modal asking each player to pick an emoji to be their character for the game. (Everyone picks the poo emoji..)
After player's have chosen, the modal closes and players can start making their moves. Whenever a tile is picked, the emoji is dropped to the lowest row available. 

Three checks are performed after a player has had at least four turns (no checks on moves 1-3 as there is no way for someone to have won). I used two different methods in order to check to see if one player has four consecutive tiles. 
For the row & column check all the tiles which the last player to have made a move are stored in an array. The array is filtered so that all the selected tiles in a row/column are in order regardless of what order the player actually selected them. The program then loops through the array to see if there are four consecutive tiles in a row/column within that array, if there is a winner is returned, if not the next player moves. 
For the diagonal check, the program looks at sets of diagonals, if they are all equal to the same player then a winner is returned, if not the next player moves. Diagonal checks work both right to left and left to right. 

Things to add:
-a undo button if a player changes their mind
-a reset button to the winner screen. Maybe a tracker for how many games each player has won
-a computer player
  -I think it would be pretty easy to add a computer player where the moves are randomized. Would be a challenge to create a computer player with strategy, who can read/anticipate the players moves and block. 
  -maybe add difficulty levels to the computer. Easy has no strategy, completely random. Medium is able to plot out its own moves with the intention of getting four in a row;]. Hard would plot out its own moves and try to block the player.
