import IconCheck from "../assets/IconCheck";
import IconCross from "../assets/IconCross";
import { deleteTodo, markTodos } from "../services/user";
import classNames from "../utils/classNames";
import { TodoProps } from "../utils/types";

const Todo = (props: TodoProps) => {
  return (
    <div
      className={classNames(
        props.darkMode
          ? "border-very-dark-grayish-blue bg-very-dark-desaturated-blue"
          : "border-very-light-grayish-blue bg-white",
        "flex items-center gap-6 overflow-hidden border-b border-solid px-8 py-5 text-white",
      )}
    >
      <div
        onClick={() => {
          markTodos(props.id)
            .then(() => props.handleLoadPage(true))
            .catch((error) => console.error(error));
        }}
        className={classNames(
          props.darkMode
            ? "border-very-dark-desaturated-blue hover:border-very-dark-desaturated-blue "
            : "border-very-light-grayish-blue hover:border-very-light-grayish-blue",
          props.marked
            ? "border border-solid bg-gradient-to-br from-light-blue to-light-purple"
            : "rounded border border-solid border-very-dark-grayish-blue p-0.5 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500",
          "flex cursor-pointer items-center justify-center rounded-full",
        )}
      >
        {props.marked ? (
          <IconCheck
            className={classNames(
              props.marked ? "block" : "hidden",
              "mr-[50%] flex h-6 w-6 translate-x-1/2 translate-y-1/3",
            )}
          />
        ) : (
          <span
            className={classNames(
              props.darkMode ? "bg-very-dark-desaturated-blue" : "bg-white",
              "flex h-5 w-5 rounded-full",
            )}
          ></span>
        )}
      </div>

      <div
        className={classNames(
          props.darkMode
            ? "bg-very-dark-desaturated-blue"
            : "bg-white text-very-dark-desaturated-blue",
          "group flex h-full w-full items-center justify-between gap-4 whitespace-normal text-base sm:text-lg",
        )}
      >
        <span
          className={classNames(
            props.marked && props.darkMode
              ? "text-very-dark-grayish-blue line-through"
              : props.marked && !props.darkMode
                ? "text-very-light-grayish-blue line-through"
                : "",
            "group-hover:cursor-default",
          )}
        >
          {props.content}
        </span>
        <IconCross
          onClick={() =>
            deleteTodo(props.id)
              .then(() => props.handleLoadPage(true))
              .catch((error) => console.error(error))
          }
          className="h-5 w-5 flex-none cursor-pointer group-hover:block sm:hidden"
        />
      </div>
    </div>
  );
};

export default Todo;
