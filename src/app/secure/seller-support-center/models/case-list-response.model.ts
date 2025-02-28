import { IResponse } from './response.interface';
import { CaseSummary } from './case-summary.model';

export class CaseListResponse  {
  errors: Array<any>;
  data: {
    totalPages: number;
    page: number;
    pageSize: number;
    cases: Array<CaseSummary>;
    total: number;
  };
  message: string;
}
