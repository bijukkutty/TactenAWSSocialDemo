export class ProfileLocationDtls {
        profileCountryName: string;
        profileStateName: string;
        profileCityName: string;
    }

export class LcContribution {
        lcContributionId: number;
        createDate?: any;
        createUser?: any;
        updateDate?: any;
        updateUser?: any;
}

 export class LcPortfolio {
        lcPortfolioId: number;
        createDate?: any;
        createUser?: any;
        lcPortfolioKey: string;
        lcPortfolioValue: string;
        updateDate?: any;
        updateUser?: any;
    }
export class LcSubCategory {
        lcSubCategoryId: number;
        lcSubCategoryName: string;
    }

export class LcProfileContibsXref {
        lcProfileContibXrefId: number;
        lcSubCategory: LcSubCategory;
    }


 export class LcSubCategory2 {
        lcSubCategoryId: number;
        lcSubCategoryName: string;
    }

export class LcProfileInterestsXref {
        lcProfileInterestId: number;
        lcSubCategory: LcSubCategory2;
    }

export class LcRecommendation {
        lcRecommendationId: number;
        createDate?: any;
        createUser?: any;
        lcRecommendationText: string;
        updateDate?: any;
        updateUser?: any;
    }

export class LcSocial {
        lcSocialId: number;
        createDate?: any;
        createUser?: any;
        lcSocialKey: string;
        lcSocialValue: string;
        updateDate?: any;
        updateUser?: any;
    }

export class ProfileRootObject {
        lcProfileId: number;
        createDate?: any;
        createUser?: any;
        lcProfilePhoto?: any;
        lcProfileStatement: string;
        lcProfileTellAbtYrself: string;
        lcProfileTitle: string;
        lcUserName: string;
        lcProfileVideo?: any;
        lcProfileVideoUrl?: any;
        updateDate?: any;
        updateUser?: any;
        lcContributions: LcContribution[];
        lcPortfolios: LcPortfolio[];
        lcProfileContibsXrefs: LcProfileContibsXref[];
        lcProfileInterestsXrefs: LcProfileInterestsXref[];
        lcRecommendations: LcRecommendation[];
        lcSocials: LcSocial[];
    }

export class RootObject {
        profileLocationDtls: ProfileLocationDtls;
        profileRootObject: ProfileRootObject;
    }