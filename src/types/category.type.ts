export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  status: CategoryStatus;
}