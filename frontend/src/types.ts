export interface Book {
  title: string;
  author: string;
  rating: number;
  review: string;
  id: string;
  date: number;
  uid: string;
  coverNumber: number;
}

export type Sort = "title" | "author" | "rating" | "recent";
