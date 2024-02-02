# Pure JS Svg Renderer

This is a SVG renderer written in only Javascript. No shelling out to external programs; no compile step needed; you can put this in (most) browsers and it will work.

I wrote this library in high school to generate [Opengraph](https://ogp.me/) previews for my [Dinner Coding Time](https://github.com/chlohal/dinner-coding-time) site. Since that site is down now, I'm moving it to its own repository with the hope that it can be of use to others. Before making this, I spent a month looking for a JS SVG renderer and couldn't find it. I hope this can be discoverable and useful to other people.

## Features

This renderer supports:

- [x] Paths 
- [x] Filling paths
- [x] Linear Gradients
- [x] Text

This renderer does **not** support:

- [ ] Stroking paths
- [ ] Any advanced features
- [ ] Multiple fonts 
- [ ] CSS

PRs welcome!

## Dependencies

The renderer only depends on [opentype.js](https://github.com/opentypejs/opentype.js/tree/master), which is minified and bundled into the source in the `fonts` directory. 

It uses JetBrains Mono as the default font. Changing the font can be done by changing out the `ttf` files in the `fonts` directory.

## Licence

This software is available under an MIT licence (c) 2024 Chloe Halverson