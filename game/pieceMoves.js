
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
    const column = Math.floor(sourceIndex / 8)
    if (rookCode === 'wR') {
        if (rank === 0) {
            if (column === 0) {
                possibleMoves.push(sourceIndex + 1)
                possibleMoves.push(sourceIndex + 2)
                possibleMoves.push(sourceIndex + 3)
                possibleMoves.push(sourceIndex + 4)
                possibleMoves.push(sourceIndex + 5)
                possibleMoves.push(sourceIndex + 6)
                possibleMoves.push(sourceIndex + 8)
                possibleMoves.push(sourceIndex + 16)
                possibleMoves.push(sourceIndex + 24)
                possibleMoves.push(sourceIndex + 32)
                possibleMoves.push(sourceIndex + 40)
                possibleMoves.push(sourceIndex + 48)
                possibleMoves.push(sourceIndex + 56)
            }
        }
    }
    return possibleMoves
}


export function getKnightMoves(sourceIndex, knightCode) {

}

export function getBishopMoves(sourceIndex, bishopCode) {

}

export function getQueenMoves(sourceIndex, queenCode) {

}

export function getKingMoves(sourceIndex, kingCode) {

}