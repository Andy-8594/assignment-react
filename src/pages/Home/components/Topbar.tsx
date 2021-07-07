//@ts-ignore
import { useHistory } from "react-router-dom";
import { PATHS } from "../../../constants/paths";

const navigation = [
    { id: 1, name: 'Home', href: '/'},
    { id: 2, name: 'Posts', href: '/posts'},
    { id: 3, name: 'Profile', href: '/profile'},
  ]




const Topbar = () => {
  const history = useHistory();

  const logOut = () => {
    console.log("log out trigger");
    localStorage.removeItem("token");
    history.push(PATHS.LOGIN)
  };

  const token = localStorage.getItem("token");
  
  return (
    <div>
      <div className=" sm:h-12 h-12 flex flex-wrap">
        <div className="w-full">
          <div className="flex p-3 bg-brown">
            <div className="flex-grow">       
              <ul className="text-white float-left flex flex-grow">
                {navigation.map((item) => (
                    <li className="mr-6" key={item.id}>
                        <a href={item.href}>{item.name}</a>
                    </li>
                ))}
                {(token !== undefined && token !== null) ?
                  (<li>
                      <button onClick={logOut}>Logout</button>
                  </li>)
                :
                (<li>
                  <a href={PATHS.LOGIN}>Login</a>
                </li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
