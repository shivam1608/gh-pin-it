import axios from 'axios';
import config from '../config';

export interface RepoData {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  private: boolean;
  owner: {
    login: string;
  };
  [key: string]: any;
}

export interface LanguageData {
  [key: string]: number;
}


export const fetchRepoData = async (username: string, repo: string): Promise<RepoData | null> => {
  try {
    const url = `https://api.github.com/repos/${username}/${repo}`;
    
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (config.githubToken) {
      headers.Authorization = `token ${config.githubToken}`;
    }
    
    const response = await axios.get<RepoData>(url, { headers });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('GitHub API error:', error.message);
    throw new Error(`Failed to fetch repository data: ${error.message}`);
  }
};


export const fetchRepoLanguages = async (username: string, repo: string): Promise<LanguageData> => {
  try {
    const url = `https://api.github.com/repos/${username}/${repo}/languages`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (config.githubToken) {
      headers.Authorization = `token ${config.githubToken}`;
    }
    
    const response = await axios.get<LanguageData>(url, { headers });
    return response.data;
  } catch (error: any) {
    console.error('GitHub API error:', error.message);
    return {};
  }
};
