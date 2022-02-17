import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// optional parameter: newUsername
// description: If it contains a truthy value, user is deemed as logged in
function useCurrentUser(newUsername) {
  const [currentUser, setCurrentUser] = useState("");

  const { state } = useLocation(); // Get the state associated with latest navigation

  useEffect(() => {
    if (state) {
      // Check for a truthy value to avoid errors - has to be nested
      if (state.username && state.username !== currentUser)
        if (newUsername) {
          setCurrentUser(newUsername);
        } else {
          setCurrentUser(state.username);
        }
    }
  }, [currentUser, state, newUsername]);

  if (newUsername) return newUsername;
  return currentUser;
}

export default useCurrentUser;
