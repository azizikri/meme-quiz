import { useLocation, useNavigate } from 'react-router-dom'
import { Result, Typography, Button, Space } from 'antd'

const { Title } = Typography

interface LocationState {
    score: number
    totalQuestions: number
    playerName: string
    difficulty: string
}

const ResultComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { score = 0, totalQuestions = 5, playerName = 'Player', difficulty = 'medium' } =
        (location.state as LocationState) || {}

    const getResultStatus = () => {
        const percentage = (score / totalQuestions) * 100
        if (percentage >= 80) return 'success'
        if (percentage >= 60) return 'warning'
        return 'info'
    }

    const getResultTitle = () => {
        const percentage = (score / totalQuestions) * 100
        if (percentage >= 80) return '🎉 Luar Biasa!'
        if (percentage >= 60) return '👍 Bagus!'
        if (percentage >= 40) return '😊 Tidak Buruk!'
        return '💪 Terus Berlatih!'
    }

    const getResultSubtitle = () => {
        const percentage = (score / totalQuestions) * 100
        if (percentage >= 80) return `Wow ${playerName}! Kamu benar-benar ahli meme! 🔥`
        if (percentage >= 60) return `Kerja bagus ${playerName}! Kamu cukup mengenal meme! 👏`
        if (percentage >= 40) return `Lumayan ${playerName}! Masih ada ruang untuk belajar! 📚`
        return `Jangan menyerah ${playerName}! Practice makes perfect! 💪`
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <div style={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
                <Result
                    status={getResultStatus()}
                    title={getResultTitle()}
                    subTitle={
                        <Space direction="vertical" size="small">
                            <div>{getResultSubtitle()}</div>
                            <Title level={2} style={{ color: '#1890ff', margin: '16px 0' }}>
                                {score}/{totalQuestions}
                            </Title>
                            <div style={{ color: '#666', fontSize: '14px' }}>
                                Kesulitan: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </div>
                        </Space>
                    }
                    extra={
                        <Space size="middle" wrap>
                            <Button
                                type="primary"
                                size="large"
                                onClick={() => navigate('/quiz', { state: { playerName, difficulty } })}
                            >
                                Main Lagi
                            </Button>
                            <Button
                                size="large"
                                onClick={() => navigate('/')}
                            >
                                Kembali ke Home
                            </Button>
                        </Space>
                    }
                />
            </div>
        </div>
    )
}

export default ResultComponent
