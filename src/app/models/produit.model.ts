import Format from "./format.models";
import User from "./user.model";

// Model des produits
export default interface Produit {
    id: number;
    productName: string;
    prix: number;
    format: Format;
    disponible: boolean;
    stock: number;
    imageFileName: string;
    description: string;
    userProduct: User;
  }