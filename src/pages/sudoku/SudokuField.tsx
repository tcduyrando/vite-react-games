import { SCell } from "./Types";

type Props = {
    cell: SCell;
    handleCellChange: (
        rowNum: number,
        colNum: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

function SudokuField({ cell, handleCellChange }: Props) {
    return (
        <>
            <td id="sudoku" key={cell.colNum}>
                <input
                    id="sudoku"
                    className="field"
                    value={cell.value}
                    readOnly={cell.readonly}
                    maxLength={1}
                    autoComplete="off"
                    onChange={(event) =>
                        handleCellChange(cell.rowNum, cell.colNum, event)
                    }
                ></input>
            </td>
        </>
    );
}

export default SudokuField;
