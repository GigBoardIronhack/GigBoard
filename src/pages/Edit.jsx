import { useEffect, useState } from "react";
import { getUserService } from "../services/auth.service";
import { useParams } from "react-router-dom";
import Register from "./Register";

const Edit = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserService(id);
        setUser(user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div>
      <Register user={user} key={user.id} isEditing />
    </div>
  );
};

export default Edit;
