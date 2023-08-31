import MenuAdmin from '../../layout/MenuAdmin';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Layout } from 'antd';

const Order = () => {
  return (
      <>
          <Layout>
              <Sider style={{ background: "none" }}>
                  <MenuAdmin />
              </Sider>
              <Content style={{ padding: '50px 100px', minHeight: 280 }} >
                  order
              </Content>

          </Layout>
      </>
  )
}

export default Order