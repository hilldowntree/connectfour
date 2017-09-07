$(function(){

var game = {}
game.selected = [];
game.player = 1;
game.player1emoji;
game.player2emoji;

game.selectEmoji = function(){
	$('#selectPlayer').text('Player One')
	$('img').on('click', function(){
		var $emoji = $(this)
		if (typeof game.player1emoji === 'undefined'){
			$emoji.addClass('selected')
			game.player1emoji = $emoji.attr('src')
			$('#selectPlayer').text('Player Two')
		}
		else if (typeof game.player2emoji === 'undefined'){
			if($emoji === game.player1emoji){
				console.log('be original')
			}
			else {
				$emoji.addClass('selected')
				game.player2emoji = $(this).attr('src')
			}

			if (typeof game.player1emoji === 'string' && typeof game.player2emoji === 'string'){
				$emoji.parent().parent().css('display','none')
			}
		}
	})
	game.makeMove();
}

game.makeMove = function(){
	game.displayPlayersTurn(game.player);

	$('.column').on('click', function(){
		var boxes = $(this).find('.box').not('.selected');
		game.selected.push({
			column: $(this).attr('class').split(' ')[1], 
			row: $(boxes).first().attr('class').split(' ')[1],
			player: game.player })

		if (game.player === 1){
			$(boxes).first().html('<img src="' + game.player1emoji + '">').addClass('player1 selected');
			game.player = 2;
			game.switchPlayers('1')
		}
		else {
			$(boxes).first().html('<img src="' + game.player2emoji + '">').addClass('player2 selected');
			game.player = 1;
			game.switchPlayers('2')
		}
	})
}

game.displayPlayersTurn = function(player){
	if(player === 1){
		$('#player').text(`Player One's Turn`)
	}
	else{
		$('#player').text(`Player Two's Turn`)
	}
}

game.switchPlayers = function(a){
	var currentPlayer = game.selected.filter(function(p){
		return (p.player == a)
		});
	//console.log(selected,currentPlayer, a)
	game.displayPlayersTurn(game.player)
	game.checkWin(currentPlayer)
	game.checkDiagonal(currentPlayer)
}

game.checkWin = function(player){
	for(var i=0; i < 7; i++) { 

		var currentColumn = player.filter(function(v){
			return (v.column === 'c'+(i+1))
			});
		currentColumn = _.sortBy(currentColumn, 'row')
		
		var currentRow = player.filter(function(w){
			return (w.row === 'r'+(i+1))
			});
		currentRow = _.sortBy(currentRow, 'column');

		//checks all the columns to see if there are 4 consecutive rows selected for a COLUMN WIN
		if(currentColumn.length > 3){
			//console.log(currentColumn)
			for(var j=0; j<4; j++){
				if(typeof currentColumn[j] === 'undefined' || typeof currentColumn[j+1] === 'undefined' || typeof currentColumn[j+2] === 'undefined' || typeof currentColumn[j+3] === 'undefined') {
					return 'no win'
				}
				else 
					for(var k=0;k<3;k++){
						if(currentColumn[j].row === 'r'+(k+1) && currentColumn[j+1].row === 'r'+(k+2) && currentColumn[j+2].row === 'r'+(k+3) && currentColumn[j+3].row === 'r'+(k+4)){
						game.winner()
					}
				}
			}
		}

		// //checks all the rows to see if there are 4 consecutive columns selected for a ROW WIN
		if(currentRow.length >3){
			for(var j=0;j<4;j++){
				if (typeof currentRow[j] === 'undefined' || typeof currentRow[j+1] === 'undefined' || typeof currentRow[j+2] === 'undefined' || typeof currentRow[j+3] === 'undefined'){
					return 'no win'
				}
				else {
					for(var k=0;k<4;k++)
					if(currentRow[j].column === 'c'+(k+1) && currentRow[j+1].column === 'c'+(k+2) && currentRow[j+2].column === 'c'+(k+3) && currentRow[j+3].column === 'c'+(k+4)){
					game.winner()
					}
				}
			}
		}
	}	
}

game.checkDiagonal = function(player){
	var columnTemp = null,
    rowTemp = null,
    currentValue = null,
    tally = 0;

    for(var x = 0; x <= 6; x++) {
    	columnTemp = x;
    	rowTemp = 0;

    	while (columnTemp <= 6 && rowTemp <= 5) {
            currentValue = ['c' + columnTemp, 'r'+rowTemp];
            for (var y=0; y<7; y++){
            	if (typeof player[y] != 'undefined'){
            		if (currentValue[0] === player[y].column && currentValue[1] === player[y].row) {
                		tally++;
             		}
            	}
        	}
        if (tally === 4){
        	game.winner()
        }
        rowTemp++;
        columnTemp++;
    }
    tally = 0
	}

	for(var x=7; x >=6; x--){
		columnTemp = x;
    	rowTemp = 1;

    	while (columnTemp >= 0 && rowTemp <= 5) {
            currentValue = ['c' + columnTemp, 'r'+rowTemp];
            for (var y=0; y<7; y++){
            	if (typeof player[y] != 'undefined'){
            		if (currentValue[0] === player[y].column && currentValue[1] === player[y].row) {
                		tally++;
             		}
            	}
        	}
        	//console.log(currentValue, player, tally)
        if (tally === 4){
        	console.log('WINNER')
        }
        rowTemp++;
        columnTemp--;
    }
    tally = 0
	}
}

game.winner = function(){
	$('#player').empty()
	$('.gameBoard').hide()
	$('#winnerText').text(`Player ${game.player} is the winner and ultimate Connect Four master!`)
	
	if (game.player === 2){
		winnerEmoji = game.player1emoji
		winningPlayer = 'Player One'
	}
	else {
		winnerEmoji = game.player2emoji
		winningPlayer = 'Player Two'
	}

	$('.winner').html(`<h4>${winningPlayer} is the winner and ultimate Connect Four master!</h4>
		<p><img src="${winnerEmoji}"></p>`)
}

game.init = function(){
	game.selectEmoji();
}

	game.init()

})