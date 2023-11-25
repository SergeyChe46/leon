export interface Book {
  id: number;
  authorId: number;
  authorName: string;
  title: string;
  publisher?: string;
  publishYear: number;
}
