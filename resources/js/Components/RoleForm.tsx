import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Permission, Role } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import Select, { MultiValue } from "react-select";


export default function RoleForm({ role, permissions }: { role?: Role, permissions: { data: Permission[] } }) {
    const selectedPermissions = role?.permissions.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    const { data, setData, post, put, processing, errors } = useForm({
        title: role ? role.title : '',
        selectedPermissions: role ? selectedPermissions : [] as MultiValue<{ value: number; label: string }>,
    });

    console.log(role);

    const options = permissions.data.map((permission) => {
        return {
            value: permission.id,
            label: permission.title,
        };
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (role) {
            put(route("roles.update", role.id));
        } else {
            post(route("roles.store"));
        }
    }

    return (
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                    <form onSubmit={submit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Role Information
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {role ? "Use this form to update this role." : "Use this form to create a new role."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            id="title"
                                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.title
                                                ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"
                                                : ""
                                                }`}
                                        />
                                        <InputError
                                            message={errors.title}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="permissions"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Permissions
                                        </label>
                                        <Select
                                            defaultValue={selectedPermissions}
                                            onChange={(
                                                selectedPermissions
                                            ) => {
                                                setData(
                                                    "selectedPermissions",
                                                    selectedPermissions
                                                );
                                            }}
                                            isMulti
                                            options={options}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                                <Link
                                    href={route("roles.index")}
                                    className="inline-flex items-center px-4 py-2 mr-4 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {role ? "Update" : "Create"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
