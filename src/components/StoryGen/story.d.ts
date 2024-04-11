export type StoryType = "Short Story" | "Novella" | "Novel";

export declare interface IStoryOutline {
    title: string;
    genre: string;
    audience: string;
    length: StoryType;
    ending: string;
    setting: ISetting;
    themes: string[];
    characters: ICharacter[];
    plot: IPlot;
}

export declare interface ISetting {
    timePeriod: string;
    locations: ILocation[];
}

export declare interface ILocation {
    id: string;
    name: string;
    description: string;
}

export declare interface ICharacter {
    id: string;
    name: string;
    role: "main" | "supporting" | "minor";
    physicalDescription: string;
    genderIdentity: "Male" | "Female" | "Non-binary" | "Gender fluid";
    ethnicity: string;
    identifyingMarks: string;
    quirks: string;
    personality: string;
    backstory: string;
    storyArc: string;
    goals: string;
    motivations: string;
    relationships: IRelation[];
}

export declare interface IRelation {
    otherCharacterId: string;
    description: string;
}

export declare interface IProgess {
    characterId: string;
    arcProgess: string;
}

export declare interface ISummarizable {
    outline: string;
    summary: string;
}

export declare interface IPlot extends ISummarizable {
    acts: IAct[];
}

export declare interface IAct extends ISummarizable {
    title: string;
    chapters: IChapter[];
};

export declare interface IChapter extends ISummarizable {
    title: string;
    scenes: IScene[];
}

export declare interface IScene extends ISummarizable {
    title: string;
    beats: IBeat[];
    locationId: string;
    characterIds: string[];
}

export declare interface IBeat extends ISummarizable {
    title: string;
    text: string;
}
