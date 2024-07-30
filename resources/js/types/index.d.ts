export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Student {
    id: number;
    name: string;
    email: string;
    class: {
        id: number;
        name: string;
    };
    section: {
        id: number;
        name: string;
    }
    created_at: string;
}

export interface Classes {
    id: number;
    class_id: number;
    name: string;
}

export interface Role {
    id: number;
    title: string;
    permissions: Permission[];
}

export interface Permission {
    id: number;
    title: string;
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[]
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PermissionHandler {
    role_create: boolean,
    role_edit: boolean,
    role_show: boolean,
    role_delete: boolean,
    role_access: boolean,
    student_create: boolean,
    student_edit: boolean,
    student_show: boolean,
    student_delete: boolean,
    student_access: boolean,
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface StudentPageProps extends PageProps {
    students: {
        data: Student[],
        links: PaginationLinks,
        meta: PaginationMeta,
    },
    classes: {
        data: Classes[],
    }
}

export interface RolePageProps extends PageProps {
    roles: {
        data: Role[],
        links: PaginationLinks,
        meta: PaginationMeta,
    },
}
