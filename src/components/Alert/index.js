"use client";
import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export default function Alert() {
  const { status, setAlert } = useContext(AlertContext);

  return (
    <>
      {status.type === "loader" && status.show ? (
        <div className="fixed w-full h-full bg-[#00000086] top-0 bottom-0 flex items-center justify-center">
          <div className="w-[400px] bg-white rounded-lg p-4">
            <h2 className="text-center text-4xl mb-10">Отправка...</h2>
          </div>
        </div>
      ) : (
        ""
      )}
      {status.type === "success" && status.show ? (
        <div className="fixed w-full h-full bg-[#00000086] top-0 bottom-0 flex items-center justify-center">
          <div className="w-[400px] bg-white rounded-lg p-4">
            <h2 className="text-center text-4xl mb-10">Успрешно!</h2>
            <button
              className="w-full bg-[#222] rounded-2xl py-3 px-4 text-white text-xl md:text-2xl hover:opacity-80 active:opacity-60"
              onClick={() => setAlert({ payload: false })}>
              Закрыть
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {status.type === "error" && status.show ? (
        <div className="fixed w-full h-full bg-[#00000086] top-0 bottom-0 flex items-center justify-center">
          <div className="w-[400px] bg-white rounded-lg p-4">
            <h2 className="text-center text-4xl mb-10">Ошибка!</h2>
            <p className="text-center text-2xl mb-5">{status?.error}</p>
            <button
              className="w-full bg-[#222] rounded-2xl py-3 px-4 text-white text-xl md:text-2xl hover:opacity-80 active:opacity-60"
              onClick={() => setAlert({ payload: false })}>
              Закрыть
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
