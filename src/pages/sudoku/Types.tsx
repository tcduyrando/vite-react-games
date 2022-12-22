export type SCell = {
    rowNum: number;
    colNum: number;
    value: string;
    readonly: boolean;
};

export type SRow = {
    rowNum: number;
    cells: SCell[];
};

export type SBoard = {
    difficulty: string;
    rows: SRow[];
};
