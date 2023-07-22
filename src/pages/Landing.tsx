import { useAuth } from "src/api/auth";

const Landing = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Landing;
