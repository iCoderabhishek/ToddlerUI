import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  todos: TodoItem[];
  speed?: "normal" | "medium" | "fast";
  fontStyle?: string;
  color?: string;
}

interface animatedTodoProps {
  todo: TodoItem;
  onToggle: (id: number) => void;
  duration: number;
  color: string;
  completed: boolean;
}

const SPEED_MAP = {
  normal: 0.6,
  medium: 0.4,
  fast: 0.2,
} as const;

type Speed = keyof typeof SPEED_MAP;

const SVG_PATH =
  "M -5 10 Q 0 2, 5 10 T 15 10 T 25 10 T 35 10 T 45 10 T 55 10 T 65 10 T 75 10 T 85 10 T 95 10 T 105 10";

const CoolTodo = ({
  todos: initialTodos,
  speed = "normal",
  fontStyle = "font-mono",
  color = "text-neutral-700",
}: TodoProps) => {
  const [todos, setTodos] = useState(initialTodos);

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const duration = SPEED_MAP[speed] ?? SPEED_MAP.normal;

  return (
    <div className={`flex flex-col justify-center items-center  ${fontStyle}`}>
      <ul className="flex flex-col gap-2 p-2">
        {todos.map((todo) => (
          <li key={todo.id} className="relative">
            <AnimatedTodo
              todo={todo}
              onToggle={handleToggle}
              duration={duration}
              color={color}
              completed={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnimatedTodo = ({
  todo,
  onToggle,
  duration,
  color,
}: animatedTodoProps) => {
  const hasAnimated = useRef(false);

  const shouldShowSpiral = todo.completed && !hasAnimated.current;

  useEffect(() => {
    if (todo.completed && !hasAnimated.current) {
      hasAnimated.current = true;
    }
    if (!todo.completed) {
      hasAnimated.current = false;
    }
  }, [todo.completed]);

  return (
    <motion.button
      whileTap={{
        scale: 1.2,
        rotate: 45,
      }}
      animate={{
        scale: todo.completed ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      onClick={() => onToggle(todo.id)}
      className="flex w-fit cursor-pointer items-center gap-2 rounded-md p-3 hover:bg-gray-100 relative"
      role="checkbox"
      aria-checked={todo.completed}
    >
      <motion.input
        type="checkbox"
        checked={todo.completed}
        readOnly
        className="h-4 w-4 rounded-2xl cursor-pointer accent-gray-500"
      />
      <span
        className={`relative ${
          todo.completed ? "text-gray-300" : color
        } whitespace-nowrap`}
      >
        {todo.title}
        {shouldShowSpiral && <SPIRAL_SVG duration={duration} />}
      </span>
    </motion.button>
  );
};

const SPIRAL_SVG = ({
  duration,
  className,
}: {
  duration: number;
  className?: string;
}) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-5 0 115 20"
    className="absolute left-0 bottom-0 w-full h-[1.2em] pointer-events-none"
  >
    <motion.path
      d={SVG_PATH}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="300"
      initial={{ strokeDashoffset: 300 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration, ease: "easeInOut" }}
    />
  </motion.svg>
);

export default CoolTodo;
