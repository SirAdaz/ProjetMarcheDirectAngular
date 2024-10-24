// Model pour le User

import Categorie from "./categorie.model";

// Ajout des champs
export default interface User { 
    id: string;
    email: string;
    userName: string;
    tel: string;
    nameBusiness: string;
    stats: [] ;
    imageFileName: string;
    descriptionCommerce: string;
    numSiret: string;
    produits: [];
    userCategorie: Categorie[];
  }
