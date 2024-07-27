import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, TitleCasePipe} from "@angular/common";
import {UsersService} from "../shared/users.service";
import {SortingDirection, SortingType, User} from "../shared/users.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {Observable} from "rxjs";

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [
        TitleCasePipe,
        CommonModule,
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent implements OnInit{

    users$: Observable<Partial<User>[]>
    private dialogRef: MatDialogRef<UserModalComponent> | null = null;
    private sortingDirection: SortingDirection = 'asc';
    private sortingType: SortingType = 'name';

    constructor(private usersService: UsersService, private dialog: MatDialog) {
    }

    ngOnInit() :void {
        this.users$= this.usersService.getUsers(this.sortingType, this.sortingDirection);
    }

    formatUrl(url: string): string {
        return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
    }

    openEditUserModal(user: Partial<User>) {
        if (this.dialogRef) {
            this.dialogRef.close();
        }

        this.dialogRef = this.dialog.open(UserModalComponent, {
            data: user,
        });
        this.dialogRef.afterClosed().subscribe(() => {
            this.dialogRef.close();
        })
    }

    sortUsers(sortingType: SortingType) :void {
        if (this.sortingType === sortingType) {
            this.sortingDirection = this.sortingDirection === 'asc' ? 'des' : 'asc';
        } else {
            this.sortingType = sortingType;
            this.sortingDirection = 'asc';
        }
        this.users$ = this.usersService.getUsers(this.sortingType, this.sortingDirection);
    }
}
