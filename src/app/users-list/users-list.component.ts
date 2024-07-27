import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {CommonModule, TitleCasePipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {UsersService} from "../shared/users.service";
import {User} from "../shared/users.interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserModalComponent} from "../user-modal/user-modal.component";

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
export class UsersListComponent {

    usersSignal: Signal<Partial<User>[]>;
    private dialogRef: MatDialogRef<UserModalComponent> | null = null;


    constructor(private usersService: UsersService, private dialog: MatDialog) {
        this.usersSignal = toSignal(this.usersService.getUsers());
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
        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogRef.close();
        })
    }
}
