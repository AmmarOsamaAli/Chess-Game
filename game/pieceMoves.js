

export function getPawnMoves(sourceIndex, pawnCode) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)

    if (pawnCode === 'wP') {
        if (rank === 1) {
            possibleMoves.push(sourceIndex + 8)
            possibleMoves.push(sourceIndex + 16)
        } else {
            possibleMoves.push(sourceIndex + 8)
        }
    }
    if (pawnCode === 'bP') {
        if (rank === 6) {
            possibleMoves.push(sourceIndex - 8)
            possibleMoves.push(sourceIndex - 16)
        } else {
            possibleMoves.push(sourceIndex - 8)
        }
    }
    return possibleMoves
}


export function getRookMoves(sourceIndex, rookCode) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    // Move left 
    for (let f = file - 1; f >= 0; f--) {
        possibleMoves.push(rank * 8 + f)
    }
    // Move right
    for (let f = file + 1; f <= 7; f++) {
        possibleMoves.push(rank * 8 + f)
    }
    // Move down 
    for (let r = rank - 1; r >= 0; r--) {
        possibleMoves.push(r * 8 + file)
    }
    // Move up 
    for (let r = rank + 1; r <= 7; r++) {
        possibleMoves.push(r * 8 + file)
    }

    return possibleMoves
}


export function getKnightMoves(sourceIndex, knightCode) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    if (rank + 2 <= 7 && file + 1 <= 7) possibleMoves.push(sourceIndex + 16 + 1)
    if (rank + 2 <= 7 && file - 1 >= 0) possibleMoves.push(sourceIndex + 16 - 1)
    if (rank - 2 >= 0 && file + 1 <= 7) possibleMoves.push(sourceIndex - 16 + 1)
    if (rank - 2 >= 0 && file - 1 >= 0) possibleMoves.push(sourceIndex - 16 - 1)
    if (rank + 1 <= 7 && file + 2 <= 7) possibleMoves.push(sourceIndex + 8 + 2)
    if (rank + 1 <= 7 && file - 2 >= 0) possibleMoves.push(sourceIndex + 8 - 2)
    if (rank - 1 >= 0 && file + 2 <= 7) possibleMoves.push(sourceIndex - 8 + 2)
    if (rank - 1 >= 0 && file - 2 >= 0) possibleMoves.push(sourceIndex - 8 - 2)

    return possibleMoves
}

export function getBishopMoves(sourceIndex, bishopCode) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    // Move 1 Block Diagonally in all Directions
    if (rank + 1 <= 7 && file + 1 <= 7) possibleMoves.push(sourceIndex + 8 + 1)
    if (rank + 1 <= 7 && file - 1 >= 0) possibleMoves.push(sourceIndex + 8 - 1)
    if (rank - 1 >= 0 && file + 1 <= 7) possibleMoves.push(sourceIndex - 8 + 1)
    if (rank - 1 >= 0 && file - 1 >= 0) possibleMoves.push(sourceIndex - 8 - 1)

    // Move 2 Block Diagonally in all Directions
    if (rank + 2 <= 7 && file + 2 <= 7) possibleMoves.push(sourceIndex + 16 + 2)
    if (rank + 2 <= 7 && file - 2 >= 0) possibleMoves.push(sourceIndex + 16 - 2)
    if (rank - 2 >= 0 && file + 2 <= 7) possibleMoves.push(sourceIndex - 16 + 2)
    if (rank - 2 >= 0 && file - 2 >= 0) possibleMoves.push(sourceIndex - 16 - 2)

    // Move 3 Block Diagonally in all Directions
    if(rank + 3 <= 7 && file + 3 <= 7 ) possibleMoves.push(sourceIndex + 24 + 3)
    if(rank + 3 <= 7 && file - 3 >= 0 ) possibleMoves.push(sourceIndex + 24 - 3)
    if(rank - 3 >= 0 && file + 3 <= 7 ) possibleMoves.push(sourceIndex - 24 + 3)
    if(rank - 3 >= 0 && file - 3 >= 0 ) possibleMoves.push(sourceIndex - 24 - 3)

    // Move 4 Block Diagonally in all Directions
    if(rank + 3 <= 7 && file + 4 <= 7 ) possibleMoves.push(sourceIndex + 32 + 4)
    if(rank + 3 <= 7 && file - 4 >= 0 ) possibleMoves.push(sourceIndex + 32 - 4)
    if(rank - 3 >= 0 && file + 4 <= 7 ) possibleMoves.push(sourceIndex - 32 + 4)
    if(rank - 3 >= 0 && file - 4 >= 0 ) possibleMoves.push(sourceIndex - 32 - 4)

    // Move 5 Block Diagonally in all Directions
    if(rank + 5 <= 7 && file + 5 <= 7 ) possibleMoves.push(sourceIndex + 40 + 5)
    if(rank + 5 <= 7 && file - 5 >= 0 ) possibleMoves.push(sourceIndex + 40 - 5)
    if(rank - 5 >= 0 && file + 5 <= 7 ) possibleMoves.push(sourceIndex - 40 + 5)
    if(rank - 5 >= 0 && file - 5 >= 0 ) possibleMoves.push(sourceIndex - 40 - 5)

    // Move 6 Block Diagonally in all Directions
    if(rank + 6 <= 7 && file + 6 <= 7 ) possibleMoves.push(sourceIndex + 48 + 6)
    if(rank + 6 <= 7 && file - 6 >= 0 ) possibleMoves.push(sourceIndex + 48 - 6)
    if(rank - 6 >= 0 && file + 6 <= 7 ) possibleMoves.push(sourceIndex - 48 + 6)
    if(rank - 6 >= 0 && file - 6 >= 0 ) possibleMoves.push(sourceIndex - 48 - 6)

    // Move 7 Block Diagonally in all Directions
    if(rank + 7 <= 7 && file + 7 <= 7 ) possibleMoves.push(sourceIndex + 56 + 7)
    if(rank + 7 <= 7 && file - 7 >= 0 ) possibleMoves.push(sourceIndex + 56 - 7)
    if(rank - 7 >= 0 && file + 7 <= 7 ) possibleMoves.push(sourceIndex - 56 + 7)
    if(rank - 7 >= 0 && file - 7 >= 0 ) possibleMoves.push(sourceIndex - 56 - 7)

    return possibleMoves

}

export function getQueenMoves(sourceIndex, queenCode) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    // Move Left
    for (let f = file - 1; f >= 0; f--) possibleMoves.push(rank * 8 + f)
    // Move right
    for (let f = file + 1; f <= 7; f++) possibleMoves.push(rank * 8 + f)
    // Move down 
    for (let r = rank - 1; r >= 0; r--) possibleMoves.push(r * 8 + file)
    // Move up 
    for (let r = rank + 1; r <= 7; r++) possibleMoves.push(r * 8 + file)
    
    // Move 1 Block Diagonally in all Directions
    if (rank + 1 <= 7 && file + 1 <= 7) possibleMoves.push(sourceIndex + 8 + 1)
    if (rank + 1 <= 7 && file - 1 >= 0) possibleMoves.push(sourceIndex + 8 - 1)
    if (rank - 1 >= 0 && file + 1 <= 7) possibleMoves.push(sourceIndex - 8 + 1)
    if (rank - 1 >= 0 && file - 1 >= 0) possibleMoves.push(sourceIndex - 8 - 1)

    // Move 2 Block Diagonally in all Directions
    if (rank + 2 <= 7 && file + 2 <= 7) possibleMoves.push(sourceIndex + 16 + 2)
    if (rank + 2 <= 7 && file - 2 >= 0) possibleMoves.push(sourceIndex + 16 - 2)
    if (rank - 2 >= 0 && file + 2 <= 7) possibleMoves.push(sourceIndex - 16 + 2)
    if (rank - 2 >= 0 && file - 2 >= 0) possibleMoves.push(sourceIndex - 16 - 2)

    // Move 3 Block Diagonally in all Directions
    if(rank + 3 <= 7 && file + 3 <= 7 ) possibleMoves.push(sourceIndex + 24 + 3)
    if(rank + 3 <= 7 && file - 3 >= 0 ) possibleMoves.push(sourceIndex + 24 - 3)
    if(rank - 3 >= 0 && file + 3 <= 7 ) possibleMoves.push(sourceIndex - 24 + 3)
    if(rank - 3 >= 0 && file - 3 >= 0 ) possibleMoves.push(sourceIndex - 24 - 3)

    // Move 4 Block Diagonally in all Directions
    if(rank + 3 <= 7 && file + 4 <= 7 ) possibleMoves.push(sourceIndex + 32 + 4)
    if(rank + 3 <= 7 && file - 4 >= 0 ) possibleMoves.push(sourceIndex + 32 - 4)
    if(rank - 3 >= 0 && file + 4 <= 7 ) possibleMoves.push(sourceIndex - 32 + 4)
    if(rank - 3 >= 0 && file - 4 >= 0 ) possibleMoves.push(sourceIndex - 32 - 4)

    // Move 5 Block Diagonally in all Directions
    if(rank + 5 <= 7 && file + 5 <= 7 ) possibleMoves.push(sourceIndex + 40 + 5)
    if(rank + 5 <= 7 && file - 5 >= 0 ) possibleMoves.push(sourceIndex + 40 - 5)
    if(rank - 5 >= 0 && file + 5 <= 7 ) possibleMoves.push(sourceIndex - 40 + 5)
    if(rank - 5 >= 0 && file - 5 >= 0 ) possibleMoves.push(sourceIndex - 40 - 5)

    // Move 6 Block Diagonally in all Directions
    if(rank + 6 <= 7 && file + 6 <= 7 ) possibleMoves.push(sourceIndex + 48 + 6)
    if(rank + 6 <= 7 && file - 6 >= 0 ) possibleMoves.push(sourceIndex + 48 - 6)
    if(rank - 6 >= 0 && file + 6 <= 7 ) possibleMoves.push(sourceIndex - 48 + 6)
    if(rank - 6 >= 0 && file - 6 >= 0 ) possibleMoves.push(sourceIndex - 48 - 6)

    // Move 7 Block Diagonally in all Directions
    if(rank + 7 <= 7 && file + 7 <= 7 ) possibleMoves.push(sourceIndex + 56 + 7)
    if(rank + 7 <= 7 && file - 7 >= 0 ) possibleMoves.push(sourceIndex + 56 - 7)
    if(rank - 7 >= 0 && file + 7 <= 7 ) possibleMoves.push(sourceIndex - 56 + 7)
    if(rank - 7 >= 0 && file - 7 >= 0 ) possibleMoves.push(sourceIndex - 56 - 7)

    return possibleMoves

}

export function getKingMoves(sourceIndex, kingCode) {

}