import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../auth/auth.service';
import { ProductService } from '../../../services/product.service';
import User from '../../../models/user.model';
import Produit from '../../../models/produit.model';
import Format from '../../../models/format.models';

declare var bootstrap: any;

@Component({
  selector: 'app-gestion-des-produits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-des-produits.component.html',
  styleUrls: ['./gestion-des-produits.component.css']
})

export class GestionDesProduitsComponent implements OnInit {
  urlImg = "https://127.0.0.1:8000/images/";
  user!: User;  // Utilisateur actuellement connecté
  produits!: Produit[];  // Liste des produits de l'utilisateur
  selectedProduct!: Produit;  // Produit sélectionné pour modification
  productForm: FormGroup;  // Formulaire réactif pour la modification du produit
  productToDelete!: Produit;  // Produit à supprimer
  selectedFile: File | null = null;
  formats!: Format[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    // Initialisation du formulaire réactif avec des champs par défaut
    this.productForm = this.fb.group({
      productName: [''],
      prix: [''],
      stock: [''],
      description: [''],
      formatId: [''],
      imageFileName: ["test"],
    });
  }

  // Gestion de la sélection du fichier image
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Enregistre l'image sélectionnée
    }
  }

  // Fonction pour supprimer les balises HTML de la description du produit
  removeDivTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ');
  }

  ngOnInit(): void {
    const userId = this.authService.decodedToken ? this.authService.decodedToken.id : null;

    this.userService.getUserProfile(userId).subscribe((data) => {
      this.user = data;
      this.produits = this.user.produits;
    });

    this.productService.getFormats().subscribe((data) => {
      this.formats = data;
      console.log(data);
    });
  };

  // Créer un produit
  createProduct() {
    const newProduct = this.productForm.value; // Récupère les valeurs du formulaire

    // Appel au service sans image
    this.productService.createProduct({...newProduct, formatId: newProduct.formatId}).subscribe(
      createdProduct => {
        this.produits.push(createdProduct); // Ajouter le produit créé à la liste locale
        this.closeModal('createProductModal'); // Ferme le modal après la création
      },
      error => {
        console.error('Erreur lors de la création du produit:', error);
        console.log(newProduct)
      }
    );
  }

  // Modifier un produit
  updateProduct() {
    if (this.selectedProduct) {
      const updatedProduct = { ...this.selectedProduct, ...this.productForm.value };

      this.productService.updateProduct(updatedProduct.id, updatedProduct).subscribe(
        response => {
          const index = this.produits.findIndex(p => p.id === response.id);
          if (index !== -1) {
            this.produits[index] = response; // Met à jour le produit dans la liste sans rechargement
          }
          this.closeModal('updateProductModal');
        },
        error => {
          console.error('Erreur lors de la mise à jour du produit:', error);
        }
      );
    }
  }

  // Supprimer le produit
  deleteProduct() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id).subscribe(() => {
        this.produits = this.produits.filter(
          (p) => p.id !== this.productToDelete.id
        ); // Supprime le produit de la liste sans rechargement
        this.closeModal('deleteProductModal');
      });
    }
  }

  // Ouvrir le modal de création de produit
  openModalCreate() {
    this.productForm.reset(); // Réinitialise le formulaire
    const modalElement = document.getElementById('createProductModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Ouvrir le modal de modification avec le produit sélectionné
  openModalModif(product: Produit) {
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    const modalElement = document.getElementById('updateProductModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Fermer le modal
  closeModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  // Ouvrir le modal de suppression
  openModalDelete(product: Produit) {
    this.productToDelete = product;
    const modalElement = document.getElementById('deleteProductModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
