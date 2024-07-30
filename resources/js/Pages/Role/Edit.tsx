import RoleForm from "@/Components/RoleForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Permission, Role } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, role, permissions }: PageProps & { role: { data: Role }, permissions: { data: Permission[] } }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Role
                </h2>
            }
        >
            <Head title="Edit Role" />

            <RoleForm role={role.data} permissions={permissions} />
        </AuthenticatedLayout>
    )
}