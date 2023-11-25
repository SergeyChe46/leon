import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from 'src/app/models/author.interface';
import { Book } from 'src/app/models/book.interface';
import { BaseRepositoryInterface } from '../interfaces/base-repository.interface';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService implements BaseRepositoryInterface {
  constructor() {}
  /**
   *
   * @param entity Объект для добавления в хранилище.
   * @param storageFieldName Ключ в хранилище, в который надо добавить объект.
   */
  add(entity: any, storageFieldName: string): void {
    let entities = JSON.parse(localStorage.getItem(storageFieldName)!);

    if (entities) {
      localStorage.setItem(
        storageFieldName,
        JSON.stringify([...entities, entity])
      );
    } else {
      localStorage.setItem(storageFieldName, JSON.stringify([entity]));
    }
  }
  /**
   * Возвращает наблюдаемы объект из хранилища.
   * @param storageFieldName Параметр для поиска в хранилище.
   * @returns
   */
  getAll(storageFieldName: string): Observable<any[]> {
    return of(this.parseEntities(storageFieldName));
  }
  /**
   * Возвращает данные из хранилища, если они есть.
   * @param storageFieldName Параметр для поиска в хранилище.
   * @returns
   */
  private parseEntities(storageFieldName: string): Book[] | Author[] {
    let entities = JSON.parse(localStorage.getItem(storageFieldName)!);
    return entities;
  }
}
