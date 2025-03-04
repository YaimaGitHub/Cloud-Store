import { useState } from "react";

function UseIterate({ item = [], value = 0 }) {
  const [count, setcount] = useState(value);

  const prev = () => {
    if (count === 0)
      return setcount(item.length - 1);
    setcount(count - 1);
  };

  const next = () => {

    if (count === item.length - 1)
      return setcount(0);
    setcount(count + 1);
  };

  return [item[count], prev, next];
}
