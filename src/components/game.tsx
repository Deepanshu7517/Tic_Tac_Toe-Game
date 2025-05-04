import { useState } from 'react';

// Create initial 3x3 board
const initialBoard = (): string[][] =>
    Array.from({ length: 3 }, () => Array(3).fill("_"));

const Game = () => {
    const [Board, setBoard] = useState<string[][]>(initialBoard());
    const [CurrentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [Winner, setWinner] = useState<string | null>(null);

    const handleMove = (row: number, col: number) => {
        if (Board[row][col] !== "_" || Winner) return;

        const newBoard = Board.map((r) => [...r]);
        newBoard[row][col] = CurrentPlayer;
        setBoard(newBoard);

        const winner = checkWin(newBoard);
        if (winner) {
            setWinner(winner);
        } else {
            setCurrentPlayer(CurrentPlayer === "X" ? "O" : "X");
        }
    };

    const checkWin = (board: string[][]): string | null => {
        const lines = [
            // Rows
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            // Columns
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            // Diagonals
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]],
        ];

        for (const line of lines) {
            if (line[0] !== "_" && line.every((cell) => cell === line[0])) {
                return line[0];
            }
        }

        // Check for draw
        if (board.every((row) => row.every((cell) => cell !== "_"))) {
            return "Draw";
        }

        return null;
    };

    const handleReset = () => {
        setBoard(initialBoard());
        setCurrentPlayer("X");
        setWinner(null);
    };

    return (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] font-sans max-w-[300px] m-auto text-center rounded-2xl p-1 border-2 border-white bg-[#2C2C2C]">
            <div className="status text-xl flex justify-between items-center mb-5 px-2">
                <h2 className="font-semibold text-2xl text-[#E0E0E0]">
                    {Winner
                        ? Winner === "Draw"
                            ? "It's a Draw!"
                            : `Player ${Winner} Wins!`
                        : (
                            <>
                                Player <span className={CurrentPlayer === "X" ? "text-[#00BCD4]" : "text-[#FFB300]"}>
                                    {CurrentPlayer}
                                </span> Turn
                            </>
                        )}
                </h2>
                <button
                    onClick={handleReset}
                    className="rounded-full p-2 m-1 text-sm font-bold border-2 border-white text-[#FFFFFF] bg-[#3F51B5] hover:bg-[#5C6BC0] cursor-pointer"
                >
                    Reset Game
                </button>
            </div>
            <div className="board grid grid-cols-3 justify-center">
                {Board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const rounded =
                            rowIndex === 0 && colIndex === 0
                                ? "rounded-tl-2xl"
                                : rowIndex === 0 && colIndex === 2
                                    ? "rounded-tr-2xl"
                                    : rowIndex === 2 && colIndex === 0
                                        ? "rounded-bl-2xl"
                                        : rowIndex === 2 && colIndex === 2
                                            ? "rounded-br-2xl"
                                            : "";

                        const textColor = cell === "X"
                            ? "text-[#00BCD4]"
                            : cell === "O"
                                ? "text-[#FFB300]"
                                : "text-[#E0E0E0]";

                        return (
                            <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleMove(rowIndex, colIndex)}
                                className={`w-24 h-24 text-3xl font-bold border-2 border-[#444444] bg-[#2C2C2C] hover:bg-[#004D56] transition-colors duration-300 ease-in-out ${rounded} ${textColor}`}
                            >
                                {cell === "_" ? "" : cell}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Game;
