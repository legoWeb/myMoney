import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {HttpClient} from '@angular/common/http';
import {BillModel} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http)
  }

  getBill() {
     return this.get('bill');
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`http://api.fixer.io/latest?base=${base}`);
  }

  updateBill(bill: BillModel): Observable<BillModel> {
    return this.put('bill', bill);
  }
}
