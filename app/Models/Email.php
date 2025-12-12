<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Email extends Model
{

use HasFactory;

protected $fillable = [
    'contact_id',
    'email',
    'type',
];

public function contact() {
    return $this->belongsTo(Contact::class);
}
}
