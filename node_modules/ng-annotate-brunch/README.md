## ng-annotate-brunch

Adds [ng-annotate](https://github.com/olov/ng-annotate) support to [brunch](http://brunch.io).

The plugin will make your angular javascript files minify safe.

## Usage

Install the plugin via npm with `npm install --save ng-annotate-brunch`.

And be sure to put ng-annotate-brunch in front of uglify-js-brunch.

```
"dependencies": {
  "ng-annotate-brunch": ">= 1.0 < 1.8",
  "uglify-js-brunch": ">= 1.0 < 1.8"
}
```

To specify uglifyjs options, use `config.plugins.ng_annotate` object, for example:

```coffeescript
config =
  plugins:
    ng_annotate:
      pattern: /app/
```

## License

The MIT License (MIT)
