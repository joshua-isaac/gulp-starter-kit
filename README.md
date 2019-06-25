# gulp-starter-kit

This is a Gulp v4 Starter Kit that compiles scss into css, concatenates js files, and minifies both css & js as well as autoprefix css styles.

### How It Works
1. Open directory in terminal.
```
cd gulp-starter-kit
```

2. Install developer dependencies.
```
yarn || npm install
```

3. Edit jsConcat array in gulpfile.js to concatenate js folders, order scripts to load from first to last.
```
  const jsConcat = [
    'src/scripts/vendors/first-script-to-load.js',
    'src/scripts/vendors/second-script-to-load.js',
    'src/scripts/vendors/third-script-to-load.js',
    ...
  ]
```

4. Run gulp in terminal, and watch the magic happen :^)
```
gulp
```


