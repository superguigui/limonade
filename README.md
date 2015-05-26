[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# limonade
Minimal cli tool to generate sprite sheet for animations.

## Installation
npm but not yet

## Usage
From terminal
```bash
limonade [inputfolder] [outputfolder] [-f filename] [-a algorithm]
-f --filename        filename of the outputed image
-a --algorithm       algorithm to pack the spritesheet, can be square, horizontal or vertical
```

Or as a npm script
```
"scripts": {
  "sprite": "limonade assets/sprites/walk assets/sprites -a horizontal"
}
```
