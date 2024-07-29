import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, TitleCasePipe} from "@angular/common";
import {UsersService} from "../shared/users.service";
import {SortingDirection, SortingType, User} from "../shared/users.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {map, Observable} from "rxjs";
import {MatTable, MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        TitleCasePipe,
        CommonModule,
        MatTable,
        CdkTableModule,
        MatTableModule
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit {


    users$: Observable<Partial<User>[]>
    displayedColumns= ['name', 'email', 'phone', 'website'];
    sortingDirection: SortingDirection = 'asc';
    sortingType: SortingType = 'name';

    private dialogRef: MatDialogRef<UserModalComponent> | null = null;



    constructor(private usersService: UsersService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fetchUsers();
    }

    formatUrl(url: string): string {
        return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
    }

    openEditUserModal(user: Partial<User>) :void {
        if (this.dialogRef) {
            this.dialogRef.close();
        }

        this.dialogRef = this.dialog.open(UserModalComponent, {
            data: user,
        });

    }
    onSortChange(sortingType: SortingType): void {
        if (this.sortingType === sortingType) {
            this.sortingDirection = this.sortingDirection === 'asc' ? 'des' : 'asc';
        } else {
            this.sortingType = sortingType;
            this.sortingDirection = 'asc';
        }
        this.fetchUsers();
    }

    private fetchUsers(): void {
        this.users$ = this.usersService.getUsers().pipe(
            map(users => this.sortUsers(users, this.sortingType, this.sortingDirection))
        );
    }

    private sortUsers(users: Partial<User>[], sortingType: SortingType, sortingDirection: SortingDirection): Partial<User>[] {
        return users.sort((a: Partial<User>, b: Partial<User>) =>
            sortingDirection === 'asc'
                ? a[sortingType].localeCompare(b[sortingType])
                : b[sortingType].localeCompare(a[sortingType])
        );
    }
}
