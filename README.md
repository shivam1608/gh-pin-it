# gh-pin-it
Version : `0.0.1`

Ever wanted to increase your 6-pin limit on GitHub? With gh-pin-it, you can add beautiful repository cards to your README files without being restricted by GitHub's pinned repository limit.

(Upcoming - A web based GUI editor for styling your Readme 💪)

### 🟢Live at [ghpinit.shivzee.in](https://ghpinit.shivzee.in)

## Example 

[![gh-pin-it](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=gh-pin-it&amp;theme=dark)](https://github.com/shivam1608/gh-pin-it)


## Features

- 🎯 Bypass GitHub's 6-pin limitation for repositories
- 🎨 Multiple themes to match your README aesthetic
- 📊 Automatically displays repository stats (stars, forks, language)
- 🚀 Simple API for easy integration
- 📱 Responsive design that looks great everywhere


## API Usage

Simply use this URL format to generate repository cards:

```
https://ghpinit.shivzee.in/api/pin?username=USERNAME&amp;repo=REPOSITORY&amp;theme=THEME
```


### Parameters

| Parameter | Description | Default |
| :-- | :-- | :-- |
| `username` | GitHub username (required) | - |
| `repo` | Repository name (required) | - |
| `theme` | Color theme | `default` |
| `hide_border` | Whether to hide the border (`true` or `false`) | `false` |
| `show_owner` | Whether to show repository owner (`true` or `false`) | `true` |
| `show_description` | Whether to show repository description (`true` or `false`) | `true` |

### Available Themes

- `default` - Light theme
- `dark` - GitHub dark theme
- `tokyonight` - Blue and purple night theme
- `radical` - Neon pink theme
- `merko` - Green theme
- `gruvbox` - Retro earthy theme
- `nord` - Cool blue theme


## Examples

### Basic Usage

```markdown
[![Repo Name](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=Qrify&amp;theme=dark)](https://github.com/shivam1608/Qrify)
```

Result:

[![Repo Name](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=Qrify&amp;theme=dark)](https://github.com/shivam1608/Qrify)

### Multiple Repository Cards

You can add as many cards as you want:

```markdown
| [![Repo 1](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=Qrify&amp;theme=dark)](https://github.com/shivam1608/Qrify) | [![Repo 2](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=JMailTM&amp;theme=tokyonight)](https://github.com/shivam1608/JMailTM) |
|---|---|
```


### Different Themes

```markdown
[![Default](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=Qrify)](https://github.com/shivam1608/Qrify)

[![Tokyo Night](https://ghpinit.shivzee.in/api/pin?username=shivam1608&amp;repo=Qrify&amp;theme=tokyonight)](https://github.com/shivam1608/Qrify)
```


## Self-Hosting

Want to host your own instance of gh-pin-it? Follow these steps:

1. Clone the repository
```bash
git clone https://github.com/shivam1608/gh-pin-it.git
cd gh-pin-it
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
# Create a .env file with your GitHub token (optional but recommended)
GITHUB_TOKEN=your_github_token
PORT=3000
```

4. Build and start the server
```bash
bun run start
```

5. Your API will be available at `http://localhost:3000/api/pin`

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Open Source Project

- Author: Shivzee
- IDE Used: Visual Studio Code

[Buy me a coffee](https://buymeacoffee.com/shivzee)

## Dependencies

- Express
- TypeScript


## License

This project is licensed under the MIT License - see the LICENSE file for details.
