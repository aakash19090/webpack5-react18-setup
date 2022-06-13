// This file is often also named as .babelrc

const plugins = [];

if (process.env.NODE_ENV !== "production") {
    plugins.push("react-refresh/babel");
}

module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", { runtime: "automatic" }], // Using this object, it doesnt require to import 'React in React components
    ],

    plugins,
}