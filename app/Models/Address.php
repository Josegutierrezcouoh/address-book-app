<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{

use HasFactory;

protected $fillable = [
    'contact_id',
    'street',
    'city',
    'state',
    'postal_code',
    'country',
];
public function contact() {
    return $this->belongsTo(Contact::class);
}
}
