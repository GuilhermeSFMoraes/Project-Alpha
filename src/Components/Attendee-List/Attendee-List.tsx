import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { IconButton } from '../Icon-Button/Icon-Button';
import { Table } from '../Table/Table';
import { TableHeader } from '../Table/Table-Header';
import { TableCell } from '../Table/Table-Cell';
import { TableRow } from '../Table/Table-Row';
import { ChangeEvent, useState } from 'react';
import { attendees } from '../../Data/Attendees';

dayjs.extend(relativeTime);
dayjs.locale('pt-br')

export const AttendeeList = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1)

    const totalPage = Math.ceil(attendees.length / 10)

    const onSearchInputChanged = (e: ChangeEvent<HTMLInputElement>) => {

        setSearch(e.target.value);
    };

    const goToFirstPage = () => {
        setPage(1);
    }

    const goToNextPage = () => {
        setPage(page + 1);
    };

    const goToPreviousPage = () => {
        if (page === 1) {
            return;
        }
        setPage(page - 1);
    };

    const goToLastPage = () => {
        setPage(totalPage);
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4" />
                    <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" type="text" placeholder="Buscar participante..." />
                </div>
            </div>

            <Table >
                <thead>
                    <tr className='border-b border-white/10 '>
                        <TableHeader style={{ width: 64 }} >
                            <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10' name="" id="" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participantes</TableHeader>
                        <TableHeader>Data da inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
                        return (
                            <TableRow key={attendee.id} >
                                <TableCell>
                                    <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10' name="" id="" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className='flex flex-col gap-1'>
                                        <span className='font-semibold text-white'>{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createAt)}</TableCell>
                                <TableCell>{dayjs().to(attendee.createInAt)}</TableCell>
                                <TableCell>
                                    <IconButton trasparent={true} >
                                        <MoreHorizontal className='size-4' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className='border border-white/10 rounded-lg'>
                        <TableCell className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        <TableCell className='text-right' colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <span>Página {page} de {totalPage}</span>

                                <div className='flex gap-1.5'>
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPage}>
                                        <ChevronRight className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPage}>
                                        <ChevronsRight className='size-4' />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>


    );
}