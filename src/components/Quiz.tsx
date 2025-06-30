import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, Typography, Image, Button, Row, Col, Space, Spin } from 'antd'
import type { QuizQuestion } from '../types'

const { Title, Text } = Typography

interface LocationState {
    playerName: string
    difficulty: string
}

const Quiz = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { playerName, difficulty } = (location.state as LocationState) || { playerName: 'Player', difficulty: 'medium' }

    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch('/quizData.json')
                const data: QuizQuestion[] = await response.json()
                setQuestions(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching quiz data:', error)
                setLoading(false)
            }
        }

        fetchQuizData()
    }, [])

    const handleAnswerClick = (selectedAnswer: string) => {
        if (showResult) return

        setSelectedAnswer(selectedAnswer)
        setShowResult(true)

        const currentQuestion = questions[currentQuestionIndex]
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer

        if (isCorrect) {
            setScore(score + 1)
        }

        // Show result for 2 seconds before moving to next question
        setTimeout(() => {
            if (currentQuestionIndex === questions.length - 1) {
                // Last question - navigate to result page
                navigate('/result', {
                    state: {
                        score: isCorrect ? score + 1 : score,
                        totalQuestions: questions.length,
                        playerName,
                        difficulty
                    }
                })
            } else {
                // Move to next question
                setCurrentQuestionIndex(currentQuestionIndex + 1)
                setSelectedAnswer(null)
                setShowResult(false)
            }
        }, 1500)
    }

    const getButtonType = (option: string) => {
        if (!showResult) return 'default'

        const currentQuestion = questions[currentQuestionIndex]
        if (option === currentQuestion.correctAnswer) {
            return 'primary'
        } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
            return 'default'
        }
        return 'default'
    }

    const getButtonDanger = (option: string) => {
        if (!showResult) return false

        const currentQuestion = questions[currentQuestionIndex]
        return option === selectedAnswer && option !== currentQuestion.correctAnswer
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Spin size="large" />
            </div>
        )
    }

    if (questions.length === 0) {
        return (
            <Card>
                <Title level={3}>Error: Tidak dapat memuat pertanyaan quiz</Title>
            </Card>
        )
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <Card
            style={{
                width: '100%',
                maxWidth: 800,
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                    <Text strong style={{ fontSize: '16px', color: '#666' }}>
                        Pertanyaan {currentQuestionIndex + 1}/{questions.length}
                    </Text>
                    <div style={{ marginTop: '8px' }}>
                        <Text>Pemain: {playerName} | Kesulitan: {difficulty}</Text>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Image
                        src={currentQuestion.mediaUrl}
                        alt="Meme"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '400px',
                            borderRadius: '8px'
                        }}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8G+0Wgsg4iQXhfSCiEQRSPQ="
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Title level={4} style={{ margin: '16px 0' }}>
                        {currentQuestion.question}
                    </Title>
                </div>

                <Row gutter={[16, 16]}>
                    {currentQuestion.options.map((option, index) => (
                        <Col xs={24} sm={12} key={index}>
                            <Button
                                block
                                size="large"
                                type={getButtonType(option)}
                                danger={getButtonDanger(option)}
                                onClick={() => handleAnswerClick(option)}
                                disabled={showResult}
                                style={{
                                    height: 'auto',
                                    padding: '12px 16px',
                                    whiteSpace: 'normal',
                                    textAlign: 'center'
                                }}
                            >
                                {option}
                            </Button>
                        </Col>
                    ))}
                </Row>

                {showResult && (
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Text
                            strong
                            style={{
                                fontSize: '16px',
                                color: selectedAnswer === currentQuestion.correctAnswer ? '#52c41a' : '#f5222d'
                            }}
                        >
                            {selectedAnswer === currentQuestion.correctAnswer ? '✅ Benar!' : '❌ Salah!'}
                        </Text>
                        {selectedAnswer !== currentQuestion.correctAnswer && (
                            <div style={{ marginTop: '8px' }}>
                                <Text>Jawaban yang benar: {currentQuestion.correctAnswer}</Text>
                            </div>
                        )}
                    </div>
                )}
            </Space>
        </Card>
    )
}

export default Quiz
