"use client";
import { locationsList } from "@/consts";
interface ILocationSelectProps {
  onSelectChange: (selectedComuna: string) => void;
  onStreetChange: (street: string) => void;
  onNumerationChange: (numeration: number) => void;
  onBlurHandle: () => void;
}
export default function LocationSelect({
  onSelectChange,
  onStreetChange,
  onNumerationChange,
  onBlurHandle,
}: ILocationSelectProps) {
  return (
    <div className="my-16 bg-[var(--bg-200)] py-3 px-6 rounded">
      <h1>Datos de envío</h1>
      <form className="my-5 border p-5 rounded">
        <div className="flex flex-wrap md:justify-evenly gap-5">
          <div className="">
            <h4 className="text-sm">Comuna:</h4>
            <select
              name=""
              id=""
              className="bg-[var(--bg-300)] py-1 px-2 border rounded"
              onChange={(e) => {
                onSelectChange(e.target.value);
              }}
            >
              <option value="0">Selecciona...</option>
              {Object.keys(locationsList).map((location, i) => {
                return (
                  <option value={location} key={location}>
                    {location}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="">
            <h4 className="text-sm">Calle:</h4>
            <input
              type="text"
              placeholder="Calle..."
              className="bg-[var(--bg-300)] py-1 px-2 rounded"
              onChange={(e) => {
                onStreetChange(e.target.value);
              }}
              onBlur={async () => {
                await onBlurHandle();
              }}
            />
          </div>
          <div className="">
            <h4 className="text-sm">Número:</h4>
            <input
              type="text"
              placeholder="Número..."
              className="bg-[var(--bg-300)] py-1 px-2 rounded"
              onChange={(e) => {
                onNumerationChange(Number(e.target.value));
              }}
              onBlur={async () => {
                await onBlurHandle();
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
