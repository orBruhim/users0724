import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SortingDirection, SortingType, User} from "./users.interface";
import {map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class UsersService {

    constructor(private http: HttpClient) {
    }

    url = 'https://jsonplaceholder.typicode.com/users'


    getUsers(sortingType: SortingType, sortingDirection: SortingDirection = 'asc'): Observable<Partial<User>[]> {
        return this.http.get<Partial<User[]>>(this.url).pipe(
            map(users => users.map(({id, name, email, phone, website}) => ({
                id,
                name,
                email,
                phone,
                website
            })).sort((a: Partial<User>, b: Partial<User>) =>
                sortingDirection === 'asc'
                    ? a[sortingType].localeCompare(b[sortingType])
                    : b[sortingType].localeCompare(a[sortingType])
            ))
        );
    }
}
