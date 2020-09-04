import React, { useState } from 'react'
import { useIntl } from 'umi'
import { useClickAway } from 'ahooks'
import { Icon } from 'antd'
import QRCode from 'qrcode.react'

interface IProps {
  boxStyle?: Object
  codeValue: string
}

const QRC: React.FC<IProps> = ({ codeValue, boxStyle }) => {
  const intl = useIntl()
  const [show, setShow] = useState(false)

  const downloadRQCode = () => {
    const canvas = document.getElementById('qrcode_canvas') as any
    const saveUrl = canvas.toDataURL('image/png') as any
    const dlink = document.createElement('a')
    dlink.setAttribute('type', 'hidden')
    document.body.appendChild(dlink)
    dlink.href = saveUrl
    dlink.download = 'QRCode'
    dlink.click()
  }

  useClickAway(
    () => {
      setShow(false)
    },
    () => document.getElementById('qrcode_box')
  )

  return (
    <div
      id="qrcode_box"
      style={{
        position: 'relative',
        ...boxStyle
      }}
    >
      <span onClick={() => setShow(true)}>
          <Icon
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer'
            }}
          />
      </span>
      {show ? (
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '124px',
            height: '145px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
            padding: '5px 12px 0px 12px',
            left: '-60px',
            top: '27px'
          }}
        >
          <QRCode id="qrcode_canvas" value={codeValue} size={100} />
          <div
            style={{
              color: '#4A4C4F',
              cursor: 'pointer',
              fontSize: '12px',
              paddingTop: '6px'
            }}
          >
            <span onClick={() => downloadRQCode()}>
              {intl.formatMessage({ id: 'download.qrcode', defaultMessage: '下载二维码' })}
            </span>
          </div>
        </div>
      ) : (
          ''
        )}
    </div>
  )
}

export default QRC
