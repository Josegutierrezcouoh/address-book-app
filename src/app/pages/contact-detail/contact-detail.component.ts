import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
  contact?: Contact;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.loading = true;
    this.contactsService.get(id).subscribe({
      next: (c) => (this.contact = c),
      error: (err) => console.error(err),
      complete: () => (this.loading = false),
    });
  }

  back() { this.router.navigate(['/']); }
  edit() { if (this.contact?.id) this.router.navigate(['/contacts', this.contact.id, 'edit']); }
}
