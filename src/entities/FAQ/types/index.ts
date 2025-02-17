interface FaqItemBody {
    data: string;
}

export interface FaqItem {
    id: string;
    title: string;
    thumbnail_image: string | null;
    image: string | null;
    body: FaqItemBody;
    pinned: boolean;
    show_on_main: boolean;
    additional_info: null;
    created_at: string;
    updated_at: string;
}
