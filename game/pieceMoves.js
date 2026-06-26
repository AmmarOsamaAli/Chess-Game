
export function getPawnMoves(sourceIndex, pawnCode){
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


