import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Classes, PageProps } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import StudentForm from '@/Components/StudentForm';

export default function Create({ auth, classes }: PageProps & { classes: { data: Classes[] } }) {
    const [sections, setSections] = useState<Classes[]>([]);

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        class_id: '',
        section_id: '',
    });

    useEffect(() => {
        if (data.class_id) {
            axios.get(route('sections.index', { class_id: data.class_id })).then(
                (response) => {
                    setSections(response.data.data);
                }
            )
        }
    }, [data.class_id])

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post(route('students.store'))
    }

    console.log(classes);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Student</h2>}
        >
            <Head title="Dashboard" />

            <StudentForm classes={classes} />
        </AuthenticatedLayout>
    );
}
