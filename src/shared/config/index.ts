class config {
  // TODO:
  static API_URL: string = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:3000/api';

  static PLANETSCALE_DATABASE_URL = process.env.PLANETSCALE_DATABASE_URL
    ? process.env.PLANETSCALE_DATABASE_URL
    : '';
}

export default config;
