import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];
  loading = false;

  search = '';
  private search$ = new Subject<string>();
  page = 1;
  lastPage = 1;
  total = 0;
  perPage = 50;

  constructor(private contactsService: ContactsService, private router: Router) {}

  ngOnInit(): void {
    this.load(1);

    this.search$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.search = value ?? '';
        this.load(1);
      });
  }

  onSearchChange(value: string) {
    this.search$.next(value);
  }

  load(page: number = 1) {
    this.loading = true;
    this.contactsService.list(this.search, page).subscribe({
      next: (res: any) => {
        this.contacts = res.data ?? [];
        this.page = res.current_page ?? page;
        this.lastPage = res.last_page ?? 1;
        this.total = res.total ?? 0;
        this.perPage = res.per_page ?? 50;
      },
      error: (err) => { 
        console.error(err); 
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    });
  }

  prev() {
    if (this.page > 1) this.load(this.page - 1);
  }

  next() {
    if (this.page < this.lastPage) this.load(this.page + 1);
  }

  goTo(p: number) {
  if (p >= 1 && p <= this.lastPage) this.load(p);
}

get pages(): number[] {
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);

  let start = Math.max(1, this.page - half);
  let end = Math.min(this.lastPage, start + windowSize - 1);

  start = Math.max(1, end - windowSize + 1);

  const nums: number[] = [];
  for (let i = start; i <= end; i++) nums.push(i);
  return nums;
}

  add() {
    this.router.navigate(['/contacts/new']);
  }

  view(id?: number) {
    if (!id) return;
    this.router.navigate(['/contacts', id]);
  }

  edit(id?: number) {
    if (!id) return;
    this.router.navigate(['/contacts', id, 'edit']);
  }

  remove(id?: number) {
    if (!id) return;
    const ok = confirm('¿Eliminar este contacto?');
    if (!ok) return;

    this.contactsService.delete(id).subscribe({
      next: () => this.load(this.page),
      error: (err) => console.error(err),
    });
  }
}
