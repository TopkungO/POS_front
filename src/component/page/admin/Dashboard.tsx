import MenuAdmin from '../../layout/MenuAdmin';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Layout } from 'antd';
import SingleCard from '../../layout/SingleCard';
import ReactApexChart from "react-apexcharts";

import { PlayCircleOutlined } from '@ant-design/icons';


const Dashboard = () => {
    const options = {
        chart: {
            height: 350,
            zoom: {
                enabled: false
            },

        }
    };

    const series = [
        {
            name: "All Tasks",
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: "My Tasks",
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ];

    return (
        <>
            <Layout>
                <Sider style={{ background: "none" }}>
                    <MenuAdmin />
                </Sider>
                <Content style={{ padding: '50px 100px', minHeight: 280 }} >
                    <div className='container'>
                        <h1 className='text-2xl mb-5'>Dashboard</h1>
                        <div className='grid grid-cols-4 gap-4'>
                            <SingleCard bg="bg-red" text_color='#000' icon={<PlayCircleOutlined />} header_card="today Sales" prict_card="$ 1000 Bath"/>
                            <SingleCard bg="bg-pink" text_color='#000' icon={<PlayCircleOutlined />} header_card="Sales" prict_card="$ 1000 Bath"/>
                            <SingleCard bg="bg-purple" text_color='#000' icon={<PlayCircleOutlined />} header_card="today Sales" prict_card="$ 1000 Bath"/>
                            <SingleCard bg="bg-gray" text_color='#000' icon={<PlayCircleOutlined />} header_card="custom" prict_card="$ 1000 Bath"/>
                        </div>
                        <div className='grid grid-cols-4 gap-4 my-5'>
                            <SingleCard bg="bg-green" text_color='#000' icon={<PlayCircleOutlined />} header_card="Buy" prict_card="$ 1000 Bath"/>
                            <SingleCard bg="bg-green" text_color='#000' icon={<PlayCircleOutlined />} header_card="Oder" prict_card="$ 1000 Bath"/>
                            <SingleCard bg="bg-darkRed" text_color='#000' icon={<PlayCircleOutlined />} header_card="Test" prict_card="$ 1000 Bath"/>
                            <SingleCard bg="bg-sea" text_color='#000' icon={<PlayCircleOutlined />} header_card="today Sales" prict_card="$ 1000 Bath"/>
                        </div>
                        <div>
                            <ReactApexChart
                                type="line"
                                options={options}
                                series={series}
                                height={350}
                            />
                        </div>
                    </div>
                </Content>

            </Layout>
        </>
    )
}

export default Dashboard