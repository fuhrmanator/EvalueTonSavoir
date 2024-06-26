// NumericalQuestion.tsx
import React, { useState } from 'react';
import Latex from 'react-latex';
import '../questionStyle.css';
import { Button, TextField } from '@mui/material';

type CorrectAnswer = {
    numberHigh?: number;
    numberLow?: number;
    number?: number;
    type: string;
};

interface Props {
    questionTitle: string | null;
    questionContent: string;
    correctAnswers: CorrectAnswer;
    globalFeedback?: string | undefined;
    handleOnSubmitAnswer?: (answer: number) => void;
    showAnswer?: boolean;
}

const NumericalQuestion: React.FC<Props> = (props) => {
    const { questionTitle, questionContent, correctAnswers, showAnswer, handleOnSubmitAnswer, globalFeedback } =
        props;

    const [answer, setAnswer] = useState<number>();

    const correctAnswer =
        correctAnswers.type === 'high-low'
            ? `Entre ${correctAnswers.numberLow} et ${correctAnswers.numberHigh}`
            : correctAnswers.number;

    return (
        <div className="question-wrapper">
            <div className="title mb-1 text-center center-h-align">
                {questionTitle}
            </div>
            <div>
                <Latex>{questionContent}</Latex>
            </div>
            {showAnswer ? (
                <>
                    <div className="correct-answer-text mb-2">{correctAnswer}</div>
                    {globalFeedback && <div className="global-feedback mb-2">{globalFeedback}</div>}
                </>
            ) : (
                <>
                    <div className="answer-wrapper mb-1">
                        <TextField
                            type="number"
                            id={questionContent}
                            name={questionContent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setAnswer(e.target.valueAsNumber);
                            }}
                            inputProps={{ 'data-testid': 'number-input' }}
                        />
                    </div>
                    {globalFeedback && showAnswer && (
                        <div className="global-feedback mb-2">{globalFeedback}</div>
                    )}
                    {handleOnSubmitAnswer && (
                        <Button
                            variant="contained"
                            onClick={() =>
                                answer !== undefined &&
                                handleOnSubmitAnswer &&
                                handleOnSubmitAnswer(answer)
                            }
                            disabled={answer === undefined || isNaN(answer)}
                        >
                            Répondre
                        </Button>
                    )}
                </>
            )}
        </div>
    );
};

export default NumericalQuestion;
