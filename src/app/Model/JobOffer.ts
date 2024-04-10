export interface JobOffer {
  id:number | null;
  employeur: { id: number | null };
  domaine: { id: number | null };
  contrat: string;
  entreprise: string;
  Site_web: string;
  salaire: string;
  niveauEtude: string;
  titre: string;
  description: string;
  status: string;
  datePublication: Date | null;
  dateLimiteCandidature: Date | null;
  ville: { id: number | null };
  image: any;
}
