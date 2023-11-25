import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { authorsGuard } from './services/guards/authors.guard';

const routes: Routes = [
  { path: 'books', component: BooksComponent, canActivate: [authorsGuard] },
  { path: 'authors', component: AuthorsComponent },
  { path: '**', component: AuthorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
