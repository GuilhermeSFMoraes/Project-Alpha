import { ComponentProps } from "react";

interface ITableHeaderProps extends ComponentProps<'th'>{}

export const TableHeader = (props: ITableHeaderProps) => {
    return (
        <th {...props} className='py-3 px-4 text-sm font-semibold text-left'></th>
    );
}