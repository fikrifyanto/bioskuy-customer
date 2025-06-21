declare global {
    interface Schedule {
        id: number,
        movie: Movie,
        theater: Theater,
        startTime: Date,
        endTime: Date,
        price: number
    }
}

export {}