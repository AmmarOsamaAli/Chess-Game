

export function getPawnMoves(sourceIndex, pawnCode, boardDisplay) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    if (pawnCode === 'wP') {
        if (rank === 1) {
            possibleMoves.push(sourceIndex + 8)
            possibleMoves.push(sourceIndex + 16)
        } else {
            possibleMoves.push(sourceIndex + 8)
        }
        if (rank + 1 <= 7 && file + 1 <= 7 && boardDisplay[sourceIndex + 9] && boardDisplay[sourceIndex + 9][0] === 'b')
            possibleMoves.push(sourceIndex + 9)
        if (rank + 1 <= 7 && file - 1 >= 0 && boardDisplay[sourceIndex + 7] && boardDisplay[sourceIndex + 7][0] === 'b')
            possibleMoves.push(sourceIndex + 7)
    }
    if (pawnCode === 'bP') {
        if (rank === 6) {
            possibleMoves.push(sourceIndex - 8)
            possibleMoves.push(sourceIndex - 16)
        } else {
            possibleMoves.push(sourceIndex - 8)
        }
        if (rank - 1 >= 0 && file + 1 <= 7 && boardDisplay[sourceIndex - 7] && boardDisplay[sourceIndex - 7][0] === 'w')
            possibleMoves.push(sourceIndex - 7)
        if (rank - 1 >= 0 && file - 1 >= 0 && boardDisplay[sourceIndex - 9] && boardDisplay[sourceIndex - 9][0] === 'w')
            possibleMoves.push(sourceIndex - 9)
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

    for (let i = 1; i <= 7; i++) {
        if (rank + i <= 7 && file + i <= 7) possibleMoves.push(sourceIndex + (i * 8) + i)
        if (rank + i <= 7 && file - i >= 0) possibleMoves.push(sourceIndex + (i * 8) - i)
        if (rank - i >= 0 && file + i <= 7) possibleMoves.push(sourceIndex - (i * 8) + i)
        if (rank - i >= 0 && file - i >= 0) possibleMoves.push(sourceIndex - (i * 8) - i)
    }

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

    for (let i = 1; i <= 7; i++) {
        if (rank + i <= 7 && file + i <= 7) possibleMoves.push(sourceIndex + (i * 8) + i)
        if (rank + i <= 7 && file - i >= 0) possibleMoves.push(sourceIndex + (i * 8) - i)
        if (rank - i >= 0 && file + i <= 7) possibleMoves.push(sourceIndex - (i * 8) + i)
        if (rank - i >= 0 && file - i >= 0) possibleMoves.push(sourceIndex - (i * 8) - i)
    }

    return possibleMoves

}

export function getKingMoves(sourceIndex, kingCode) {
    const possibleMoves = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    if (rank + 1 <= 7) possibleMoves.push(sourceIndex + 8)
    if (rank - 1 >= 0) possibleMoves.push(sourceIndex - 8)
    if (file + 1 <= 7) possibleMoves.push(sourceIndex + 1)
    if (file - 1 >= 0) possibleMoves.push(sourceIndex - 1)
    if (rank + 1 <= 7 && file + 1 <= 7) possibleMoves.push(sourceIndex + 8 + 1)
    if (rank + 1 <= 7 && file - 1 >= 0) possibleMoves.push(sourceIndex + 8 - 1)
    if (rank - 1 >= 0 && file + 1 <= 7) possibleMoves.push(sourceIndex - 8 + 1)
    if (rank - 1 >= 0 && file - 1 >= 0) possibleMoves.push(sourceIndex - 8 - 1)

    return possibleMoves
}