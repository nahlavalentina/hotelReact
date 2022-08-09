import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Booking from '../../components/Booking/Booking'
import SearchBar from '../../components/SearchBar/SearchBar'
import Title from '../../components/Title/Title'
import { getBookingsById } from '../../../service/api'
import { getBookings } from '../../../service/api'

const User = () => {

    //erro ao buscar API. Método p/ buscar por id de usuário?

    const params = useParams();
    // const { ID_RESERVA } = params;
  const [reservas, setReservas] = useState();

  async function request() {
    const response = await getBookings()
    //Array vindo vazio com busca por ID
    // const response = await getBookingsById(params.reserva)
    setReservas(response);
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      <Title title="Bem vindo(a), Nahla"/>

      <h3>Nova Reserva</h3>
      <SearchBar />
      <h3>Últimas Reservas:</h3>
      <div>{!!reservas &&
        reservas.reserva.map((reserva, key) => {
          return (

            //Mudar nome dos atributos no cdg para fazer funcionar?
            <Booking
              src="https://cf.bstatic.com/images/hotel/840x460/631/63184497.jpg"
              descr="img quarto"
              key={reserva.ID_RESERVA}
              idRoom={reserva.ID_QUARTO}
              checkOut={reserva.CHECKOUT}
              checkIn={reserva.CHECKIN}
              id={reserva.ID_RESERVA}
            />
          );
        })}
    </div>

    </div>
  )
}

export default User