declare global {
    interface Theater {
        id: number,
        name: string,
        address: number,
        capacity: string,
        schedules: Schedule[] | null,
    }
}

export {}