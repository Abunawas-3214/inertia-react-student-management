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
