import { type RepoData } from '../services/github';

interface ThemeColors {
  bg: string;
  text: string;
  border: string;
  accent: string;
  secondaryText: string;
  pillBg: string;
}

interface Themes {
  [key: string]: ThemeColors;
}

interface SvgOptions {
  username?: string;
  theme?: string;
  hide_border?: boolean;
  show_owner?: boolean;
  show_description?: boolean;
  count_private?: boolean;
}


export const generateRepoSVG = (repo: RepoData, options: SvgOptions): string => {
  const { 
    username = repo.owner.login,
    theme = 'default', 
    hide_border = false, 
    show_owner = true,
    show_description = true
  } = options;
  

  const themes: Themes = {
    default: { 
      bg: '#ffffff', 
      text: '#000000', 
      border: '#e1e4e8', 
      accent: '#0366d6',
      secondaryText: '#586069',
      pillBg: '#f1f8ff'
    },
    dark: { 
      bg: '#0d1117', 
      text: '#c9d1d9', 
      border: '#30363d', 
      accent: '#58a6ff', 
      secondaryText: '#8b949e',
      pillBg: '#1f2937'
    },
    tokyonight: { 
      bg: '#1a1b27', 
      text: '#c8d3f5', 
      border: '#2f334d', 
      accent: '#70a5fd',
      secondaryText: '#a9b1d6',
      pillBg: '#292e42'
    },
    radical: { 
      bg: '#141321', 
      text: '#a9fef7', 
      border: '#282a36', 
      accent: '#fe428e',
      secondaryText: '#f1fa8c',
      pillBg: '#282a36'
    },
    merko: { 
      bg: '#0a0f0b', 
      text: '#abd200', 
      border: '#144020', 
      accent: '#b7d364',
      secondaryText: '#68b587',
      pillBg: '#144020'
    },
    gruvbox: { 
      bg: '#282828', 
      text: '#ebdbb2', 
      border: '#504945', 
      accent: '#fe8019',
      secondaryText: '#bdae93',
      pillBg: '#504945'
    },
    nord: { 
      bg: '#2e3440', 
      text: '#eceff4', 
      border: '#4c566a', 
      accent: '#88c0d0',
      secondaryText: '#d8dee9',
      pillBg: '#4c566a'
    }
  };
  
  const colors = themes[theme] || themes.tokyonight;

  const name = repo.name;
  const description = repo.description || '';
  const stars = repo.stargazers_count || 0;
  const forks = repo.forks_count || 0;
  const language = repo.language || '';
  const isPrivate = repo.private ? 'Private' : 'Public';
  

  const borderAttr = hide_border ? '' : `stroke="${colors.border}" stroke-width="1"`;
  
  const repoNameLength = (show_owner ? username.length + name.length + 1 : name.length) * 7.5;
  

  let svg = `
    <svg width="400" height="130" viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg">
      <style>
        .text { font: 400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: ${colors.text}; }
        .bold { font-weight: 600; }
        .repo-title { font: 600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: ${colors.accent}; }
        .repo-icon { fill: ${colors.text}; }
        .desc { font: 400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: ${colors.secondaryText}; }
        .badge { font: 400 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: ${colors.text}; }
        .badge-pill { fill: ${colors.pillBg}; opacity: 0.85; rx: 12; ry: 12; }
        .lang-circle { r: 5.5; }
      </style>
      
      <rect x="0.5" y="0.5" width="399" height="129" rx="4" fill="${colors.bg}" ${borderAttr}/>
  `;

  svg += `
      <svg x="18" y="25" width="16" height="16" viewBox="0 0 16 16" class="repo-icon">
        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
      </svg>

      <g transform="translate(43, 32)">
        ${show_owner ? 
          `<text class="repo-title" x="0" y="0">${username}/${name}</text>` : 
          `<text class="repo-title" x="0" y="0">${name}</text>`
        }
        
        <g transform="translate(${repoNameLength + 8}, 0)">
          <rect class="badge-pill" x="0" y="-9.5" width="${isPrivate.length * 6 + 18}" height="19" />
          <text class="badge" x="${(isPrivate.length * 6 + 18) / 2}" y="0" text-anchor="middle" dominant-baseline="middle">${isPrivate}</text>
        </g>
      </g>
  `;
  

  if (show_description && description) {
    svg += `
      <text class="desc" x="18" y="58" 
        textLength="${description.length > 60 ? '350' : description.length * 6}"
        lengthAdjust="spacingAndGlyphs">
        ${description.length > 60 ? description.substring(0, 60) + '...' : description}
      </text>
    `;
  }

  svg += `
      <g transform="translate(18, ${show_description ? '90' : '75'})">
  `;

  if (language) {
    svg += `
        <g>
          <circle class="lang-circle" cx="6" cy="0" fill="${language.toLowerCase() === 'typescript' ? '#3178c6' : '#3178c6'}" />
          <text class="text" x="16" y="0" dominant-baseline="middle">${language}</text>
        </g>
    `;
  }

  svg += `
        <g transform="translate(${language ? '100' : '0'}, 0)">
          <svg width="16" height="16" viewBox="0 0 16 16" x="0" y="-8" fill="${colors.text}">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
          </svg>
          <text class="text" x="20" y="0" dominant-baseline="middle">${stars}</text>
        </g>
  `;

  svg += `
        <g transform="translate(${language ? '150' : '60'}, 0)">
          <svg width="16" height="16" viewBox="0 0 16 16" x="0" y="-8" fill="${colors.text}">
            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
          </svg>
          <text class="text" x="20" y="0" dominant-baseline="middle">${forks}</text>
        </g>
      </g>
  `;

  svg += `
      <g transform="translate(375, 32)">
        <circle cx="0" cy="-2" r="1.2" fill="${colors.text}" />
        <circle cx="0" cy="2" r="1.2" fill="${colors.text}" />
        <circle cx="0" cy="6" r="1.2" fill="${colors.text}" />
      </g>
  `;
  
  svg += `
    </svg>
  `;
  
  return svg;
};
