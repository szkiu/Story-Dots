import { Product } from "../../db/Models/Products";

export async function deleteManyProductsByUniqueName(uniqueName: string) {
  const deletedProperties = await Product.deleteMany({
    authorUniqueName: uniqueName,
  });

  if (!deletedProperties.acknowledged) return false;

  return true;
}