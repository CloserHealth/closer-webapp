interface IEnv {
  // NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_API_URL_PRODUCTION: string;
  // [key: string]: string;
}

const ENV = process.env as unknown as IEnv;

// export const isDev = ENV.MODE === 'development';
// export const isProd = !isDev;

export default ENV;
