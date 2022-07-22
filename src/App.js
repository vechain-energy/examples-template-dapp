import { Routes, Route } from 'react-router-dom'
import { Row, Col } from 'antd'
import Menu from './Menu'
import Account from './common/Account'
import Network from './common/Network'

export default function App () {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} />
      <Col span={6}><Menu /></Col>
      <Col span={18}>
        <Routes>
          <Route path='/account' element={<Account />} />
          <Route path='/network' element={<Network />} />
        </Routes>
      </Col>
    </Row>
  )
}
