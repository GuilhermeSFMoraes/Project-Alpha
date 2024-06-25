import { ComponentProps } from "react";

interface ITableRowProps extends ComponentProps<'tr'>{}

export const TableRow = (props: ITableRowProps) => {
    return (
        <tr {...props} className='border border-white/10 rounded-lg hover:bg-white/5' />
    );
}