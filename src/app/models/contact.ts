export interface Email {
  email: string;
  label?: string | null;
  is_primary?: boolean;
}

export interface Phone {
  number: string;
  label?: string | null;
  is_primary?: boolean;
}

export interface Address {
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
}

export interface Contact {
  id?: number;
  name: string;
  birthday: string;
  notes?: string | null;
  website?: string | null;
  company?: string | null;
  emails: Email[];
  phones?: Phone[];
  addresses?: Address[];
}
