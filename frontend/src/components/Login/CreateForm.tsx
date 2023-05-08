import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/config";
import { useState } from "react";

interface Props {
  setCreate: (arg0: boolean) => boolean;
}

const CreateForm = ({ setCreate }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="absolute top-1/4 flex flex-col items-center">
      <h2 className="mb-4 text-2xl">Create Account</h2>

      <form className="flex flex-col gap-4" onSubmit={submitForm}>
        <div className="flex flex-col">
          <label htmlFor="username">name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-bordered input input-sm"
            type="text"
            id="username"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input-bordered input input-sm"
            type="text"
            id="email"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-bordered input input-sm"
            type="text"
            id="pwd"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className=" btn w-fit">Submit</button>
          <button
            className="btn-outline btn-sm btn w-fit"
            onClick={() => setCreate(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
