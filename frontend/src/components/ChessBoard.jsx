import React, {useState} from 'react';
import "./ChessBoard.css"

const ChessBoard = () => {

    const initialBoard = [
  "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
  "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
  "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"
];

    const[selectedSquare, setSelectedSquare] = useState(null);
    const[board, setBoard] = useState(initialBoard);
    const[currentTurn, setCurrentTurn] = useState("white");

    const getPieceColor = (piece) => {
                if("♙♕♔♗♘♖".includes(piece)) return "white";
                if("♟♛♚♝♞♜".includes(piece)) return"black";
                return null;
                }

    const SquareClick = (index) => {

                const piece = board[index];
                const pieceColor = getPieceColor(piece);

                if(selectedSquare === null){
                    if(piece && pieceColor === currentTurn){
                        setSelectedSquare(index)
                    }
                }
                else{
                    const updatedBoard = [...board];
                    updatedBoard[index] = board[selectedSquare];
                    updatedBoard[selectedSquare] = "";
                    setBoard(updatedBoard);
                    setSelectedSquare(null);
                }
            }

    const squares = Array.from({ length: 64}, (_,index) => {
            const row = Math.floor(index/8);
            const column = index % 8;
            const isDark = (row + column)%2 == 1;
            const isSelected = index === selectedSquare;
            const piece = board[index];

            return(
                <div className='square' key={index} onClick={() => SquareClick(index)} style={{backgroundColor: isSelected?
                    isDark? "#567d46" : "#d6d6a1" :
                     isDark? "#769656" : "#eeeed2", 
                  cursor: 'pointer'
                }}>{piece}</div>
            )
        })

    return(
        <>
        <div className='chessboard' >{squares}</div>
        </>
    )
}

export default ChessBoard;