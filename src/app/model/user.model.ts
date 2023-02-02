export class User {

    constructor(
        public _id?: string,
        public name: string = '',
        public coins: number = 100,
        public moves: object[] = [],
        public imgUrl: string = '',
    ) {
    }

    setId?(id: string = 'r101') {
        // Implement your own set Id
        this._id = id
    }
}

export class Move {

    constructor(
        public toId: string,
        public to: string,
        public at: Date, 
        public amount : number
    ) {
    }

    // setId?(id: string = 'r101') {
    //     // Implement your own set Id
    //     this._id = id
    // }
}
