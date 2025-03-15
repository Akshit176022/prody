const nextConfig = {
  experimental: {
    turbo: false, // Disable Turbopack
  },
  images: {
    domains: ["127.0.0.1", "localhost"],
  },
};

module.exports = nextConfig;

export default nextConfig;
