<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class Contact extends Model
{


use HasFactory;

protected $fillable = [
    'user_id',
    'name',
    'notes',
    'birthday',
    'website',
    'company',
];

public function phones() {
    return $this->hasMany(Phone::class);
}

public function emails() {
    return $this->hasMany(Email::class);
}

public function addresses() {
    return $this->hasMany(Address::class);
}

}
