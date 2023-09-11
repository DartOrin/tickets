import { FC, useMemo, useState } from 'react';
import { Input, Layout, theme } from 'antd';
import { TicketCard } from './components/TicketCard';
import { Filters } from './components/Filters';
import { ITicket } from './components/TicketCard/ticket-card.model';
import data from './tickets.json';
import './App.css';

const { Sider, Content } = Layout;

const { Search } = Input;

const sortedTickets = data.tickets.sort((a, b) => {
  if (a.price < b.price) {
    return -1;
  }
  if (a.price > b.price) {
    return 1;
  }
  return 0;
});

const externalStopsList = [0, 1, 2, 3];

const App: FC = () => {
  const [filteredTickets, setFilteredTickets] = useState<ITicket[]>(sortedTickets);
  const [stopsList, setStopsList] = useState<number[]>(externalStopsList);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = filteredTickets.filter(
        (ticket) =>
          ticket.carrier.toLowerCase().includes(value.toLowerCase()) ||
          ticket.origin_name.toLowerCase().includes(value.toLowerCase()) ||
          ticket.destination_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(sortedTickets);
    }
  };

  const tickets = useMemo(() => {
    const newTickets = filteredTickets.filter(ticket => stopsList.includes(ticket.stops))
    return newTickets;
  }, [filteredTickets, stopsList]);

  return (
    <div className="container">
      <Layout hasSider>
        <Content>
          <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Filters
                declination={['пересадка', 'пересадки', 'пересадок']}
                options={[0, 1, 2, 3]}
                checkedList={stopsList}
                setCheckedList={setStopsList}
              />
            </Sider>
            <Content style={{ padding: '24px' }}>
              <Search
                placeholder="Поиск по авиакомпании, месту отправления или прибытия"
                onSearch={handleSearch}
                style={{ marginBottom: 20 }}
                allowClear
              />
              <div className='ticketList'>
                {tickets.map(ticket => <TicketCard data={ticket} key={ticket.arrival_time} />)}
              </div>
            </Content>
          </Layout>
        </Content>

      </Layout>
    </div>
  );
}

export default App;
