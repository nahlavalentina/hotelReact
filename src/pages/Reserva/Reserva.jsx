import React from "react";
import S from "./Reserva.module.css"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Title from "../../components/Title/Title";
import { getBookingByBookingId } from "../../service/api";
import { deleteBooking } from "../../service/api";
import { editBooking } from "../../service/api";
import Button from "../../components/Button/Button";

const Reserva = () => {
  const params = useParams();
  const { ID_RESERVA } = params;
  const [oldData, setOldData] = useState({
    ID_RESERVA: ID_RESERVA,
    ID_HOSPEDE: "",
    ID_QUARTO: "",
    CHECKIN: "",
    CHECKOUT: "",
  });

  // const [status, setStatus] = useState({
  //   type: "",
  //   message: "",
  // });

  async function getReservas() {
    const response = await getBookingByBookingId(ID_RESERVA);
    setOldData(response);
  }

  function handleChange(e, key) {
    const value = e.target.value;
    setOldData({ ...oldData, [key]: value });
  }

  async function handleDelete() {
    const response = await deleteBooking();
    console.log(response);
  }

  useEffect(() => {
    getReservas();
  }, []);

  const request = async (e) => {
    e.preventDefault();
    const response = await editBooking(ID_RESERVA, oldData);
  setOldData(response)
  console.log(response);
    // if (response) {
    //   setStatus({
    //     type: "sucess",
    //     mensagem: "Dados alterados com sucesso!",
    //   });
    // }
  };

  return (
    <div>
      <Title title="Bem vindo(a), Nahla" />

      <h3>Editar Reserva:</h3>
      <div>
        <div>
          <form action="">
            <input
              type="number"
              name="reserva"
              id="reserva"
              placeholder="Reserva"
              value={oldData.ID_RESERVA}
              onChange={(e) => handleChange(e, "ID_RESERVA")}
            />

            <input
              type="number"
              name="quarto"
              id="quarto"
              placeholder="Quarto"
              value={oldData.ID_QUARTO}
              onChange={(e) => handleChange(e, "ID_QUARTO")}
            />

            <input
              type="nuumber"
              name="hospede"
              id="hospede"
              placeholder="Hóspede"
              value={oldData.ID_HOSPEDE}
              onChange={(e) => handleChange(e, "ID_HOSPEDE")}
            />

            <input
              id="checkin"
              type="date"
              value={oldData.CHECKIN}
              onChange={(e) => handleChange(e, "CHECKIN")}
            />

            <input
              id="checkout"
              type="date"
              value={oldData.CHECKOUT}
              onChange={(e) => handleChange(e, "CHECKOUT")}
            />

            <button className={S.button} onClick={request}><p className={S.text}>atualizar</p></button>
          </form>
          <Button text="deletar" onClick={handleDelete} />
          {/* {status.type === "sucess" ? <p>{status.mensagem}</p> : ""} */}
        </div>
      </div>
    </div>
  );
};

export default Reserva;

//SOCORRO
