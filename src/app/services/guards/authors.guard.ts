import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RepositoryService } from '../services/repository.service';

export const authorsGuard: CanActivateFn = (route, state) => {
  let hasAuthors: boolean = false;
  inject(RepositoryService)
    .getAll('Authors')
    .subscribe((res) => {
      hasAuthors = res?.length > 0 ? true : false;
    });
  if (hasAuthors) {
    return true;
  }
  alert('Добавьте первого автора');
  return false;
};
