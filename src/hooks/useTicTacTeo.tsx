import { useEffect, useState } from "react";

import type { Board, Player } from "../types";

// utils
import {
  initialBoard,
  isGameTerminate,
  getPlayer,
  winner,
  minimax,
  moveResult,
} from "../utils";

const useTicTacToe = () => {
  const [board, setBoard] = useState<Board>(initialBoard);

  const [aiTurn, setAiTurn] = useState<boolean>(false);

  const [gameState, setGameState] = useState<{
    winner: Player | null;
    isDraw: boolean;
    isOver: boolean;
  }>({
    winner: null,
    isDraw: false,
    isOver: false,
  });

  const aiMove = (prevBoard: Board) => {
    const player = getPlayer(prevBoard);
    const isGameOver = isGameTerminate(prevBoard);

    if (player === "X") return;

    if (player === "O" && !isGameOver) {
      const [row, col] = minimax(prevBoard)!;
      const newBoard = moveResult(prevBoard, [row, col]);
      if (!newBoard) return;
      setBoard(newBoard);
      setAiTurn(false);
    }
  };

  const move = (row: number, col: number) => {
    const isGameOver = isGameTerminate(board);
    const player = getPlayer(board);

    if (isGameOver) return;

    // check for user move
    if (player === "X") {
      const newBoard = moveResult(board, [row, col]);
      if (!newBoard) return;
      setBoard(newBoard);
      setAiTurn(true);

      // ai move
      const timeout = setTimeout(() => {
        // this makes the change given by the user immediate; otherwise, the user will see the board change after the ai move
        aiMove(newBoard);
        clearTimeout(timeout);
      }, 500);
    }
  };

  const reset = () => {
    setBoard(initialBoard);
    setAiTurn(false);
    setGameState({
      winner: null,
      isDraw: false,
      isOver: false,
    });
  };

  useEffect(() => {
    const isGameOver = isGameTerminate(board);
    const winnerPlayer = winner(board);

    if (isGameOver) {
      setGameState({
        winner: winnerPlayer,
        isDraw: !winnerPlayer,
        isOver: true,
      });
    }
  }, [board]);

  return {
    board,
    aiTurn,
    move,
    winner: gameState.winner,
    isDraw: gameState.isDraw,
    isOver: gameState.isOver,
    reset,
  } as const;
};

export default useTicTacToe;
