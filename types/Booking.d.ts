declare global {
    interface Booking {
        id: number;
        amount: number;
        status: string;
        customer: Customer;
        schedule: Schedule;
        bookingSeats: BookingSeat[];
        tickets: Ticket[]
    }

    interface BookingSeat {
        id: number;
        seat: Seat;
    }

    interface Ticket {
        id: number
        ticketNumber: string
        seat: Seat
        bookingSeat: BookingSeat
    }
}

export {}