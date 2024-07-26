import {ChangeDetectionStrategy, Component, Signal} from '@angular/core';
import {CommonModule, TitleCasePipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {UsersService} from "../shared/users.service";
import {User} from "../shared/users.interface";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    TitleCasePipe,
      CommonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush


})
export class UsersListComponent {

  usersSignal :Signal<Partial<User>[]>;

  constructor(private usersService: UsersService) {
    this.usersSignal  = toSignal(this.usersService.getUsers());
  }

  formatUrl(url: string): string {
    return url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  }
}
