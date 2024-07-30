<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('role_access');
        $roles = Role::paginate(10);

        return inertia('Role/Index', [
            'roles' => RoleResource::collection($roles),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('role_create');
        $permissions = PermissionResource::collection(Permission::all());

        return inertia('Role/Create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        Gate::authorize('role_create');
        $role = Role::create($request->validated());

        $permissions = collect($request->selectedPermissions)->map(function ($permission) {
            return $permission['value'];
        });

        $role->permissions()->sync($permissions);

        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        Gate::authorize('role_edit');
        $role->load('permissions');
        $permissions = PermissionResource::collection(Permission::all());

        return inertia('Role/Edit', [
            'role' => RoleResource::make($role),
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        Gate::authorize('role_edit');
        $role->update($request->validated());

        $permissions = collect($request->selectedPermissions)->map(function ($permission) {
            return $permission['value'];
        });

        $role->permissions()->sync($permissions);

        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('role_delete');
        $role->delete();

        return redirect()->route('roles.index');
    }
}
