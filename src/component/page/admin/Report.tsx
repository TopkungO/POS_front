import MenuAdmin from '../../layout/MenuAdmin';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Layout } from 'antd';

const Report = () => {
  return (
      <>
          <Layout>
              <Sider style={{ background: "none" }}>
                  <MenuAdmin />
              </Sider>
              <Content style={{ padding: '50px 100px', minHeight: 280 }} >
                  report
              </Content>

          </Layout>
      </>
  )
}

export default Report