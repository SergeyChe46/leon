import { Observable } from 'rxjs';

export interface BaseRepositoryInterface {
  add(entity: any, storageFieldName: string): void;
  getAll(storageFieldName: string): Observable<any[]>;
}
