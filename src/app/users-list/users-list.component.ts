import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, TitleCasePipe} from "@angular/common";
import {UsersService} from "../shared/users.service";
import {SortingDirection, SortingType, User} from "../shared/users.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserModalComponent} from "../user-modal/user-modal.component";
import {Observable} from "rxjs";
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
        this.users$ = this.usersService.getUsers(this.sortingType, this.sortingDirection);
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

    sortUsers(sortingType: SortingType): void {
        if (this.sortingType === sortingType) {
            this.sortingDirection = this.sortingDirection === 'asc' ? 'des' : 'asc';
        } else {
            this.sortingType = sortingType;
            this.sortingDirection = 'asc';
        }
        this.users$ = this.usersService.getUsers(this.sortingType, this.sortingDirection);
    }
}
