import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  loading = false;
  saving = false;

  id?: number;

  contact: Contact = {
    name: '',
    birthday: '',
    notes: null,
    website: null,
    company: null,
    emails: [{ email: '' }],
    phones: [],
    addresses: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : undefined;

    if (this.id) {
      this.loading = true;
      this.contactsService.get(this.id).subscribe({
        next: (c) => {
          this.contact = {
            ...c,
            emails: c.emails?.length ? c.emails : [{ email: '' }],
            phones: c.phones ?? [],
            addresses: c.addresses ?? [],
          };
        },
        error: (err) => console.error(err),
        complete: () => (this.loading = false),
      });
    }
  }

  back() { this.router.navigate(['/']); }

  addEmail() { this.contact.emails.push({ email: '' }); }
  removeEmail(i: number) { if (this.contact.emails.length > 1) this.contact.emails.splice(i, 1); }

  addPhone() { (this.contact.phones ??= []).push({ number: '' }); }
  removePhone(i: number) { this.contact.phones?.splice(i, 1); }

  addAddress() { (this.contact.addresses ??= []).push({ street: '', city: '' }); }
  removeAddress(i: number) { this.contact.addresses?.splice(i, 1); }

  save() {
    if (!this.contact.name.trim()) return alert('Nombre es obligatorio');
    if (!this.contact.birthday) return alert('Fecha de cumpleaños es obligatoria');
    if (!this.contact.emails?.length || !this.contact.emails[0].email.trim()) {
      return alert('Debes agregar al menos 1 email');
    }

    this.contact.emails = this.contact.emails.filter(e => e.email && e.email.trim().length > 0);
    this.contact.phones = (this.contact.phones ?? []).filter(p => p.number && p.number.trim().length > 0);
    this.contact.addresses = (this.contact.addresses ?? []).filter(a =>
      (a.street && a.street.trim().length > 0) || (a.city && a.city.trim().length > 0)
    );

    this.saving = true;

    const req = this.id
      ? this.contactsService.update(this.id, this.contact)
      : this.contactsService.create(this.contact);

    req.subscribe({
      next: (saved) => {
        const newId = saved.id;
        if (newId) this.router.navigate(['/contacts', newId]);
        else this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar (revisa consola)');
        this.saving = false;
      },
      complete: () => (this.saving = false),
    });
  }
}
