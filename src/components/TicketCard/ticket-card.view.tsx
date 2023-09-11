import { Row, Col, Button } from 'antd';
import { ITicket } from './ticket-card.model'
import { getNumWord } from '../../helpers/getNumWord';
import './ticket-card.styles.css';


type ITicketCardProps = {
  data: ITicket
}

export const TicketCard = ({ data }: ITicketCardProps) => {
  const stops = `${data.stops} ${getNumWord(data.stops, ['пересадка', 'пересадки', 'пересадок'])}`;

  const onHandleClick = () => {
    alert(`оформлено`);
  }

  return (
    <Row className='ticketCard'>
      <Col span={8}>
        <div>
          Компания {data.carrier}
        </div>
        <Button onClick={onHandleClick}>Купить за {data.price}</Button>
      </Col>
      <Col span={16}>
        <Row gutter={[16, 0]} >
          <Col>
            <div>{`${data.origin}, ${data.origin_name}`}</div>
            <div>{`${data.departure_time}, ${data.departure_date}`}</div>
          </Col>
          <Col>{stops}</Col>
          <Col>
            <div>{`${data.destination}, ${data.destination_name}`}</div>
            <div>{`${data.arrival_time}, ${data.arrival_date}`}</div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
