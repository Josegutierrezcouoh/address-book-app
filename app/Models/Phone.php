<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Phone extends Model
{

use HasFactory;

protected $fillable = [
    'contact_id',
    'number',
    'type'
];

public function contact() {
    return $this->belongsTo(Contact::class);
}
}
