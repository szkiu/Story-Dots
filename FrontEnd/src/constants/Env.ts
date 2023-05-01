export const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://challenge_sd-1-e5045299.deta.app";

export const Env = {
  baseUrlProduct: `${baseUrl}/api/v1/products`,
  baseUrlAuth: `${baseUrl}/api/v1/auth`,
};

export default Env;