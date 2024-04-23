export interface pk {
  id?: string;
}

export interface Action extends pk {
  operation?: string;
}
export interface Address {
  code?: string;
  address?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
}
export interface PairKeyLabel {
  id: string;
  label: string;
}
