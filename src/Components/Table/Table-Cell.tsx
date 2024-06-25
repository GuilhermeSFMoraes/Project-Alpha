import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge'

interface ITableCellProps extends ComponentProps<'td'> {}

export const TableCell = (props: ITableCellProps) => {
    return (
        <td {...props}  className={twMerge('py-3 px-4 text-sm text-zinc-300', props.className)} />
    );
}