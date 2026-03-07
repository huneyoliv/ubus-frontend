export interface User {
    id: string
    name: string
    email: string
    institution: string
    course: string
    photoUrl?: string
}

export interface Trip {
    id: string
    date: string
    origin: string
    destination: string
    departureTime: string
    arrivalTime: string
    seatNumber: number
    status: 'confirmed' | 'pending' | 'cancelled'
    isRelocated?: boolean
}

export interface Seat {
    id: number
    row: number
    column: number
    status: 'available' | 'occupied' | 'selected' | 'blocked'
}
