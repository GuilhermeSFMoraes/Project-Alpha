import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { IconButton } from '../Icon-Button/Icon-Button';
import { Table } from '../Table/Table';
import { TableHeader } from '../Table/Table-Header';
import { TableCell } from '../Table/Table-Cell';
import { TableRow } from '../Table/Table-Row';
import { ChangeEvent, useEffect, useState } from 'react';
import { ur } from '@faker-js/faker';


dayjs.extend(relativeTime);
dayjs.locale('pt-br')

interface IAttende {
    id: string,
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}

export const AttendeeList = () => {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString());
        
        if (url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? '';
        }

        return 1
    });
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString());
        
        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'));
        }

        return 1
    })
    const [attendees, setAttendees] = useState<IAttende[]>([])
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees');

        url.searchParams.set('pageIndex', String(page - 1));
        
        if (search.length > 0) {
            url.searchParams.set('query', search)
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAttendees(data.attendees)
                setTotal(data.total);
            })
    }, [page, search])

    const setCurrentSearch = (search: string) => {
        const url = new URL(window.location.toString());

        url.searchParams.set('search', search);

        window.history.pushState({}, '', url);

        setSearch(search);
    }

    const setCurrentPage = (page:number) => {
        const url = new URL(window.location.toString());

        url.searchParams.set('page', String(page));

        window.history.pushState({}, '', url);

        setPage(page)
    }

    const totalPage = Math.ceil(total / 10)

    const onSearchInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentSearch(e.target.value);
        setCurrentPage(1);
    };

    const goToFirstPage = () => {
        setCurrentPage(1)
    }

    const goToNextPage = () => {
        setCurrentPage(page + 1)
    };

    const goToPreviousPage = () => {
        if (page === 1) {
            return;
        }
        setCurrentPage(page - 1);
    };

    const goToLastPage = () => {
        setAttendees(totalPage)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4" />
                    <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" type="text" placeholder="Buscar participante..." value={search}/>
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
                    {attendees.map((attendee) => {
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
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{attendee.checkedInAt === null
                                    ? <span className='text-zinc-500'>'Não fez check-in'</span>
                                    : dayjs().to(attendee.checkedInAt)}
                                </TableCell>
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
                            Mostrando {attendees.length} de {total} itens
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