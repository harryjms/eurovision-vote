import { useAuth } from "../providers/AuthProvider";

const Homepage = () => {
  const { user } = useAuth();
  return <div>Homepage {user?.name}</div>;
};

export default Homepage;
