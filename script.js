function isCorrectSudoku(board) {
    for (var i = 0; i < 9; i++) {
        var row = board[i];

        for (var j = 0; j < 9; j++) {
            var targetNum = row[j];
            if (targetNum==0) continue;

            if (row.filter(n => n==targetNum).length >= 2) {
                return false
            }
        }


    }

    for (var i = 0; i < 9; i++) {
        var column = board.map(x => x[i]);

        for (var j = 0; j < 9; j++) {
            var targetNum = column[j];
            if (targetNum==0) continue;

            if (column.filter(n => n==targetNum).length >= 2) {
                return false
            }
        }
    }

    for (var i = 0; i < 9; i+=3) {
        for (var j = 0; j < 9; j+=3) {
            const block = [];
            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    block.push(board[i+x][j+y])
                }
            }


            for (var x = 0; x < 9; x++) {
                var targetNum = block[x];
                if (targetNum==0) continue;

                if (block.filter(n => n==targetNum).length >= 2) {
                    return false
                }
            }
        }
    }

    return true;
}

function createRandomRow(){
    const numList = [1,2,3,4,5,6,7,8,9]
    const row = []
    
    var cnt = 0
    while(numList.length > 0){
        const index = Math.floor(Math.random() * (numList.length));
        row.push(numList.splice([index], 1)[0]);
    }
    
    return row;
}

function createRandomBoard(){
    const board = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
    
    for (var i = 0; i < 9; i++) {
        board[i] = createRandomRow();
        
        while(!isCorrectSudoku(board)){
            board[i] = createRandomRow();
            
            console.log(board)
        }
    }
    
    return board;
}


createRandomBoard();


// if (isCorrectSudoku(board)) {
//     console.log("Yes");
// }
// else{
//     console.log("No");
// }
