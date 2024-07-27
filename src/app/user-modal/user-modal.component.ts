import {Component, inject, OnInit} from '@angular/core';
import {User} from "../shared/users.interface";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';


@Component({
    selector: 'app-user-modal',
    standalone: true,
    imports: [
        MatDialogContent,
        MatFormField,
        MatDialogTitle,
        ReactiveFormsModule,
        MatDialogActions,
        MatInputModule,
        CommonModule,
        MatButtonModule,
    ],
    templateUrl: './user-modal.component.html',
    styleUrl: './user-modal.component.scss'
})
export class UserModalComponent implements OnInit {
    userForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
    }
    readonly dialogRef = inject(MatDialogRef<UserModalComponent>);
    readonly user = inject<User>(MAT_DIALOG_DATA);

    ngOnInit() :void {
        const urlRegex= '(https:\\/\\/www\\.|http:\\/\\/www\\.|https:\\/\\/|http:\\/\\/)?[a-zA-Z0-9]{2,}(\\.[a-zA-Z0-9]{2,})(\\.[a-zA-Z0-9]{2,})?';
        const israeliPhoneRegex= '^\\+?(972|0)(\\-)?0?(([23489]{1}\\d{7})|[5]{1}\\d{8})$'
        this.userForm = this.fb.group({
            name: [this.user.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
            email: [{ value: this.user.email, disabled: true }, Validators.required],
            phone: [this.user.phone, [Validators.required, Validators.pattern(israeliPhoneRegex)]],
            website: [this.user.website, Validators.pattern(urlRegex)]
        });
    }

    saveUser() :void {
        if (this.userForm.valid) {
            // Handle saving user data here- Send PUT request when there is a real BE
            this.close()
        }
    }

    close() :void {
        this.dialogRef.close();
    }
}
