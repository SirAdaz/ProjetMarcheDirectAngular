import Etat from "./etat.model";

// model pour la commande
export default interface Commande {
    id: number;
    produitCommande: number;
    dateCommande: Date;
    hourRecup: string;
    etats: Etat[];
    commercant: number;
    user: number;
  }
  