import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from 'src/app/models/author.interface';
import { Book } from 'src/app/models/book.interface';
import { RepositoryService } from 'src/app/services/services/repository.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  authors: Author[] = [];
  bookForm!: FormGroup;
  orderColumn: string = '';
  orderBy: 'asc' | 'desc' = 'asc';
  private newBookId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private repositoryService: RepositoryService
  ) {}

  ngOnInit(): void {
    this.getAllAuthors();
    this.getAllBooks();

    this.bookForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      authorId: [],
      authorName: [''],
      publisher: [''],
      publishYear: [Number],
    });
  }

  onSubmit() {
    this.bookForm.get('id')?.setValue(this.newBookId);
    this.repositoryService.add(this.bookForm.value, this.storageFieldName);
    this.bookForm.reset();
    this.getAllBooks();
    this.newBookId += 1;
  }
  /**
   * Находит автора и возвращает форматированное имя.
   * @param id Автор
   * @returns
   */
  getAuthorName(id: number) {
    let author = this.authors.find((auth) => {
      return auth.id == id;
    });

    return `${author?.firstName} ${author?.lastName}`;
  }
  /**
   * Задаёт колонку для сортирровки и порядок сортировки.
   * @param column Колонка для поиска.
   */
  setOrderColumn(column: string) {
    if (column == this.orderColumn) {
      this.orderBy = this.orderBy === 'asc' ? 'desc' : 'asc';
    }
    this.orderColumn = column;
  }
  /**
   * Список книг
   */
  private getAllBooks() {
    this.repositoryService.getAll(this.storageFieldName)?.subscribe({
      next: (res: Book[]) => {
        this.books = res;
        this.newBookId = res?.length ?? 1;
      },
    });
  }
  /**
   * Авторы для отображения в форме.
   */
  private getAllAuthors() {
    this.repositoryService.getAll('Authors')?.subscribe({
      next: (res: Author[]) => (this.authors = res),
    });
  }

  private storageFieldName: string = 'Books';
}
