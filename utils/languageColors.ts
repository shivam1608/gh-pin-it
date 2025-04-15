interface LanguageColors {
    [key: string]: string;
}

const getLanguageColor = (lang: string): string => {
    if (!lang) return '#858585';
    
    const langKey = lang.toLowerCase();
    return languageColors[langKey] || '#858585';
};

const languageColors: LanguageColors = {
    typescript: '#3178c6',
    javascript: '#f1e05a',
    java: '#b07219',
    python: '#3572A5',
    cpp: '#f34b7d',
    'c++': '#f34b7d',
    c: '#555555',
    'c#': '#178600',
    php: '#4F5D95',
    ruby: '#701516',
    go: '#00ADD8',
    swift: '#F05138',
    kotlin: '#A97BFF',
    rust: '#dea584',
    dart: '#00B4AB',
    html: '#e34c26',
    css: '#563d7c',
    shell: '#89e051',
    powershell: '#012456',
    scala: '#c22d40',
    perl: '#0298c3',
    r: '#198CE7',
    elixir: '#6e4a7e',
    clojure: '#db5855',
    haskell: '#5e5086',
    lua: '#000080',
    julia: '#a270ba',
    vue: '#41b883',
    objectivec: '#438eff',
    assembly: '#6E4C13',
    groovy: '#e69f56',
    matlab: '#bb92ac',
  };

export {
    getLanguageColor,
    languageColors
}