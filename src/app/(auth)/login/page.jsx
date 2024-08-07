import { handleGithubSignIn, login } from "@/lib/action"; // Corrected typo in `handleGithubSingIn`
import { auth, signIn } from "@/lib/auth";
import styles from "./login.module.css";
import LoginForm from "@/components/loginForm/loginForm"; // Importing the client component

const page = async () => {
  // const session = await auth();
  // console.log(session);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGithubSignIn}>
          <button className={styles.github}>Login with Github</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
