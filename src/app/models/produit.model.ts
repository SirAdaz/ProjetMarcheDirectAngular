import { DecimalPipe } from "@angular/common";
import Format from "./format.models";

// Model des produits
export default interface Produit {
    id: number;
    productName: string;
    prix: number;
    format: Format;
    disponible: boolean;
    stock: number;
    imageFileName: string;
  }