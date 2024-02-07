"use client"

import { useEffect, useState } from "react";
import ClickButton from "@/app/components/ClickButton";
import Input from "@/app/components/Input";
import TagsInput from "@/app/components/tag/TagsInput";

interface TodoFormProps {
    onSaveTodo: (value: string, tags: string[]) => void;
    autoCompleteTags: string[]
}

const TodoForm = ({
    onSaveTodo,
    autoCompleteTags = []
}: TodoFormProps) => {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    
    useEffect(() => {
        const storedInputValue = localStorage.getItem("inputValue");
        const storedTags = localStorage.getItem("tags");

        if (storedInputValue) {
            setInputValue(storedInputValue);
        }

        if (storedTags) {
            setTags(JSON.parse(storedTags));
        }
    }, []);

    // コンポーネントがアンマウントされる前にローカルストレージにデータを保存する
    useEffect(() => {
        localStorage.setItem("inputValue", inputValue);
        localStorage.setItem("tags", JSON.stringify(tags));
    }, [inputValue, tags]);
    const addClickHandler = () => {
        onSaveTodo(inputValue, tags);
        setInputValue("");
        setTags([]);
    }

    return (
        <div>
            <Input
                value={inputValue}
                onChange={setInputValue}
                placeholder="Enter Todo..." />

            <ClickButton
                label="Add"
                onClick={addClickHandler}
                disabled={!inputValue} />
        </div>
    );
}

export default TodoForm;