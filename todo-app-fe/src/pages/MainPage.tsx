import { useEffect, useState } from "react";
import {
  IconCheck,
  IconMoon,
  IconSun,
  desktopDark,
  desktopLight,
  mobileDark,
  mobileLight,
} from "../utils/importPictures";
import classNames from "../utils/classNames";
import Todo from "../components/Todo";
import {
  createTodo,
  deleteCompletedTodos,
  getSingleUser,
} from "../services/user";
import { TodoProps, User } from "../utils/types";

const MainPage = ({
  user,
  handleUser,
  darkMode,
  handleDarkMode,
}: {
  user: User;
  handleUser: React.Dispatch<React.SetStateAction<null>>;
  darkMode: boolean;
  handleDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [filter, setFilter] = useState("all");
  const [isMarked, setIsMarked] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    getSingleUser(user.id)
      .then((currentUser) => {
        setTodos(currentUser.todos);
        setLoadPage(false);
      })
      .catch((error) => console.error(error));
  }, [user.id, loadPage, newTodo]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNotappUser");
    handleUser(null);
  };

  return (
    <div className="max-h-full min-h-screen">
      {darkMode ? (
        <picture>
          <source media="(min-width:640px)" srcSet={desktopDark} />
          <img
            src={mobileDark}
            alt="todo background image"
            className="h-80 w-full object-cover"
          />
        </picture>
      ) : (
        <picture>
          <source media="(min-width:640px)" srcSet={desktopLight} />
          <img
            src={mobileLight}
            alt="todo background image"
            className="h-80 w-full object-cover"
          />
        </picture>
      )}

      <div className="mx-auto flex w-11/12 max-w-2xl -translate-y-64 flex-col gap-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-[0.35em] text-white sm:text-5xl sm:tracking-[0.5em]">
            TODO
          </h1>
          {darkMode ? (
            <IconSun
              onClick={() => handleDarkMode(!darkMode)}
              className="h-7 w-7 cursor-pointer"
            />
          ) : (
            <IconMoon
              onClick={() => handleDarkMode(!darkMode)}
              className="h-7 w-7 cursor-pointer"
            />
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div
            className={classNames(
              darkMode
                ? "bg-very-dark-desaturated-blue"
                : "bg-white text-very-dark-desaturated-blue",
              "flex items-center gap-6 rounded  px-8 py-4 text-white shadow-lg",
            )}
          >
            <div
              onClick={() => setIsMarked(!isMarked)}
              className={classNames(
                darkMode
                  ? "border-very-dark-desaturated-blue hover:border-very-dark-desaturated-blue "
                  : "border-very-light-grayish-blue hover:border-very-light-grayish-blue",
                isMarked
                  ? "border border-solid bg-gradient-to-br from-light-blue to-light-purple"
                  : "rounded border border-solid border-very-dark-grayish-blue p-0.5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500",
                "flex cursor-pointer items-center justify-center rounded-full",
              )}
            >
              {isMarked ? (
                <IconCheck
                  className={classNames(
                    isMarked ? "block" : "hidden",
                    "mr-[50%] flex h-6 w-6 translate-x-1/2 translate-y-1/3",
                  )}
                />
              ) : (
                <span
                  className={classNames(
                    darkMode ? "bg-very-dark-desaturated-blue" : "bg-white",
                    "flex h-5 w-5 rounded-full",
                  )}
                ></span>
              )}
            </div>

            <input
              type="text"
              value={newTodo}
              placeholder="Create a new todo"
              onChange={({ target }) => setNewTodo(target.value)}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  createTodo({
                    content: newTodo,
                    marked: isMarked,
                  })
                    .then(() => {
                      setNewTodo("");
                      setIsMarked(false);
                      setLoadPage(true);
                    })
                    .catch((error) => console.error(error));
                }
              }}
              className={classNames(
                darkMode
                  ? "bg-very-dark-desaturated-blue"
                  : "bg-white text-very-dark-desaturated-blue",
                "flex h-8 w-full items-center text-base focus-visible:outline-none sm:text-lg",
              )}
            />
          </div>

          <div className="flex flex-col overflow-hidden rounded shadow-lg">
            {todos
              .filter((todo) => {
                if (filter === "active") {
                  return !todo.marked;
                }

                if (filter === "completed") {
                  return todo.marked;
                }

                return todo;
              })
              .map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  marked={todo.marked}
                  content={todo.content}
                  handleLoadPage={setLoadPage}
                  darkMode={darkMode}
                  handleDarkMode={handleDarkMode}
                />
              ))}
            <div
              className={classNames(
                darkMode ? "bg-very-dark-desaturated-blue" : "bg-white",
                "flex items-center justify-between gap-6 px-8 py-4 text-sm text-white",
              )}
            >
              <div className="text-very-dark-grayish-blue">
                {
                  todos.filter((todo) => {
                    if (filter === "active") {
                      return !todo.marked;
                    }

                    if (filter === "completed") {
                      return todo.marked;
                    }

                    return todo;
                  }).length
                }{" "}
                items left
              </div>
              <div className="hidden gap-6 text-very-dark-grayish-blue sm:flex">
                <button
                  onClick={() => setFilter("all")}
                  className={classNames(
                    filter === "all" ? "text-bright-blue" : "",
                    darkMode ? "hover:text-white" : "hover:text-very-dark-blue",
                    "cursor-pointer font-bold",
                  )}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={classNames(
                    filter === "active" ? "text-bright-blue" : "",
                    darkMode ? "hover:text-white" : "hover:text-very-dark-blue",
                    "cursor-pointer font-bold",
                  )}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={classNames(
                    filter === "completed" ? "text-bright-blue" : "",
                    darkMode ? "hover:text-white" : "hover:text-very-dark-blue",
                    "cursor-pointer font-bold",
                  )}
                >
                  Completed
                </button>
              </div>
              <div
                onClick={() => {
                  deleteCompletedTodos(user.id)
                    .then(() => setLoadPage(true))
                    .catch((error) => console.error(error));
                }}
                className={classNames(
                  darkMode
                    ? "text-very-dark-grayish-blue hover:text-white"
                    : "text-very-dark-grayish-blue hover:text-very-dark-blue",
                  "cursor-pointer",
                )}
              >
                Clear Completed
              </div>
            </div>
          </div>

          <div
            className={classNames(
              darkMode
                ? "bg-very-dark-desaturated-blue text-very-dark-grayish-blue"
                : "bg-white text-very-dark-grayish-blue",
              "flex items-center justify-center gap-6 rounded px-8 py-4 text-sm shadow-lg sm:hidden",
            )}
          >
            <button
              onClick={() => setFilter("all")}
              className={classNames(
                darkMode ? "hover:text-white" : "hover:text-very-dark-blue",
                filter === "all" ? "text-bright-blue" : "",
                "cursor-pointer font-bold",
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={classNames(
                darkMode ? "hover:text-white" : "hover:text-very-dark-blue",
                filter === "active" ? "text-bright-blue" : "",
                "cursor-pointer font-bold",
              )}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={classNames(
                darkMode ? "hover:text-white" : "hover:text-very-dark-blue",
                filter === "completed" ? "text-bright-blue" : "",
                "cursor-pointer font-bold",
              )}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={handleLogout}
            className="w-36 rounded bg-red-600 p-4 text-white shadow-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
