module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "jsx": true
    },
    "extends": "airbnb",
    "rules": {
        "global-require": "off",
        "no-underscore-dangle": "off",
        "react/jsx-filename-extension": "off",
        "allowIndentationTabs" : true,
        "react/prop-types": 0,
        "react/destructuring-assignment": 0,
        "max-len": [2,150]
    },
    "globals": {
        "__DEV__": true,
        "fetch": true
    },
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [
            ".js",
            ".android.js",
            ".ios.js"
          ]
        }
      },
  }
}