import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Author } from 'src/app/models/author.interface';
import { RepositoryService } from 'src/app/services/services/repository.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  authorForm!: FormGroup;
  authors: Author[] = [];
  newAuthorId: number = 0;

  constructor(
    private repositoryService: RepositoryService,
    private formBuilder: FormBuilder
  ) {
    this.authorForm = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required]],
      midName: [null],
      lastName: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
    });
  }

  get firstName(): FormControl {
    return this.authorForm.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.authorForm.get('lastName') as FormControl;
  }
  get birthDate(): FormControl {
    return this.authorForm.get('birthDate') as FormControl;
  }
  /**
   * Проверяет уникальность нового автора
   */
  get authorIsExist() {
    return this.authors?.find((author: Author) => {
      return (
        `${author.firstName}`.toLowerCase() ===
          this.firstName.value?.toLowerCase() &&
        `${author.lastName}`.toLowerCase() ===
          this.lastName.value?.toLowerCase() &&
        author.birthDate === this.birthDate.value
      );
    });
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  onSubmit() {
    this.authorForm.get('id')?.setValue(this.newAuthorId);
    this.repositoryService.add(this.authorForm.value, this.storageFieldName);
    this.authorForm.reset();
    this.getAllAuthors();
    this.newAuthorId += 1;
  }
  /**
   * Получает авторов в отсортированном по фамилиям порядке
   */
  private getAllAuthors() {
    this.repositoryService.getAll(this.storageFieldName)?.subscribe({
      next: (res: Author[]) => {
        (this.authors = res),
          ((this.newAuthorId = res?.length ?? 1),
          (this.authors = this.authors?.sort((a, b) => {
            if (a.lastName < b.lastName) {
              return -1;
            } else {
              return 1;
            }
          })));
      },
    });
  }
  private storageFieldName = 'Authors';
}
