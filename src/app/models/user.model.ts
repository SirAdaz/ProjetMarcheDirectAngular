// Model pour le User
// Ajout des champs
export interface User { 
    id: number;
    email: string;
    userName: string;
    tel: string;
    nameBusiness: string;
    stats: [] ;
    imageFileName: string;
    roles: [];
    descriptionCommerce: string;
    numSiret: string;
  }
  