declare global {
    interface Movie {
        id: number,
        title: string,
        genre: string,
        rating: number,
        duration: number
        image: string,
    }
}

export {}