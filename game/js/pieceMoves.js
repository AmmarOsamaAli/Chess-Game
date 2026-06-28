

export function getPawnMoves(sourceIndex, pawnCode, boardDisplay) {
    const possibleMoves = []
    const possibleCaptures = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    if (pawnCode === 'wP') {
        if (!boardDisplay[sourceIndex + 8]) {
            if (rank === 1) {
                possibleMoves.push(sourceIndex + 8)
                if (!boardDisplay[sourceIndex + 16])
                    possibleMoves.push(sourceIndex + 16)
            } else {
                possibleMoves.push(sourceIndex + 8)
            }
        }
        if (rank + 1 <= 7 && file + 1 <= 7 && boardDisplay[sourceIndex + 9] && boardDisplay[sourceIndex + 9][0] === 'b')
            possibleCaptures.push(sourceIndex + 9)
        if (rank + 1 <= 7 && file - 1 >= 0 && boardDisplay[sourceIndex + 7] && boardDisplay[sourceIndex + 7][0] === 'b')
            possibleCaptures.push(sourceIndex + 7)
    }

    if (pawnCode === 'bP') {
        if (!boardDisplay[sourceIndex - 8]) {
            if (rank === 6) {
                possibleMoves.push(sourceIndex - 8)
                if (!boardDisplay[sourceIndex - 16])
                    possibleMoves.push(sourceIndex - 16)
            } else {
                possibleMoves.push(sourceIndex - 8)
            }
        }

        if (rank - 1 >= 0 && file + 1 <= 7 && boardDisplay[sourceIndex - 7] && boardDisplay[sourceIndex - 7][0] === 'w')
            possibleCaptures.push(sourceIndex - 7)
        if (rank - 1 >= 0 && file - 1 >= 0 && boardDisplay[sourceIndex - 9] && boardDisplay[sourceIndex - 9][0] === 'w')
            possibleCaptures.push(sourceIndex - 9)
    }
    return { possibleMoves, possibleCaptures }
}


export function getRookMoves(sourceIndex, rookCode, boardDisplay) {
    const possibleMoves = []
    const possibleCaptures = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    // Move left 
    for (let f = file - 1; f >= 0; f--) {
        if (boardDisplay[rank * 8 + f] != '')
            if ((boardDisplay[rank * 8 + f][0] === rookCode[0]))
                break
            else {
                possibleCaptures.push(rank * 8 + f)
                break
            }
        else (possibleMoves.push(rank * 8 + f))
    }
    // Move right
    for (let f = file + 1; f <= 7; f++) {
        if (boardDisplay[rank * 8 + f] != '')
            if (boardDisplay[rank * 8 + f][0] === rookCode[0])
                break
            else {
                possibleCaptures.push(rank * 8 + f)
                break
            }
        else { (possibleMoves.push(rank * 8 + f)) }
    }

    // Move down 
    for (let r = rank - 1; r >= 0; r--) {
        if (boardDisplay[r * 8 + file] != '')
            if (boardDisplay[r * 8 + file][0] === rookCode[0])
                break
            else {
                possibleCaptures.push(r * 8 + file)
                break
            }
        else { (possibleMoves.push(r * 8 + file)) }
    }
    // Move up 
    for (let r = rank + 1; r <= 7; r++) {
        if (boardDisplay[r * 8 + file] != '')
            if (boardDisplay[r * 8 + file][0] === rookCode[0])
                break
            else {
                possibleCaptures.push(r * 8 + file)
                break
            }
        else { (possibleMoves.push(r * 8 + file)) }
    }

    return { possibleMoves, possibleCaptures }
}


export function getKnightMoves(sourceIndex, knightCode, boardDisplay) {
    const possibleMoves = []
    const possibleCaptures = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    if (rank + 2 <= 7 && file + 1 <= 7) {
        if (boardDisplay[sourceIndex + 16 + 1] != '') {
            if (boardDisplay[sourceIndex + 16 + 1][0] != knightCode[0])
                possibleCaptures.push(sourceIndex + 16 + 1)
        }
        else
            possibleMoves.push(sourceIndex + 16 + 1)
    }

    if (rank + 2 <= 7 && file - 1 >= 0) {
        if (boardDisplay[sourceIndex + 16 - 1] != '') {
            if (boardDisplay[sourceIndex + 16 - 1][0] != knightCode[0])
                possibleCaptures.push(sourceIndex + 16 - 1)
        }
        else
            possibleMoves.push(sourceIndex + 16 - 1)
    }

    if (rank - 2 >= 0 && file + 1 <= 7) {
        if (boardDisplay[sourceIndex - 16 + 1] != '') {
            if (boardDisplay[sourceIndex - 16 + 1][0] != knightCode[0])
                possibleCaptures.push(sourceIndex - 16 + 1)
        }
        else
            possibleMoves.push(sourceIndex - 16 + 1)
    }

    if (rank - 2 >= 0 && file - 1 >= 0) {
        if (boardDisplay[sourceIndex - 16 - 1] != '') {
            if (boardDisplay[sourceIndex - 16 - 1][0] != knightCode[0])
                possibleCaptures.push(sourceIndex - 16 - 1)
        }
        else possibleMoves.push(sourceIndex - 16 - 1)
    }

    if (rank + 1 <= 7 && file + 2 <= 7) {
        if (boardDisplay[sourceIndex + 8 + 2] != '') {
            if (boardDisplay[sourceIndex + 8 + 2][0] != knightCode[0])
                possibleCaptures.push(sourceIndex + 8 + 2)
        }
        else
            possibleMoves.push(sourceIndex + 8 + 2)
    }

    if (rank + 1 <= 7 && file - 2 >= 0) {
        if (boardDisplay[sourceIndex + 8 - 2] != '') {
            if (boardDisplay[sourceIndex + 8 - 2][0] != knightCode[0])
                possibleCaptures.push(sourceIndex + 8 - 2)
        }
        else
            possibleMoves.push(sourceIndex + 8 - 2)
    }

    if (rank - 1 >= 0 && file + 2 <= 7) {
        if (boardDisplay[sourceIndex - 8 + 2] != '') {
            if (boardDisplay[sourceIndex - 8 + 2][0] != knightCode[0])
                possibleCaptures.push(sourceIndex - 8 + 2)
        }
        else
            possibleMoves.push(sourceIndex - 8 + 2)
    }

    if (rank - 1 >= 0 && file - 2 >= 0) {
        if (boardDisplay[sourceIndex - 8 - 2] != '') {
            if (boardDisplay[sourceIndex - 8 - 2][0] != knightCode[0])
                possibleCaptures.push(sourceIndex - 8 - 2)
        }
        else
            possibleMoves.push(sourceIndex - 8 - 2)
    }

    return { possibleMoves, possibleCaptures }
}

export function getBishopMoves(sourceIndex, bishopCode, boardDisplay) {
    const possibleMoves = []
    const possibleCaptures = []
    const rank = Math.floor(sourceIndex / 8)
    const file = sourceIndex % 8

    for (let i = 1; i <= 7; i++){
        if (rank + i <= 7 && file + i <= 7) {
            if (boardDisplay[sourceIndex + (i * 8) + i] != '') {
                if (boardDisplay[sourceIndex + (i * 8) + i][0] != bishopCode[0]) {
                    possibleCaptures.push(sourceIndex + (i * 8) + i)
                    break
                }
                else{break}
            }
            else possibleMoves.push(sourceIndex + (i * 8) + i)
        }
        else { break }
    }

    for (let i = 1; i <= 7; i++){
        if (rank + i <= 7 && file - i >= 0) {
            if (boardDisplay[sourceIndex + (i * 8) - i] != '') {
                if (boardDisplay[sourceIndex + (i * 8) - i][0] != bishopCode[0]) {
                    possibleCaptures.push(sourceIndex + (i * 8) - i)
                    break
                }
                else{break}
            }
            else possibleMoves.push(sourceIndex + (i * 8) - i)
        }
        else { break }
    }

    for (let i = 1; i <= 7; i++){
        if (rank - i >= 0 && file + i <= 7) {
            if (boardDisplay[sourceIndex - (i * 8) + i] != '') {
                if (boardDisplay[sourceIndex - (i * 8) + i][0] != bishopCode[0]) {
                    possibleCaptures.push(sourceIndex - (i * 8) + i)
                    break
                }
                else{break}
            }
            else possibleMoves.push(sourceIndex - (i * 8) + i)
        }
        else { break }
    }

    for (let i = 1; i <= 7; i++){
        if (rank - i >= 0 && file - i >= 0) {
            if (boardDisplay[sourceIndex - (i * 8) - i] != '') {
                if (boardDisplay[sourceIndex - (i * 8) - i][0] != bishopCode[0]) {
                    possibleCaptures.push(sourceIndex - (i * 8) - i)
                    break
                }
                else{break}
            }
            else possibleMoves.push(sourceIndex - (i * 8) - i)
        }
        else { break }
    }

    return { possibleMoves, possibleCaptures }

}

export function getQueenMoves(sourceIndex, queenCode, boardDisplay) {
    const possibleMoves = []
    const possibleCaptures = []
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

    return { possibleMoves, possibleCaptures }

}

export function getKingMoves(sourceIndex, kingCode, boardDisplay) {
    const possibleMoves = []
    const possibleCaptures = []
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

    return { possibleMoves, possibleCaptures }
}