// Model pour le User

import Marche from "./marche.model";

// Ajout des champs
export default interface User { 
    id: string;
    email: string;
    userName: string;
    tel: string;
    nameBusiness: string;
    stats: [] ;
    imageFileName: string;
    commercant_marche : Marche[];
  }
  