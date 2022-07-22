import { useCallback, useEffect, useState } from 'react'
import useInterval from 'react-useinterval'
import { Typography, Badge, Row, Col } from 'antd'
import { useChainState, useLinks } from '@vechain.energy/use-vechain'

const { Text, Link: LinkExt } = Typography

const DELAY_INFO_SECONDS = 8
const DELAY_WARNING_SECONDS = 30
const DELAY_ERROR_SECONDS = 60

export default function LayoutConnectivity () {
  const { head } = useChainState()
  const { getBlockLink } = useLinks()
  const [connecting, setConnecting] = useState(true)
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    if (connecting && head) {
      setConnecting(false)
    } else if (!connecting && !head) {
      setConnecting(true)
    }
  }, [head, connecting])

  useEffect(() => {
    if (!head) {
      return setDelay(0)
    }

    const now = +(new Date()) / 1000
    const delay = Math.round(now - head.timestamp)
    setDelay(delay < 0 ? 0 : delay)
  }, [head])

  const increaseDelay = useCallback(function () {
    setDelay(delay + 1)
  }, [delay])

  useInterval(increaseDelay, 1 * 1000)

  return (
    <Row gutter={[0, 16]}>

      <Col span={24} align='center'>
        <StatusCircle delay={delay} loading={connecting}>
          <LinkExt href={getBlockLink(head?.id)} target='_blank' rel='noreferrer'>Block: {Number(head?.number || 0).toLocaleString() || 'Disonnected'}</LinkExt>
        </StatusCircle>
        <Text type='secondary'>&nbsp;&nbsp;·&nbsp;&nbsp;Last known data from {delay}s ago</Text>
      </Col>

    </Row>
  )
}

const StatusCircle = ({ delay, loading, children: text }) => {
  if (loading) {
    return <Badge status='processing' color='yellow' text={text} />
  }

  if (delay > DELAY_ERROR_SECONDS) {
    return <Badge status='error' color='magenta' text={text} />
  }

  if (delay > DELAY_WARNING_SECONDS) {
    return <Badge status='warning' color='yellow' text={text} />
  }
  if (delay > DELAY_INFO_SECONDS) {
    return <Badge status='processing' color='rgb(75, 219, 75)' text={text} />
  }

  return <Badge status='success' color='rgb(75, 219, 75)' text={text} />
}
