interface Card {
    uuid: string;
    displayName: string;
    isHiddenIfNotOwned: string;
    themeUuid: string;
    displayIcon: string;
    smallArt: string;
    wideArt: string;
    largeArt: string;
    assetPath: string;
}

interface Tier {
    tier: string;
    tierName: string;
    division: string;
    divisionName: string;
    color: string;
    backgroundColor: string;
    smallIcon: string;
    largeIcon: string;
    rankTriangleDownIcon: string;
    rankTriangleUpIcon: string;
}

interface Title {
    uuid: string;
    displayName: string;
    titleText: string;
    isHiddenIfNotOwned: string;
    assetPath: string;
}

interface Wallpaper {
    uuid?: string;
    name: string;
    image: string;
}