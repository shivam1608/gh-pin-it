interface Config {
    githubToken: string;
    rateLimit: {
      windowMs: number;
      max: number;
    };
    cache: {
      ttl: number;
    };
  }
  

  const config: Config = {
    githubToken: process.env.GITHUB_TOKEN || '',
    
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    },
    
    cache: {
      ttl: 60 * 60 * 1000 
    }
  };
  
  export default config;
  