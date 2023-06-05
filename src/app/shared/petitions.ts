export interface Petition {
  petitionId: number;
  creatorEmail?: string;
  creatorName?: string;
  creatorSurname?: string;
  description: string;
  title: string;
  likesNumber: number;
  likedByThisUser: boolean;
  category: string|null;
  station: string | null;
  route: string | null;
  latitude: number ;
  longitude: number;
  images: File[];
  status: string;
  createdAt: string ;
  address: string;
  shortDescription?: string;
  decisionDescription:string;
  accepted:boolean;
  
  }

