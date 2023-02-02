import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Contact } from '../model/contact.model';
import { Move, User } from '../model/user.model'
import { StorageService } from './storage.service';



const USERS = [
    {
        "_id": "5a56640269f443a5d64b32ca",
        "name": "Moshe Hyde",
        "coins": 100,
        "imgUrl": '',
        "moves" : []
    },
];



@Injectable({
    providedIn: 'root'
})
export class UserService {

    //mock the server
    private _usersDb: User[] = USERS;

    private _users$ = new BehaviorSubject<User[]>([])
    public users$ = this._users$.asObservable()

    constructor(private storageService: StorageService) {
    }

    getUser() {
        return of(this.storageService.load('user'))
    }

    signup(name: string) {
        const user = {
            _id: getRandomId(),
            name: name,
            coins: 100,
            moves: [],
            imgUrl: `https://robohash.org/set_set5/${Math.random() + 20}.png`,
        }
        this.storageService.save('user', user)
        return Promise.resolve()
    }

    addMove(contact: Contact, amount: number) {
        const user = this.storageService.load('user')
        if (user.coins < amount) return console.log('Not enough money');
        const move = {
            fromId: user._id,
            toId: contact._id,
            to: contact.name,
            at: new Date(),
            amount
        }
        user.coins =user.coins - +amount
        user.moves.push(move)
        this.storageService.save('user', user)
        const moves = this.storageService.load('move') || []
        moves.unshift(move)
        this.storageService.save('move', moves)
        return Promise.resolve(move)
    }

    getUserMoves() {
        return of(this.storageService.load('move'))
    }

    public loadUsers(filterBy: { term: string }): void {
        let users = this._usersDb;
        if (filterBy && filterBy.term) {
            users = this._filter(users, filterBy.term)
        }
        this._users$.next(this._sort(users))
    }


    public getUserById(id: string): Observable<User> {
        //mock the server work
        const user = this._usersDb.find(user => user._id === id)

        //return an observable
        return user ? of(user) : throwError(() => `User id ${id} not found!`)
    }

    public deleteUser(id: string) {
        //mock the server work
        this._usersDb = this._usersDb.filter(user => user._id !== id)

        // change the observable data in the service - let all the subscribers know
        this._users$.next(this._usersDb)
    }

    public saveUser(user: User) {
        return user._id ? this._updateUser(user) : this._addUser(user)
    }

    private _updateUser(user: User) {
        //mock the server work
        this._usersDb = this._usersDb.map(c => user._id === c._id ? user : c)
        // change the observable data in the service - let all the subscribers know
        this._users$.next(this._sort(this._usersDb))
    }

    private _addUser(user: User) {
        //mock the server work
        const newUser = new User(user.name);
        if (typeof newUser.setId === 'function') newUser.setId(getRandomId());
        this._usersDb.push(newUser)
        this._users$.next(this._sort(this._usersDb))
    }

    private _sort(users: User[]): User[] {
        return users.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1;
            }

            return 0;
        })
    }

    private _filter(users: User[], term: string) {
        term = term.toLocaleLowerCase()
        return users.filter(user => {
            return user.name.toLocaleLowerCase().includes(term)
        })
    }
}


function getRandomId(length = 8): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    return result;
}