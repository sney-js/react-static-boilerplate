export const customViewports = {
    mobile: {
        name: "Mobile",
        styles: {
            width: "375px",
            height: "812px",
        },
    },
    mobileLarge: {
        name: "Large Mobile",
        styles: {
            width: "414px",
            height: "896px",
        },
    },
    Tablet: {
        name: "Tablet",
        styles: {
            width: "768px",
            height: "1024px",
        },
    },
    TabletLarge: {
        name: "Large Tablet",
        styles: {
            width: "1024px",
            height: "1366px",
        },
    },
    Desktop: {
        name: "Desktop",
        styles: {
            width: "1200px",
            height: "720px",
        },
    },
    Widescreen: {
        name: "Widescreen",
        styles: {
            width: "1440px",
            height: "900px",
        },
    },
    HD: {
        name: "HD",
        styles: {
            width: "1920px",
            height: "1080px",
        },
    },
    stb: {
        name: "Set Top Box",
        styles: {
            width: "1920px",
            height: "1080px",
        },
    },
};

const STORY_ORDER = [
    {
        name: "intro",
        stories: [
            {
                name: "getting started",
            },
            "colors",
            "spacing",
            "theming",
            "typography",
            "contributing",
        ],
    },
    "elements",
    "containers",
    "components",
];

const getOrder = (levelIndex, levels, config) => {
    const targetLevels = levels.slice(0, levelIndex + 1);
    let currentConfig = config;
    for (const [index, name] of targetLevels.entries()) {
        if (levelIndex === index) {
            break;
        }
        currentConfig = currentConfig.find((story) => {
            return name === story?.name;
        })?.stories;

        if (!currentConfig) {
            return [];
        }
    }
    return currentConfig.map((story) => {
        if (typeof story === "object") {
            return story.name;
        }
        return story;
    });
};

const getLevels = (story) => {
    const levels = story[1].kind.split("/").map((name) => name.toLowerCase());
    levels.push(story[0].split("--")[1]);
    return levels;
};

const compareOrder = (a, b, array) => {
    let indexA = array.indexOf(a);
    let indexB = array.indexOf(b);

    if (indexA === -1 && indexB === -1) {
        // sort alphabetically if not present in indexes
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    indexA = indexA === -1 ? 10000 : indexA;
    indexB = indexB === -1 ? 10000 : indexB;

    if (indexA < indexB) {
        return -1;
    } else if (indexA > indexB) {
        return 1;
    }
    return 0;
};

export const StorySorter = (a, b) => {
    const levelsA = getLevels(a);
    const levelsB = getLevels(b);

    for (const [index, nameA] of levelsA.entries()) {
        const nameB = levelsB[index];
        if (nameA === nameB) {
            continue;
        }
        const order = getOrder(index, levelsA, STORY_ORDER);
        return compareOrder(nameA, nameB, order);
    }

    return 0;
};
