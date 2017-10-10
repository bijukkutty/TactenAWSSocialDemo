export class LcCountry {
    lcCountryId: number;
}

export class LcState {
    lcStateId: number;
}

export class LcCity {
    lcCityId: number;
}

export class LcPortfolio {
    createDate?: any;
    createUser?: any;
    lcPortfolioKey: string;
    lcPortfolioValue: string;
    updateDate?: any;
    updateUser?: any;
}

export class LcSocial {
    createDate?: any;
    createUser?: any;
    lcSocialKey: string;
    lcSocialValue: string;
    updateDate?: any;
    updateUser?: any;
}

export class LcSubCategory {
    lcSubCategoryId: number;
}

export class LcProfileContibsXref {
    lcSubCategory: LcSubCategory;
}

export class LcProfileInterestsXref {
    lcSubCategory: LcSubCategory;
}

export class ProfileRootObject {
    createDate?: any;
    createUser?: any;
    lcProfileStatement: string;
    lcProfileTellAbtYrself: string;
    lcProfileTitle: string;
    lcProfileVideo?: any;
    lcProfileVideoUrl: string;
    lcUserName: string;
    updateDate?: any;
    updateUser?: any;
    lcCountry: LcCountry;
    lcState: LcState;
    lcCity: LcCity;
    lcPortfolios: LcPortfolio[];
    lcSocials: LcSocial[];
    lcProfileContibsXrefs: LcProfileContibsXref[];
    lcProfileInterestsXrefs: LcProfileInterestsXref[];
}

