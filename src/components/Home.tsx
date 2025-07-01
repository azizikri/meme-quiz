import { useNavigate } from 'react-router-dom'
import { Card, Typography, Form, Input, Select, Button, Space } from 'antd'

const { Title } = Typography
const { Option } = Select

interface HomeFormData {
    name: string
    difficulty: string
}

const Home = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const handleSubmit = (values: HomeFormData) => {
        console.log('Form values:', values)
        navigate('/quiz', { state: { playerName: values.name, difficulty: values.difficulty } })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: 500,
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2} style={{ color: '#1890ff', marginBottom: 0 }}>
                        Joquiz 🤵🏻‍♂️
                    </Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        style={{ textAlign: 'left' }}
                    >
                        <Form.Item
                            label="Nama Pemain"
                            name="name"
                            rules={[{ required: true, message: 'Silakan masukkan nama Anda!' }]}
                        >
                            <Input
                                placeholder="Masukkan nama Anda"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Tingkat Kesulitan"
                            name="difficulty"
                            rules={[{ required: true, message: 'Silakan pilih tingkat kesulitan!' }]}
                        >
                            <Select
                                placeholder="Pilih tingkat kesulitan"
                                size="large"
                            >
                                <Option value="easy">Mudah</Option>
                                <Option value="medium">Sedang</Option>
                                <Option value="hard">Sulit</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                style={{ marginTop: '16px' }}
                            >
                                Mulai Quiz
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    )
}

export default Home
