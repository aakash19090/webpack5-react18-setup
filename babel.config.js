// This file is often also named as .babelrc

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }], // Using this object, it doesnt require to import 'React in React components
    ],
}