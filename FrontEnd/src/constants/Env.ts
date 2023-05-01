export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

export const Env = {
  baseUrlProduct: `${baseUrl}/api/v1/products`,
  baseUrlAuth: `${baseUrl}/api/v1/auth`,
};

export default Env;