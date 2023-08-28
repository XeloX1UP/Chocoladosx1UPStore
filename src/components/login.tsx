import CreateAccount from "./createAccount";
import LoginForm from "./loginForm";

export default function Login() {
  return (
    <div className="flex flex-wrap my-10 rounded-sm py-4 items-center md:mx-4">
      <div className="flex-1">
        <LoginForm />
      </div>
      <div className="flex-1">
        <CreateAccount />
      </div>
    </div>
  );
}
