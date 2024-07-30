import InputError from "@/Components/InputError";
import RoleForm from "@/Components/RoleForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Permission } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import Select, { MultiValue } from "react-select";

export default function Create({ auth, permissions }: PageProps & { permissions: { data: Permission[] } }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        selectedPermissions: [] as MultiValue<{ value: number; label: string }>,
    });

    console.log(permissions);

    const options = permissions.data.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("roles.store"));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Role
                </h2>
            }
        >
            <Head title="Create Role" />

            <RoleForm permissions={{ data: permissions.data }} />
        </AuthenticatedLayout>
    )
}