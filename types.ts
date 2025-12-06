export enum PropertyType {
  EXISTING = 'Existing Home',
  NEW_BUILD = 'New Build',
}

export interface RegionCap {
  id: string;
  name: string;
  state: string;
  priceCap: number;
}

export interface CalculationResult {
  propertyPrice: number;
  depositAmount: number;
  govContributionAmount: number;
  bankLoanAmount: number;
  monthlyRepayment: number;
  isPriceEligible: boolean;
  capLimit: number;
}

export interface IncomeLimit {
  type: 'individual' | 'joint';
  label: string;
  limit: number;
}