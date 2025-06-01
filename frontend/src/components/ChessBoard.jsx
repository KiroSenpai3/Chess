import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './ChessBoard.css';

const socket = io('http://localhost:5000');

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

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [playerColor, setPlayerColor] = useState(null);

  useEffect(() => {
    socket.on('playerColor', (color) => {
      setPlayerColor(color);
      alert(`You are playing as ${color}`);
    });

    socket.on('roomFull', () => {
      alert('Room is full. Try again later.');
    });

    return () => {
      socket.off('playerColor');
      socket.off('roomFull');
    };
  }, []);

  const handleSquareClick = (index) => {
    if (selectedSquare === null) {
      if (board[index]) {
        setSelectedSquare(index);
      }
    } else {
      const updatedBoard = [...board];
      updatedBoard[index] = board[selectedSquare];
      updatedBoard[selectedSquare] = "";
      setBoard(updatedBoard);
      setSelectedSquare(null);
    }
  };

  const squares = Array.from({ length: 64 }, (_, index) => {
    const row = Math.floor(index / 8);
    const column = index % 8;
    const isDark = (row + column) % 2 === 1;
    const isSelected = index === selectedSquare;
    const piece = board[index];

    return (
      <div
        key={index}
        onClick={() => handleSquareClick(index)}
        className="square"
        style={{
          backgroundColor: isSelected
            ? isDark
              ? '#567d46'
              : '#d6d6a1'
            : isDark
            ? '#769656'
            : '#eeeed2',
          cursor: 'pointer',
        }}
      >
        {piece}
      </div>
    );
  });

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>
        You are playing as: {playerColor || 'Connecting...'}
      </h3>
      <div className="chessboard">{squares}</div>
    </div>
  );
};

export default ChessBoard;
