export interface Category {
    id: String;
    name: String;
}

export interface IJoinedCategoryData {
    mainCategory: Category;
    childrenCategories: Category[];
}
