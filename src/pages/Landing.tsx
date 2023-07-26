import { Link } from "react-router-dom";
import { useAuth } from "src/api/auth";

const Landing = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <Link to="/clients">manage clients</Link>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Landing;
