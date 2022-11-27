import useTicTacToe from "./hooks/useTicTacTeo";

function App() {
  const { board, aiTurn, move, isDraw, winner, reset } = useTicTacToe();

  return (
    <div className="w-full h-screen p-4 bg-gray-100 flex flex-col gap-y-4 items-center justify-center">
      {winner && (
        <>
          <h2 className="text-2xl font-semibold">
            {/* if you ever feel useless just remember I added condition to check if the user is the winner  */}
            {winner === "X" ? "You" : "AI"} won!
          </h2>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={reset}
          >
            Reset
          </button>
        </>
      )}
      {isDraw && (
        <>
          <h2 className="text-2xl font-semibold">Draw!</h2>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={reset}
          >
            Reset
          </button>
        </>
      )}
      {!winner && !isDraw && (
        <h2 className="text-2xl font-semibold">
          {aiTurn ? "AI's" : "Your"} turn
        </h2>
      )}
      <div className="w-96 h-96 grid grid-cols-3 grid-rows-3 gap-4">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className="w-full h-full border-2 border-gray-300 flex items-center justify-center text-6xl cursor-pointer"
              onClick={() => move(rowIndex, cellIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
