import SudokuField from "./SudokuField";
import { SBoard } from "./Types";

type Props = {
    currentBoard: SBoard | null;
    handleCellChange: (
        rowNum: number,
        colNum: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

function SudokuBoard({ currentBoard, handleCellChange }: Props) {
    return (
        <>
            <table id="sudoku">
                <tbody>
                    {currentBoard?.rows.map((row) => (
                        <tr id="sudoku" key={row.rowNum}>
                            {row.cells.map((cell) => (
                                <SudokuField
                                    key={cell.colNum}
                                    cell={cell}
                                    handleCellChange={handleCellChange}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default SudokuBoard;
