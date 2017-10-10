    export class LcSubCategory {
        lcSubCategoryId: number;
        lcSubCategoryName: string;
        checked: boolean = false;
    }

    export class CategoriesResponse {
        lcCategoryId: number;
        lcCategoryName: string;
        lcSubCategories: LcSubCategory[];
    }

    export class CateogriesRootObject {
        categoriesResponse: CategoriesResponse[];
    }