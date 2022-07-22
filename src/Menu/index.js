import { Link, useLocation } from 'react-router-dom'

import { Menu } from 'antd'

export default function AppMenu () {
  const location = useLocation()

  return (
    <Menu
      selectedKeys={[location.pathname, `${location.pathname}/`]}
    >
      <Menu.Item key='/account'><Link to='/account'>Account</Link></Menu.Item>
      <Menu.Item key='/network'><Link to='/network'>Network</Link></Menu.Item>
    </Menu>
  )
}
