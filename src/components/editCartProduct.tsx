import { useState } from "react";

export default function EditCartProduct({
  id,
  cant,
  handleSave,
}: {
  id: number;
  cant: number;
  handleSave: (value: number) => void;
}) {
  const [value, setValue] = useState(cant);
  return (
    <>
      <h3 className="text-lg mb-10">¿Cuantos querías llevar?</h3>
      <div className="flex justify-evenly items-center my-3">
        <button
          onClick={() => {
            if (value === 1) return;
            setValue(value - 1);
          }}
          className="bg-red-500 rounded-md shadow-md shadow-black py-3 px-6"
        >
          -
        </button>
        <label id={`newValue${id}`}>{value}</label>
        <button
          onClick={() => {
            if (value >= 10) return;
            setValue(value + 1);
          }}
          className="bg-green-500 rounded-md shadow-md shadow-black py-3 px-6"
        >
          +
        </button>
      </div>
      <div className="flex gap-8 justify-end mt-14 mb-3">
        <button
          onClick={() => {
            handleSave(value);
          }}
          className="text-[var(--primary-100)] hover:text-[var(--primary-200)]"
        >
          Guardar
        </button>
      </div>
    </>
  );
}
