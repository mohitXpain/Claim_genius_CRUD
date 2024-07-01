export interface Users {
    id?: number;
    first_name?: string;
    last_name?: string;
    dob?: string;
    mno?: string;
    address?: string;
    totalCount?: number;
}


export interface API {
    Search?: string;
    SortCol?: string;
    SortDir?: string;
    Page?: number;
    Limit?: number;
}

export interface SearchResult {
    data?: Users[];
    totalCount?: number;
}
