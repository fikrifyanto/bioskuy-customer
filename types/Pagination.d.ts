declare global {
    interface PageableSort {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    }

    interface Pageable {
        pageNumber: number,
        pageSize: number,
        sort: PageableSort,
        offset: 0,
        paged: boolean,
        unpaged: boolean
    }

    interface Pagination<T> {
        content: T,
        pageable: Pageable,
        totalElements: number,
        totalPages: number,
        last: boolean,
        numberOfElements: number,
        size: number,
        number: number,
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        first: true,
        empty: boolean
    }
}

export {}