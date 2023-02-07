# SvelteKit blog template 

This blog template is a fork of [mattjennings's](https://github.com/mattjennings/sveltekit-blog-template), however it includes a repagination made for myself and aims at using typescript as its default scripting language. Also, it provides both cloud and local loading systems for posts, so you can get to choose either by specifying PUBLIC_USE_LOCAL key into your .env file. In case you choose to use local files, they should be stored within `./posts/` folder using Markdown syntax. On the other hand, ignoring PUBLIC_USE_LOCAL key will lead to use GhostCMS as your default posts manager, which will require you to use a default BACKEND_URL and your personal access key. Both can be achieved easily with GhostCMS integration, but you can check it out [here](https://ghost.org/docs/content-api/) how it is done and, once you get that piece of information, include it in your .env (please, gitignore this file once you clone this project). 

```
BACKEND_URL=https://demo.ghost.io
KEY=22444f78447824223cefc48062
```

Henceforth, the project should correctly autoload either method to retrieve posts. 


# Next Steps Roadmap

This is an early development version. I am currently considering:

- [ ] Support for JSON safety using Zod instead of class-transformer
- [x] Adjust bookmarks
- [X] ~~Dark theme support (+ auto detecting system's dark/light mode).~~ Support for detecting theme's colors was added.
- [ ] Zoom button controls (`+` / `-` / `reset`).
- [ ] Add Spotify API because why not?
- [ ] Ignoring files or directories.
- [ ] Improve landing page splitting work from bio.
- [ ] Create Curriculum Page.
- [x] Optional autostart.


# SvelteKit Blog Template

A SvelteKit blog template built on mdsvex, tailwind, Typescript, GhostCMS.


# Credits (copied from the original's)

- [pngwn](https://github.com/pngwn) for mdsvex and helping me with the `mdsvex-relative-images` plugin
  - https://github.com/pngwn/MDsveX/discussions/246#discussioncomment-720947
- Tailwind's ["Spotlight" blog template](https://spotlight.tailwindui.com/)
  - Overall theme is heavily based on this template
- All who have contributed!

  <a href="https://github.com/mattjennings/sveltekit-blog-template/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mattjennings/sveltekit-blog-template" />
  </a>
