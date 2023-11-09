import { useState } from "react";
import ConfirmChoice from "src/components/ConfirmChoice";
import { useDeleteBookMutation } from "src/services/books";
import { Book } from "src/types";
import EditForm from "./EditForm";
import moby from "/moby.jpg";

interface Props {
  book: Book;
}

export default function Info({ book }: Props) {
  const [deleteBook] = useDeleteBookMutation();
  const [showForm, setShowForm] = useState(false);
  const [showConfirmChoice, setShowConfirmChoice] = useState(false);

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div>
        <h1 className="text-3xl font-semibold">{book.title}</h1>
        <h2 className="text-2xl">{book.author}</h2>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-3xl" aria-label="Rating">
          {book.rating}
        </h3>
        <div className="flex flex-col items-center">
          <h3 className="text-xl" aria-label="Start and End Dates">
            10/12/23 ⇀ 10/19/23
          </h3>
          <p className="text-lg" aria-label="Duration">
            7 days
          </p>
        </div>
        <p aria-label="Review" className="text-lg">
          "{book.review}"
        </p>
      </div>
      <div className="divider my-0"></div>
      {!showForm && (
        <>
          <div className=" flex justify-around">
            <button
              className="btn-warning  btn-sm btn"
              onClick={() => setShowForm(true)}
            >
              Edit
            </button>
            <button
              className="btn-error btn-sm btn"
              onClick={() => setShowConfirmChoice(true)}
            >
              Delete
            </button>
            <ConfirmChoice
              visible={showConfirmChoice}
              setVisible={setShowConfirmChoice}
              confirmAction={() => deleteBook(book.id)}
            />
          </div>
          <div className="divider my-0"></div>
        </>
      )}
      {showForm && <EditForm book={book} setShowForm={setShowForm} />}
      {!showForm && (
        <img
          src={moby}
          alt={`Cover of ${book.title}`}
          className="max-w-[16rem] self-center"
        />
      )}
    </div>
  );
}
