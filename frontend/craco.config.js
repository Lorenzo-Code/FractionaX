const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Output configuration
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'build'), // Ensure output in 'build' directory
                publicPath: '/', // Match Django's STATIC_URL
                filename: 'static/js/[name].[contenthash:8].js', // Output JS files
                chunkFilename: 'static/js/[name].[contenthash:8].chunk.js', // Output chunk files
            };

            // Enable source maps in development and disable in production
            if (webpackConfig.mode === 'development') {
                webpackConfig.devtool = 'source-map'; // Enable source maps for debugging
            } else {
                webpackConfig.devtool = false; // Disable source maps in production
            }

            // Update loaders for CSS and media files
            webpackConfig.module.rules.forEach((rule) => {
                if (rule.oneOf) {
                    rule.oneOf.forEach((one) => {
                        // Update CSS loader
                        if (one.test && one.test.toString().includes('css')) {
                            if (one.use) {
                                one.use.forEach((loader) => {
                                    if (loader.loader && loader.loader.includes('file-loader')) {
                                        loader.options.name = 'static/css/[name].[contenthash:8].[ext]';
                                    }
                                });
                            }
                        }

                        // Update image loader
                        if (one.test && one.test.toString().includes('image')) {
                            if (one.use) {
                                one.use.forEach((loader) => {
                                    if (loader.loader && loader.loader.includes('file-loader')) {
                                        loader.options.name = 'static/media/[name].[contenthash:8].[ext]';
                                    }
                                });
                            }
                        }
                    });
                }
            });

            // Add asset/resource handling for images and other static files
            webpackConfig.module.rules.push({
                test: /\.(png|jpe?g|gif|svg)$/i, // Match image file types
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // Define output path for images
                },
            });

            webpackConfig.module.rules.push({
                test: /\.(mp4|webm|ogg)$/i, // Match video file types
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // Define output path for videos
                },
            });

            // Return the updated Webpack configuration
            return webpackConfig;
        },
    },
};

