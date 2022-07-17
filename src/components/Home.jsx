import { useAuth } from "../contexts/AuthContext";

const LogOutButton = () => {
  const { logOut } = useAuth();

  return (
    <button className="btn btn-block" onClick={logOut}>
      LOG OUT
    </button>
  );
}

const Home = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div>
      <h1>Logged in</h1>
      <LogOutButton />
    </div>
  );
}

export default Home;