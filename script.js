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
    
    board[0] = createRandomRow();
    
    for (var rowNum = 1; rowNum < 3; rowNum++) {
        const row  = []
        
        for (var i = 0; i < 9; i++) {
            const possibleNum = [1,2,3,4,5,6,7,8,9]
            
            //縦方向で既にある数字を削除
            var column = board.map(x => x[i]);
            column.forEach(function(n){
                if (n == 0) return;
                
                var idx = numList.indexOf(n);
                if(idx >= 0){
                    numList.splice(idx, 1); 
                }
            });
            
            //横方向で既にある数字を削除
            row.forEach(function(n){
                if (n == 0) return;
                
                var idx = numList.indexOf(n);
                if(idx >= 0){
                    numList.splice(idx, 1); 
                }
            });
            
            const index = Math.floor(Math.random() * (numList.length));
            row.push(numList.splice([index], 1)[0]);
        }
        
        board[rowNum] = row;
    }
    
    return board;
}

function getPossibleNumberList(board,r,c){
    if(board[r][c] != 0) return [0]
    
    const possibleNum = [1,2,3,4,5,6,7,8,9];
            
    //横方向で既にある数字を削除
    board[r].forEach(function(n){
        if (n == 0) return;
        
        var idx = possibleNum.indexOf(n);
        if(idx >= 0){
            possibleNum.splice(idx, 1); 
        }
    });
    
    //縦方向で既にある数字を削除
    var column = board.map(x => x[c]);
    column.forEach(function(n){
        if (n == 0) return;
        
        var idx = possibleNum.indexOf(n);
        if(idx >= 0){
            possibleNum.splice(idx, 1); 
        }
    });
    
    //同じブロックで既にある数字を削除
    const blockRow = Math.floor(r/3)*3;
    const blockColumn = Math.floor(c/3)*3;
    
    for (var x = blockRow; x < blockRow+3; x++) {
        for (var y = blockColumn; y < blockColumn+3; y++) {
            var n = board[x][y]
            if (n == 0) continue;
            
            var idx = possibleNum.indexOf(n);
            if(idx >= 0){
                possibleNum.splice(idx, 1); 
            }
        }
    }
    
    return possibleNum;
}

const board = [
    [0,2,0,4,0,0,0,8,0],
    [3,0,0,0,0,0,0,0,0],
    [0,0,9,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,5],
    [0,0,0,0,0,4,0,0,0],
    [0,0,0,0,0,6,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

generate2DArray1 = (m, n, val = 0) => {
  return Array.from(new Array(m), _ => new Array(n).fill(val));
};
b = generate2DArray1(9,9)


for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        b[i][j] = getPossibleNumberList(board,i,j)
    }
}


console.log(b)

// var b = createRandomBoard();
// console.log(b)


// if (isCorrectSudoku(board)) {
//     console.log("Yes");
// }
// else{
//     console.log("No");
// }
