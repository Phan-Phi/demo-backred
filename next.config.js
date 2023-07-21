// // /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
const withBundleAnalyzer = require("@next/bundle-analyzer");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  return withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })({
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
      locales: ["vi", "en"],
      defaultLocale: "vi",
    },
    images: {
      domains: [process.env.BASE_URL],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "demo-blackred-api.services.t-solution.vn",
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "demo-blackred-api.services.t-solution.vn",
          pathname: "**",
        },

        {
          protocol: "https",
          hostname: "img.youtube.com",
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "img.youtube.com",
          pathname: "**",
        },
      ],
    },

    modularizeImports: {
      lodash: {
        transform: "lodash/{{member}}",
      },
    },

    // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
    // output: "standalone",
    // the output: 'standalone' option should now work from the latest 12.2.0 release
  });
};

module.exports = nextConfig;
