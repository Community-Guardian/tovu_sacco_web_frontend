export interface Permission {
  id: number;
  app: string;
  feature: string;
  permission: string;
}

export interface Group {
  id: number;
  name: string;
  permissions: number[]; // Array of permission IDs
}
