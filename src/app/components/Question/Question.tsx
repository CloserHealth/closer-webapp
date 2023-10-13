import React, { useState } from 'react'
import TextField from '../Fields/TextField';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import Assets from '@/constants/assets.constant';

export default function Question({ item }: any) {
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const handlePenClick = () => {
        setReadOnly(!readOnly);
    };

    const [question, setQuestion] = useState(item.content);
    const [option1, setOption1] = useState(item.answers[0]);
    const [option2, setOption2] = useState(item.answers[1]);
    const [option3, setOption3] = useState(item.answers[2]);

    const handleQuestionChange = (event: { target: { value: any; }; }) => {
        setQuestion(event.target.value);
    };

    const handleOption1Change = (event: { target: { value: any; }; }) => {
        setOption1(event.target.value);
    };

    const handleOption2Change = (event: { target: { value: any; }; }) => {
        setOption2(event.target.value);
    };

    const handleOption3Change = (event: { target: { value: any; }; }) => {
        setOption3(event.target.value);
    };

    return (
        <div className="border border-[#E1E5EB] rounded-[5px] bg-[#F6F6F6] h-[182px] w-full p-4 relative">
            <div className="absolute right-2 top-2" onClick={handlePenClick}>
                <IconButton>
                    <Image src={Assets.editPen} alt="" width={20} height={20} />
                </IconButton>
            </div>
            <div className="space-y-5 w-full">
                <TextField
                    id={`question-${item.id}`}
                    type="text"
                    label="Question"
                    placeholder=""
                    value={question}
                    onInputChange={handleQuestionChange}
                    require={true}
                    isPassword={false}
                    withBackground={true}
                    readOnly={readOnly}
                />
                <div className="flex space-x-5 w-full">
                    <TextField
                        id={`option1-${item.id}`}
                        type="text"
                        label=""
                        placeholder=""
                        value={option1}
                        onInputChange={handleOption1Change}
                        require={true}
                        isPassword={false}
                        withBackground={true}
                        readOnly={readOnly}
                    />
                    <TextField
                        id={`option2-${item.id}`}
                        type="text"
                        label=""
                        placeholder=""
                        value={option2}
                        onInputChange={handleOption2Change}
                        require={true}
                        isPassword={false}
                        withBackground={true}
                        readOnly={readOnly}
                    />
                    <TextField
                        id={`option3-${item.id}`}
                        type="text"
                        label=""
                        placeholder=""
                        value={option3}
                        onInputChange={handleOption3Change}
                        require={true}
                        isPassword={false}
                        withBackground={true}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </div>
    )
}
