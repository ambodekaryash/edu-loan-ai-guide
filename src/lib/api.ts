import axios from "axios";
import { API_BASE_URL } from "./config";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

export interface PredictRequest {
  Gender: number;
  Married: number;
  Dependents: number;
  Education: number;
  Self_Employed: number;
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: number;
  Property_Area: number;
}

export interface Factor {
  feature: string;
  impact: number;
}

export interface Lender {
  name: string;
  interest_rate: string;
  max_amount: string;
  risk: string;
  study_abroad: boolean;
}

export interface PredictResponse {
  approval_probability: number;
  prediction: string;
  top_positive_factors: Factor[];
  top_negative_factors: Factor[];
  llm_explanation: string;
  recommended_lenders: Lender[];
}

export interface EmiRequest {
  loan_amount: number;
  interest_rate: number;
  tenure_years: number;
}

export interface EmiResponse {
  monthly_emi: number;
  total_payment: number;
  interest_paid: number;
}

export const predictLoan = async (payload: PredictRequest): Promise<PredictResponse> => {
  const { data } = await api.post<PredictResponse>("/predict", payload);
  return data;
};

export const calculateEmi = async (payload: EmiRequest): Promise<EmiResponse> => {
  const { data } = await api.post<EmiResponse>("/emi", payload);
  return data;
};
