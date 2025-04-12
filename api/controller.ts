import {type Request, type Response } from 'express';
import * as githubService from '../services/github';
import * as svgGenerator from '../utils/svgGenerator';

interface PinQueryParams {
  username?: string;
  repo?: string;
  theme?: string;
  hide_border?: string;
  show_owner?: string;
  show_description?: string;
  count_private?: string;
}

export const generatePin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      username, 
      repo, 
      theme = 'default', 
      hide_border = 'false',
      show_owner = 'true',
      show_description = 'true',
      count_private = 'false'
    } = req.query as PinQueryParams;
    
    if (!username || !repo) {
      res.status(400).send('Username and repo parameters are required');
      return;
    }
    
    const repoData = await githubService.fetchRepoData(username, repo);
    
    if (!repoData) {
      res.status(404).send('Repository not found');
      return;
    }
    

    const svg = svgGenerator.generateRepoSVG(repoData, { 
      username,
      theme, 
      hide_border: hide_border === 'true', 
      show_owner: show_owner === 'true',
      show_description: show_description === 'true',
      count_private: count_private === 'true'
    });
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error) {
    console.error('Pin generation error:', error);
    res.status(500).send('Error generating repository pin');
  }
};
