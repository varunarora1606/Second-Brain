import axios from "axios";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserPlusIcon from "../components/icons/UserPlusIcon";

function SignUpPage() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    username: "",
    password: "",
  });

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    if (!/^[a-zA-Z0-9_.-]*$/.test(e.target.value)) {
      setErrors({
        username: "Username must only contain letters",
        password: errors.password,
      });
    } else if (e.target.value.length < 5) {
      setErrors({
        username: "Username should be atleast 5 characters long",
        password: errors.password,
      });
    } else {
      setErrors({
        username: "",
        password: errors.password,
      });
    }
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      setErrors({
        username: errors.username,
        password: "Password should be atleast 5 characters long",
      });
    } else if (!/[a-zA-Z]/.test(e.target.value)) {
      setErrors({
        username: errors.username,
        password: "Password must contain atleast one alphabet",
      });
    } else if (!/\d/.test(e.target.value)) {
      setErrors({
        username: errors.username,
        password: "Password must contain atleast one number",
      });
    } else {
      setErrors({
        username: errors.username,
        password: "",
      });
    }
  };

  const handleUsernameEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      passwordRef.current?.focus();
    }
  };
  const handlePasswordEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (errors.username || errors.password) {
      return;
    }
    const response = await axios.post("/api/v1/user/signup", {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    });
    if (response.status === 400) console.log("User already exist");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("/api/v1/user/auth-check")
      .then(() => navigate("/"))
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-4 text-gray-900 flex justify-center">
      {!loading && (
        <div className="max-w-screen-xl bg-gray-4 flex justify-center flex-1 items-center">
          <div className="lg:w-1/2 xl:w-5/12 py-15 px-6 sm:px-12 bg-white flex shadow-md rounded-2xl justify-center items-center h-fit">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
              <div className="w-full flex-1 mt-12">
                <div className="flex flex-col items-center">
                  <button className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-1 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-10" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>

                  <button className="w-full cursor-pointer max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-1 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-10">
                    <div className="bg-white p-1 rounded-full">
                      <svg className="w-12" viewBox="0 0 32 32">
                        <path
                          fillRule="evenodd"
                          d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                        />
                      </svg>
                    </div>
                    <span className="ml-4">Sign Up with GitHub</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-4 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-3/5">
                    Or sign Up with username
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <input
                    ref={usernameRef}
                    autoFocus
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="username"
                    onKeyUp={handleUsernameEnter}
                    onChange={handleChangeUsername}
                  />
                  <small className="text-red-600 font-medium">
                    {errors.username}
                  </small>
                  <input
                    ref={passwordRef}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-7.5"
                    type="password"
                    placeholder="Password"
                    onKeyUp={handlePasswordEnter}
                    onChange={handleChangePassword}
                  />
                  <small className="text-red-600 font-medium">
                    {errors.password}
                  </small>
                  <button className="mt-7.5 cursor-pointer tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="w-12 h-12 -ml-4">
                      <UserPlusIcon />
                    </span>
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-9 text-xs text-gray-600 text-center">
                    Already have an account:
                    <button
                      onClick={() => navigate("/login")}
                      className="hover:border-b-2 font-bold ml-3 cursor-pointer"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
