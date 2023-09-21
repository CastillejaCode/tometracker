import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "../../../auth/config";
import { resetError, setError } from "../../../features/notificationSlice";
import {
  toggleCreate,
  toggleResetPassword,
} from "../../../features/toggleSlice";
import { useField } from "../../../hooks/useField";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useField({
    id: "email",
    type: "email",
  });
  const [password, setPassword] = useField({
    id: "pwd",
    type: "password",
  });

  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      dispatch(setError(error.code));
      setTimeout(() => dispatch(resetError()), 5000);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-medium ">Login</h2>
      <form className="flex flex-col gap-6" onSubmit={login}>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            {...email}
            className="rounded-md border-2 border-zinc-600 bg-zinc-200 px-2 py-1 text-lg"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            {...password}
            className="rounded-md border-2 border-zinc-600 bg-zinc-200 px-2 py-1 text-lg"
            required
          />
          <button
            onClick={() => dispatch(toggleResetPassword())}
            type="button"
            className="w-fit self-end px-1 py-2 text-end text-sm font-[400]"
          >
            forgot password?
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="btn bg-blue-500 text-xl normal-case">
            Submit
          </button>
          <button
            className=" btn-outline btn-sm btn w-fit text-lg normal-case"
            onClick={() => dispatch(toggleCreate())}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
