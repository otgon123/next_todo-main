import React, { useRef, useState } from 'react'
import { Badge } from './Badge'

interface TagsInputProps {
    tags: string[];
    autoCompleteTags: string[];
    onChangeTags?: (tags: string[]) => void;
    placeholder?: string;
}

const styles = {
    default: 'border-gray-200 focus:bg-white focus:border-gray-500',
    error: 'border-red-500 focus:bg-white focus:border-gray-500'
}

export const TagsInput = (
    {
        onChangeTags,
        tags = [],
        autoCompleteTags = [],
        placeholder = "",
        ...props
    }: TagsInputProps) => {

    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateTags = (value: string) => {
        const newTags = [...tags, value];
        setInputValue("");
        onChangeTags && onChangeTags(newTags);
        setFilteredOptions([]);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!autoCompleteTags) return;
        const filtered = autoCompleteTags.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
        setInputValue(value);
        e.preventDefault();
    };

    const handleOptionClick = (value: string) => {
        updateTags(value);
        inputRef.current?.focus();
    };

    const handleOptionEnter = (e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        updateTags(e.currentTarget.innerText);
    };

    const onClose = (i: number) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        onChangeTags && onChangeTags(newTags);
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        if (e.key === 'Backspace' && !value.length && tags.length > 0) {
            onClose(tags.length - 1);
            e.preventDefault();
        } else if (e.key === 'Tab') {
            setFilteredOptions([]);
            inputRef.current?.focus();
            e.preventDefault();
        } else if (e.key === 'Enter' && value.trim()) {
            updateTags(value);
            e.preventDefault();
        }
    }

    return (
        <div>
            <div className=" text-gray-700 border leading-tight mb-3 p-3 rounded">
                {tags.map((tag, i) => {
                    return (
                        <Badge label={tag} key={i} onClose={() => onClose(i)} />
                    )
                })}
                <input
                    type="text"
                    className="flex-grow border-0 mb-1 outline-none"
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                    value={inputValue}
                    ref={inputRef}
                    placeholder={placeholder}
                    {...props}
                />
                {inputValue && filteredOptions.length > 0 && (
                    <div>
                        <span className="text-xs text-gray-500">
                            Auto Complete (Select by tab key and Enter)
                        </span>
                        <ul>
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    value={option}
                                    onClick={() => handleOptionClick(option)}
                                    onKeyDown={handleOptionEnter}
                                    className="border-b text-xs p-2"
                                    tabIndex={0}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TagsInput;