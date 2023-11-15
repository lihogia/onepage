/** @type {import('next').NextConfig} */
const { name, tag, version } = require('./package.json');

const nextConfig = {
    env: {
        productname: name,
        tag,
        version
    }
}

module.exports = nextConfig;