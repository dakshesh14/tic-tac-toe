import type { Player, Board } from "../types";

export const initialBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const isPlayerWinner = (board: Board, agent: Player) => {
  // for checking rows
  for (let row in board) {
    if (board[row].every((p) => p === agent)) return true;
  }

  // for checking columns
  for (let col = 0; col < board.length; col++) {
    if (board.every((row) => row[col] === agent)) return true;
  }

  // for checking diagonals
  for (let i = 0; i < board.length; i++) {
    if (board[i][i] !== agent) break;
    if (i === board.length - 1) return true;
  }

  // for checking anti-diagonals
  for (let i = 0; i < board.length; i++) {
    if (board[i][board.length - 1 - i] !== agent) break;
    if (i === board.length - 1) return true;
  }

  return false;
};

export const winner = (board: Board): Player | null => {
  const isXWinner = isPlayerWinner(board, "X");
  const isOWinner = isPlayerWinner(board, "O");

  if (isXWinner) return "X";
  else if (isOWinner) return "O";
  else return null;
};

export const isGameTerminate = (board: Board): boolean => {
  if (winner(board) !== null) return true;

  for (let row in board) {
    for (let col in board[row]) {
      if (board[row][col] === null) return false;
    }
  }

  return true;
};

export const getPlayer = (board: Board): Player => {
  const xCount = board.flat().filter((p) => p === "X").length;
  const oCount = board.flat().filter((p) => p === "O").length;
  return xCount <= oCount ? "X" : "O";
};

const availableMoves = (board: Board) => {
  if (isGameTerminate(board)) return null;

  const moves: [number, number][] = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === null) moves.push([i, j]);
    }
  }

  return moves;
};

export const moveResult = (board: Board, move: [number, number]) => {
  const [row, col] = move;

  if (availableMoves(board)?.some((m) => m[0] === row && m[1] === col)) {
    const newBoard = board.map((row) => [...row]);
    1;
    newBoard[row][col] = getPlayer(board);
    return newBoard;
  }
};

const getScore = (board: Board) => {
  const wAgent = winner(board);
  if (wAgent === "X") return 1;
  else if (wAgent === "O") return -1;
  else return 0;
};

const minVal = (board: Board, depth: number, alpha: number, beta: number) => {
  if (isGameTerminate(board)) return getScore(board);

  let v = Infinity;

  for (let move of availableMoves(board)!) {
    v = Math.min(v, maxVal(moveResult(board, move)!, depth + 1, alpha, beta));
    if (v <= alpha) return v;
    beta = Math.min(beta, v);
  }

  return v;
};

const maxVal = (board: Board, depth: number, alpha: number, beta: number) => {
  if (isGameTerminate(board)) return getScore(board);

  let v = -Infinity;

  for (let move of availableMoves(board)!) {
    v = Math.max(v, minVal(moveResult(board, move)!, depth + 1, alpha, beta));
    if (v >= beta) return v;
    alpha = Math.max(alpha, v);
  }

  return v;
};

export const minimax = (board: Board) => {
  if (isGameTerminate(board)) return null;

  const agent = getPlayer(board);
  let bestMove: [number, number] | null = null;

  if (agent === "X") {
    let bestScore = -Infinity;
    for (let move of availableMoves(board)!) {
      const score = minVal(moveResult(board, move)!, 0, bestScore, Infinity);
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let move of availableMoves(board)!) {
      const score = maxVal(moveResult(board, move)!, 0, -Infinity, bestScore);
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
  }

  return bestMove;
};
