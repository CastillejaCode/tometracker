import NavBar from "src/features/books/components/NavBar";
import UserSettings from "../components/UserSettings";

export default function Account() {
  return (
    <>
      <NavBar />
      <main className="grid place-content-center">
        <UserSettings />
      </main>
    </>
  );
}
