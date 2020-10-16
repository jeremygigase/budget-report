import React, { useRef } from "react";

const IncExpForm = ({
  incExp,
  setIncExp,
  placeholderDesc,
  placeholderInput,
  priceName,
}) => {
  const desc = useRef(null);
  const date = useRef(null);
  const price = useRef(null);

  const addIncExp = (e) => {
    e.preventDefault();

    let d = date.current.value.split("-");
    let newD = new Date(d[0], d[1] - 1, d[2]);

    if (priceName === "income") {
      setIncExp([
        ...incExp,
        {
          desc: desc.current.value,
          income: price.current.value,
          date: newD.getTime(),
        },
      ]);
    } else {
      setIncExp([
        ...incExp,
        {
          desc: desc.current.value,
          expense: price.current.value,
          date: newD.getTime(),
        },
      ]);
    }

    desc.current.value = "";
    price.current.value = null;
    date.current.value = null;
  };

  return (
    <form className="income-form" onSubmit={addIncExp}>
      <div className="form-inner">
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder={placeholderDesc}
          ref={desc}
        />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price..."
          ref={price}
        />
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Income or expense date..."
          ref={date}
        />
        <input type="submit" value={placeholderInput} />
      </div>
    </form>
  );
};

export default IncExpForm;
