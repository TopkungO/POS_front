import MenuAdmin from '../../layout/MenuAdmin';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Col, Divider, Layout, Row, } from 'antd';
import TableUser from './layoutAdmin/TableUser';



const UserDash = () => {

  return (
    <>
      <Layout>
        <Sider style={{ background: "none" }}>
          <MenuAdmin />
        </Sider>
        <Content style={{ padding: '50px 100px', minHeight: 280 }} >
          <Row>
            <Col span={20}><div className='text-2xl'>User</div> </Col>
          </Row>
          <Divider />

          <TableUser/>
        </Content>

      </Layout>
    </>
  )
}

export default UserDash