<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Requests\ContactRequest;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->validate([
            'search' => 'nullable|string|max:100'
        ])['search'] ?? null;

        return Contact::with(['phones','emails','addresses'])
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhereHas('emails', fn($emails) => $emails->where('email', 'like', "%{$search}%"))
                      ->orWhereHas('phones', fn($phones) => $phones->where('number', 'like', "%{$search}%"))
                      ->orWhereHas('addresses', fn($addresses) =>
                          $addresses->where('city', 'like', "%{$search}%")
                            ->orWhere('street', 'like', "%{$search}%")
                      );
            })
            ->latest()
            ->paginate(50);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request)
    {
        $validated = $request->validated();
        
        return DB::transaction(function () use ($validated) {
            
            $contact = Contact::create($validated);
            
            $contact->emails()->createMany($validated['emails']);
            $contact->phones()->createMany($validated['phones'] ?? []);
            $contact->addresses()->createMany($validated['addresses'] ?? []);
            
            return $contact->load(['phones','emails','addresses']);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return $contact->load(['phones','emails','addresses']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactRequest $request, Contact $contact)
    {
        $validated = $request->validated();
        
        return DB::transaction(function () use ($validated, $contact) {
            $contact->update($validated);
            
            $contact->emails()->delete();
            $contact->phones()->delete();
            $contact->addresses()->delete();
            
            $contact->emails()->createMany($validated['emails']);
            $contact->phones()->createMany($validated['phones'] ?? []);
            $contact->addresses()->createMany($validated['addresses'] ?? []);
            
            return $contact->load(['phones','emails','addresses']);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->noContent();
    }

    public function byCity(string $city)
    {
        return Contact::with(['phones','emails','addresses'])
            ->whereHas('addresses', fn($a) => $a->where('city', $city))
            ->latest()
            ->get();
    }

    public function search(Request $request)
    {
        return $this->index($request);
    }
}
