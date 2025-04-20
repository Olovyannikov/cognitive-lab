export interface BlogPost {
    id: string;
    title: string;
    image: string;
    thumbnail_image: string;
    body: {
        data: string;
    };
    pinned: boolean;
    show_on_main: boolean;
    additional_info: null;
    created_at: string;
    updated_at: string;
}
