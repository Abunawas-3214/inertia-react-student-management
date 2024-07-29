import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Classes, PageProps, Student } from '@/types';
import StudentForm from '@/Components/StudentForm';

export default function Edit({ auth, student, classes }: PageProps & { student: { data: Student }, classes: { data: Classes[] } }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Update Student</h2>}
        >
            <Head title="Dashboard" />

            <StudentForm student={student.data} classes={classes} />
        </AuthenticatedLayout>
    )
}
