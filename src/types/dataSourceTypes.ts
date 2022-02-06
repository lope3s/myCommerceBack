export interface IGetCurrencieConversion {
    currency_base: string;
    currency_quote: string;
    ratio: number;
    rate: number;
    inv_rate: number;
    creation_date: string;
    valid_until: string;
}

export interface ICategory {
    id: string;
    name: string;
}

export interface ICategoriesDetails {
    id: string;
    name: string;
    picture: string;
    permalink: string;
    total_items_in_this_category: number;
    path_from_root: { id: string; name: string }[];
    children_categories: {
        id: string;
        name: string;
        total_items_in_this_category: number;
    }[];
    attribute_types: string;
    settings: {
        adult_content: boolean;
        buying_allowed: boolean;
        buying_modes: string[];
        catalog_domain: string;
        coverage_areas: string;
        currencies: string[];
        fragile: boolean;
        immediate_payment: string;
        item_conditions: string[];
        items_reviews_allowed: boolean;
        listing_allowed: boolean;
        max_description_length: number;
        max_pictures_per_item: number;
        max_pictures_per_item_var: number;
        max_sub_title_length: number;
        max_title_length: number;
        max_variations_allowed: number;
        maximum_price: null;
        maximum_price_currency: string;
        minimum_price: number;
        minimum_price_currency: string;
        mirror_category: null;
        mirror_master_category: null;
        mirror_slave_categories: [];
        price: string;
        reservation_allowed: string;
        restrictions: [];
        rounded_address: boolean;
        seller_contact: string;
        shipping_modes: null;
        shipping_options: string[];
        shipping_profile: string;
        show_contact_information: boolean;
        simple_shipping: string;
        stock: string;
        sub_vertical: null;
        subscribable: boolean;
        tags: [];
        vertical: null;
        vip_subdomain: string;
        buyer_protection_programs: string[];
        status: string;
    };
    channels_settings: {
        channel: string;
        settings: {
            status: string;
            buying_modes: string[];
            immediate_payment: string;
            minimum_price: number;
        };
    }[];
    meta_categ_id: null;
    attributable: boolean;
    date_created: string;
}
