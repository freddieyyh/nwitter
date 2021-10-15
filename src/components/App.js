
import AppRouter from "components/Router";
import { authService } from 'fbase';
import { useEffect, useState } from "react";

function App() {
  // eslint-disable-next-line
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState({flag: false});
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj((prev) => ({
          user: user,
          flag: !prev.flag,
        }));
      } else {
        setUserObj((prev) => ({
          flag: !prev.flag,
        }));
      }
      setInit(true);
    });
  }, []);
  
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj((prev) => ({
      user: user,
      flag: !prev.flag,
    }));
  };

  return (
    <>
      { init ? <AppRouter isLoggedIn={Boolean(userObj.user)} userObj={userObj} refreshUser={refreshUser}/>  : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
